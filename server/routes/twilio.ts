import { RequestHandler } from "express";
import { handleBooking } from "./booking";

// Handle inbound SMS from Twilio. Twilio will POST application/x-www-form-urlencoded
// with fields like From and Body. We convert that into the same payload shape used
// by the booking webhook and delegate to handleBooking to perform notifications.
export const handleTwilioInbound: RequestHandler = async (req, res) => {
  try {
    const incoming: any = req.body || {};
    const smsBody: string = incoming.Body || incoming.body || "";
    const from: string = incoming.From || incoming.from || "";

    // Construct payload compatible with booking handler
    const payload: any = {
      name: from,
      phone: from,
      email: undefined,
      notes: smsBody,
      source: "twilio-inbound",
    };

    // Reuse booking handler by replacing req.body and delegating
    (req as any).body = payload;
    await handleBooking(req, res);
  } catch (err) {
    console.error("Twilio inbound handler error", err);
    try {
      res.status(500).send("error");
    } catch (e) {
      // ignore
    }
  }
};
