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

export const config = { runtime: "nodejs" };

const DEFAULT_OWNER_EMAIL = "Plum4it2@yahoo.com";
const DEFAULT_NOTIFY_PHONE = "+13103443833";

type LeadPayload = {
  name?: string; email?: string; phone?: string; time?: string;
  notes?: string; service?: string; address?: string; source?: string;
  utm?: Record<string, string | null>;
};

// Named HTTP method export (Web fetch-style). Vercel ignores the return value of a
// `export default` function on the Node runtime, so this MUST be `export async function POST`.
// Other methods automatically receive 405.
export async function POST(req: Request): Promise<Response> {
  let payload: LeadPayload = {};
  try { payload = (await req.json()) as LeadPayload; }
  catch { return json({ ok: false, error: "Invalid JSON body" }, 400); }

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
  if (!delivered.email && !delivered.sms) {
    console.error("LEAD NOT DELIVERED - no channel succeeded. Payload:",
      JSON.stringify(payload), "Errors:", errors.join(" | "));
  } else {
    console.log("Lead delivered", delivered, "payload:", JSON.stringify(payload));
  }

  return json({ ok: true, delivered });
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
