import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleBooking } from "./routes/booking";
import { handleTrack } from "./routes/analytics";
import { handleTwilioInbound } from "./routes/twilio";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Booking webhook endpoint for external calendar apps (POST JSON)
  // Configure external calendar to POST to /api/booking-webhook with booking details.
  app.post("/api/booking-webhook", handleBooking);

  // Twilio inbound SMS webhook - Twilio posts form-encoded data (Body, From)
  app.post("/api/twilio-inbound", handleTwilioInbound);

  // Analytics/tracking endpoint (lightweight)
  app.post("/api/track", handleTrack);

  // No calendar integrations: removed Google Calendar endpoints per request.

  return app;
}
