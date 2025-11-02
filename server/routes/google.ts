import { RequestHandler } from "express";

// Simple in-memory token store (for demo). For production, persist securely.
let ownerTokens: { access_token?: string; refresh_token?: string; expiry_date?: number } = {};

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "http://localhost:8080/api/google/oauth2callback";
const OWNER_EMAIL = (process.env.VITE_OWNER_EMAIL as string) || "Plum4it2@yahoo.com";

function getAuthUrl(state?: string) {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID || "",
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: ["openid", "email", "profile", "https://www.googleapis.com/auth/calendar.events"].join(" "),
    access_type: "offline",
    prompt: "consent",
  });
  if (state) params.set("state", state);
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export const handleAuthRedirect: RequestHandler = (req, res) => {
  const redirect = getAuthUrl();
  res.redirect(redirect);
};

export const handleOAuthCallback: RequestHandler = async (req, res) => {
  try {
    const code = req.query.code as string | undefined;
    if (!code) return res.status(400).send("Missing code");

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID || "",
        client_secret: GOOGLE_CLIENT_SECRET || "",
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const tokenJson = await tokenRes.json();
    if (tokenJson.error) {
      console.error("OAuth token error", tokenJson);
      return res.status(500).send("Failed to get tokens");
    }

    ownerTokens = {
      access_token: tokenJson.access_token,
      refresh_token: tokenJson.refresh_token,
      expiry_date: Date.now() + (tokenJson.expires_in || 3600) * 1000,
    };

    console.log("Stored Google tokens for owner (in-memory)");
    // Redirect back to homepage
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("OAuth callback error");
  }
};

async function refreshAccessToken() {
  if (!ownerTokens.refresh_token) throw new Error("No refresh token available");
  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID || "",
      client_secret: GOOGLE_CLIENT_SECRET || "",
      refresh_token: ownerTokens.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  const json = await resp.json();
  if (json.error) throw new Error(JSON.stringify(json));
  ownerTokens.access_token = json.access_token;
  ownerTokens.expiry_date = Date.now() + (json.expires_in || 3600) * 1000;
}

export const handleCreateEvent: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, start, end, notes } = req.body;
    if (!start) return res.status(400).json({ ok: false, error: "Missing start time" });

    // Ensure access token valid
    if (!ownerTokens.access_token || (ownerTokens.expiry_date && ownerTokens.expiry_date < Date.now() + 10000)) {
      await refreshAccessToken();
    }

    const event = {
      summary: `Booking: ${name || "Customer"}`,
      description: `Phone: ${phone || "-"}\nEmail: ${email || "-"}\nNotes: ${notes || "-"}`,
      start: { dateTime: new Date(start).toISOString() },
      end: { dateTime: new Date(end || new Date(new Date(start).getTime() + 30 * 60000)).toISOString() },
      attendees: [{ email: OWNER_EMAIL }],
    };

    const createRes = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ownerTokens.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    const createJson = await createRes.json();
    if (createRes.status >= 400) {
      console.error("Google calendar API error", createJson);
      return res.status(500).json({ ok: false, error: createJson });
    }

    // Notify via existing booking flow (send email + sms) by delegating to booking route if desired.
    // For simplicity, return event link and id.

    res.status(200).json({ ok: true, event: createJson });
  } catch (err) {
    console.error("create-event error", err);
    res.status(500).json({ ok: false, error: String(err) });
  }
};
