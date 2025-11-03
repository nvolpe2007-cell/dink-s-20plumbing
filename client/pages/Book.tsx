import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Book() {
  const AVAILABLE_FROM = 8; // 8 AM
  const AVAILABLE_TO = 20; // 8 PM

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [address, setAddress] = useState("");
  const [start, setStart] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);
  const [availability, setAvailability] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[] | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  function validateTime(value: string) {
    if (!value) return null;
    const d = new Date(value);
    if (isNaN(d.getTime())) return "Invalid date";
    const day = d.getDay(); // 0 = Sunday, 6 = Saturday
    if (day === 0) {
      return "We're closed on Sundays; please pick another day (Mon–Sat).";
    }
    const hour = d.getHours();
    if (hour < AVAILABLE_FROM || hour >= AVAILABLE_TO) {
      return `Our availability is ${AVAILABLE_FROM}:00–${AVAILABLE_TO}:00 (Mon–Sat); please pick a time in that window.`;
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
            <div className="text-sm font-medium">Service needed</div>
            <select value={service} onChange={(e) => setService(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2">
              <option value="">Select a service</option>
              <option value="Leak repair">Leak repair</option>
              <option value="Clog removal">Clog removal</option>
              <option value="Water heater">Water heater</option>
              <option value="Toilet repair">Toilet repair</option>
              <option value="Other">Other / General</option>
            </select>
          </label>

          <label className="block">
            <div className="text-sm font-medium">Address</div>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              <div className={`text-sm mt-2 ${availability === 'Available' ? 'text-green-600' : 'text-destructive'}`}>{availability}</div>
            ) : null}
          </label>

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={loading || !!timeError || availability === 'Busy'}>
              {loading ? "Booking..." : "Confirm booking"}
            </Button>
            <a className="text-sm text-muted-foreground" href="/">
              Cancel
            </a>
            <button
              type="button"
              onClick={async () => {
                setLoadingSlots(true);
                setSlots(null);
                try {
                  const resp = await fetch('/api/available-slots', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ days: 7 }) });
                  const json = await resp.json();
                  if (json.ok) setSlots(json.slots || []);
                  else setSlots([]);
                } catch (err) {
                  setSlots([]);
                } finally {
                  setLoadingSlots(false);
                }
              }}
              className="text-sm ml-2 underline"
            >
              {loadingSlots ? 'Finding...' : 'Find available slots'}
            </button>
          </div>

          {slots ? (
            <div className="mt-4 grid gap-2">
              {slots.length === 0 ? <div className="text-sm text-muted-foreground">No slots found</div> : null}
              {slots.slice(0, 12).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setStart(s); setAvailability('Available'); }}
                  className="text-left rounded border px-3 py-2"
                >
                  {new Date(s).toLocaleString()}
                </button>
              ))}
            </div>
          ) : null}

          {message ? <div className="text-sm mt-2">{message}</div> : null}
        </form>
      </div>
    </section>
  );
}
