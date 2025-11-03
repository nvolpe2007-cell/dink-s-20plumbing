import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleBooking } from "./routes/booking";
import {
  handleAuthRedirect,
  handleOAuthCallback,
  handleCreateEvent,
  handleCheckAvailability,
} from "./routes/google";

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

  // Google OAuth & Calendar endpoints
  app.get("/api/google/auth", handleAuthRedirect);
  app.get("/api/google/oauth2callback", handleOAuthCallback);
  app.post("/api/check-availability", handleCheckAvailability);
  app.post("/api/available-slots", handleAvailableSlots);
  app.post("/api/create-event", handleCreateEvent);

  return app;
}
