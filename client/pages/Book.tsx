import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Book() {
  const AVAILABLE_FROM = 9; // 9 AM
  const AVAILABLE_TO = 17; // 5 PM

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [start, setStart] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);
  const [availability, setAvailability] = useState<string | null>(null);

  function validateTime(value: string) {
    if (!value) return null;
    const d = new Date(value);
    if (isNaN(d.getTime())) return "Invalid date";
    const hour = d.getHours();
    if (hour < AVAILABLE_FROM || hour >= AVAILABLE_TO) {
      return `Our availability is ${AVAILABLE_FROM}:00–${AVAILABLE_TO}:00; please pick a time in that window.`;
    }
    return null;
  }

  // Check availability against owner's Google Calendar
  async function checkAvailability(value: string) {
    setAvailability(null);
    if (!value) return;
    const err = validateTime(value);
    if (err) {
      setAvailability(null);
      return;
    }
    try {
      const end = new Date(new Date(value).getTime() + 30 * 60000).toISOString();
      const resp = await fetch("/api/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start: new Date(value).toISOString(), end }),
      });
      const json = await resp.json();
      if (json.ok) {
        setAvailability(json.free ? "Available" : "Busy");
      } else {
        setAvailability("Error checking availability");
      }
    } catch (err) {
      setAvailability("Error checking availability");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setTimeError(null);

    const tErr = validateTime(start);
    if (tErr) {
      setTimeError(tErr);
      setLoading(false);
      return;
    }

    try {
      const end = new Date(
        new Date(start).getTime() + 30 * 60000,
      ).toISOString();
      const resp = await fetch("/api/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, start, end }),
      });
      const json = await resp.json();
      if (json.ok) {
        setMessage("Booking created — we emailed and will text the owner.");
      } else {
        setMessage(
          "Failed to create booking: " +
            (json.error?.message || JSON.stringify(json.error)),
        );
      }
    } catch (err) {
      setMessage("Error: " + String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container py-12">
      <div className="mx-auto max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Book an appointment</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-card p-6 rounded-lg"
        >
          <label className="block">
            <div className="text-sm font-medium">Your name</div>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
          <label className="block">
            <div className="text-sm font-medium">Your email</div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
          <label className="block">
            <div className="text-sm font-medium">Phone</div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
          <label className="block">
            <div className="text-sm font-medium">Appointment time</div>
            <input
              required
              value={start}
              onChange={(e) => {
                setStart(e.target.value);
                setTimeError(validateTime(e.target.value));
                checkAvailability(e.target.value);
              }}
              type="datetime-local"
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
            {timeError ? <div className="text-sm text-destructive mt-2">{timeError}</div> : null}
            {availability ? (
              <div className={`text-sm mt-2 ${availability === 'Available' ? 'text-success' : 'text-destructive'}`}>{availability}</div>
            ) : null}
          </label>

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={loading || !!timeError || availability === 'Busy'}>
              {loading ? "Booking..." : "Confirm booking"}
            </Button>
            <a className="text-sm text-muted-foreground" href="/">
              Cancel
            </a>
          </div>

          {message ? <div className="text-sm mt-2">{message}</div> : null}
        </form>
      </div>
    </section>
  );
}
