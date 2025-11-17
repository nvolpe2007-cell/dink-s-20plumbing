import { RequestHandler } from "express";

// Sends email via SendGrid and SMS via Twilio when booking webhook is received.
// Configure env variables in the dev server (use DevServerControl):
// SENDGRID_API_KEY, SENDGRID_FROM (email), TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM (phone number)

export const handleBooking: RequestHandler = async (req, res) => {
  try {
    const payload = req.body || {};
    // Expected fields: name, email, phone, time, notes, source
    const { name, email, phone, time, notes, source } = payload;

    const ownerEmail =
      (process.env.VITE_OWNER_EMAIL as string) ||
      (process.env.OWNER_EMAIL as string) ||
      "Plum4it2@yahoo.com";
    const notifyPhone = process.env.NOTIFY_PHONE || process.env.VITE_OWNER_PHONE || "+13103443833"; // fallback to owner phone if NOTIFY_PHONE not set

    // Build a friendly message
    const subject = `New booking: ${name ?? "Unknown"} - ${time ?? "unspecified"}`;
    const textLines = [
      `New booking received${source ? ` from ${source}` : ""}:`,
      `Name: ${name ?? "-"}`,
      `Email: ${email ?? "-"}`,
      `Phone: ${phone ?? "-"}`,
      `Time: ${time ?? "-"}`,
      `Notes: ${notes ?? "-"}`,
    ];
    const text = textLines.join("\n");

    // Send email via SendGrid if API key is present
    const sendgridKey = process.env.SENDGRID_API_KEY;
    if (sendgridKey) {
      try {
        await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sendgridKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: ownerEmail }],
                subject,
              },
            ],
            from: { email: process.env.SENDGRID_FROM || ownerEmail },
            content: [
              { type: "text/plain", value: text },
              {
                type: "text/html",
                value: `<pre>${text.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</pre>`,
              },
            ],
          }),
        });
        console.log("Booking: email sent via SendGrid to", ownerEmail);
      } catch (err) {
        console.error("Booking: failed to send SendGrid email", err);
      }
    } else {
      console.log(
        "Booking: SENDGRID_API_KEY not set, skipping email. Payload:\n",
        payload,
      );
    }

    // Send SMS via Twilio if credentials present
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
    const twilioMessagingServiceSid =
      process.env.TWILIO_MESSAGING_SERVICE_SID;
    const twilioFrom = process.env.TWILIO_FROM;

    if (twilioSid && twilioAuth) {
      try {
        const body = new URLSearchParams();
        body.append("To", notifyPhone);

        // Use MessagingServiceSid if available (recommended for A2P), otherwise fall back to From
        if (twilioMessagingServiceSid) {
          body.append("MessagingServiceSid", twilioMessagingServiceSid);
        } else if (twilioFrom) {
          body.append("From", twilioFrom);
        } else {
          console.log(
            "Booking: Neither TWILIO_MESSAGING_SERVICE_SID nor TWILIO_FROM is set, skipping SMS",
          );
          res.status(200).json({ ok: true });
          return;
        }

        body.append(
          "Body",
          `New booking: ${name ?? "Unknown"} at ${time ?? "unspecified"}. Contact: ${phone ?? email ?? "-"}`,
        );

        const url = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(`${twilioSid}:${twilioAuth}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        });

        const responseText = await response.text();
        let responseData: unknown;
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = { raw: responseText };
        }

        if (response.ok) {
          console.log("Booking: SMS sent via Twilio to", notifyPhone, responseData);
        } else {
          console.error(
            "Booking: Twilio SMS error",
            response.status,
            responseData,
          );
        }
      } catch (err) {
        console.error("Booking: failed to send Twilio SMS", err);
      }
    } else {
      console.log(
        "Booking: Twilio credentials not set, skipping SMS. Payload:\n",
        payload,
      );
    }

    // Respond OK to webhook sender
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Booking webhook error", err);
    res.status(500).json({ ok: false, error: String(err) });
  }
};
