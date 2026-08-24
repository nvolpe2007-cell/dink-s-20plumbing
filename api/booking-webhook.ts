// Vercel serverless function: /api/booking-webhook
//
// Restored from server/routes/booking.ts, deleted in commit a3dd744 when this
// repo was converted to a static cPanel export. The client still POSTs here from
// client/components/LeadForm.tsx and client/pages/Book.tsx, so without this
// function every lead submitted through the site is silently discarded.
//
// Required env vars (Vercel > Settings > Environment Variables):
//   SENDGRID_API_KEY, SENDGRID_FROM, OWNER_EMAIL
//   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
//   TWILIO_MESSAGING_SERVICE_SID (preferred) or TWILIO_FROM, NOTIFY_PHONE

import { z } from "zod";

export const config = { runtime: "nodejs" };

const DEFAULT_OWNER_EMAIL = "Plum4it2@yahoo.com";
const DEFAULT_NOTIFY_PHONE = "+13103443833";

// Every submission triggers a billable SendGrid email and Twilio SMS, with
// no auth in front of this endpoint (it's a public lead form). Without a
// limit, a scripted burst runs up real billing and floods the owner's
// inbox/phone with attacker-controlled content. This is a per-instance,
// in-memory limiter: on Vercel each cold-started function instance gets
// its own empty map, so it isn't a durable cap across scale-out, but it
// does stop the single-instance flood a load test would produce, and
// costs nothing to run. A shared store (e.g. Upstash) would make it
// durable if abuse becomes a real problem.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

// Loose caps on field length rather than strict format validation: this is
// a lead form, not an auth boundary, so the goal is bounding payload size
// and cost (huge fields blow up the SendGrid/Twilio request bodies), not
// rejecting real-world messy input.
const leadPayloadSchema = z.object({
  name: z.string().max(200).optional(),
  email: z.string().max(200).optional(),
  phone: z.string().max(50).optional(),
  time: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
  service: z.string().max(200).optional(),
  address: z.string().max(500).optional(),
  source: z.string().max(200).optional(),
  utm: z.record(z.string(), z.string().nullable()).optional(),
});

type LeadPayload = z.infer<typeof leadPayloadSchema>;

// Named HTTP method export (Web fetch-style). Vercel ignores the return value of a
// `export default` function on the Node runtime, so this MUST be `export async function POST`.
// Other methods automatically receive 405.
export async function POST(req: Request): Promise<Response> {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  let rawPayload: unknown;
  try { rawPayload = await req.json(); }
  catch { return json({ ok: false, error: "Invalid JSON body" }, 400); }

  const parsed = leadPayloadSchema.safeParse(rawPayload);
  if (!parsed.success) {
    return json({ ok: false, error: "Invalid payload", issues: parsed.error.issues }, 400);
  }
  const payload: LeadPayload = parsed.data;

  const { name, email, phone, time, notes, service, address, source, utm } = payload;
  const ownerEmail = process.env.OWNER_EMAIL || DEFAULT_OWNER_EMAIL;
  const notifyPhone = process.env.NOTIFY_PHONE || DEFAULT_NOTIFY_PHONE;

  const subject = `New lead: ${name ?? "Unknown"}${time ? ` - ${time}` : ""}`;
  const text = [
    `New lead received${source ? ` from ${source}` : ""}:`,
    `Name: ${name ?? "-"}`, `Phone: ${phone ?? "-"}`, `Email: ${email ?? "-"}`,
    `Service: ${service ?? "-"}`, `Address: ${address ?? "-"}`,
    `Preferred time: ${time ?? "-"}`, `Notes: ${notes ?? "-"}`,
    utm ? `UTM: ${JSON.stringify(utm)}` : "",
  ].filter(Boolean).join("\n");

  const delivered = { email: false, sms: false };
  const errors: string[] = [];

  const sendgridKey = process.env.SENDGRID_API_KEY;
  if (sendgridKey) {
    try {
      const r = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: { Authorization: `Bearer ${sendgridKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: ownerEmail }], subject }],
          from: { email: process.env.SENDGRID_FROM || ownerEmail },
          content: [
            { type: "text/plain", value: text },
            { type: "text/html", value: `<pre>${escapeHtml(text)}</pre>` },
          ],
        }),
      });
      if (r.ok) delivered.email = true; else errors.push(`sendgrid_${r.status}: ${await r.text()}`);
    } catch (err) { errors.push(`sendgrid_exception: ${String(err)}`); }
  } else { errors.push("SENDGRID_API_KEY not set"); }

  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
  const twilioFrom = process.env.TWILIO_FROM;

  if (twilioSid && twilioAuth && (messagingServiceSid || twilioFrom)) {
    try {
      const body = new URLSearchParams();
      body.append("To", notifyPhone);
      if (messagingServiceSid) body.append("MessagingServiceSid", messagingServiceSid);
      else if (twilioFrom) body.append("From", twilioFrom);
      body.append("Body", `New lead: ${name ?? "Unknown"}${time ? ` at ${time}` : ""}. Contact: ${phone ?? email ?? "-"}`);

      const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${twilioSid}:${twilioAuth}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });
      if (r.ok) delivered.sms = true; else errors.push(`twilio_${r.status}: ${await r.text()}`);
    } catch (err) { errors.push(`twilio_exception: ${String(err)}`); }
  } else { errors.push("Twilio credentials not set"); }

  // If every channel failed, this log is the only remaining record of the lead.
  // Report the failure to the client too: both LeadForm.tsx and Book.tsx branch on
  // `json.ok`, so returning ok:true here showed the visitor a success message while
  // the lead was silently dropped.
  if (!delivered.email && !delivered.sms) {
    console.error("LEAD NOT DELIVERED - no channel succeeded. Payload:",
      JSON.stringify(payload), "Errors:", errors.join(" | "));
    // `errors` holds raw SendGrid/Twilio response bodies — logged above, but not
    // returned to the browser.
    return json({ ok: false, error: "lead_not_delivered", delivered }, 502);
  }

  console.log("Lead delivered", delivered, "payload:", JSON.stringify(payload));
  return json({ ok: true, delivered });
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
