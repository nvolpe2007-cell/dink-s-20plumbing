import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Book() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const resp = await fetch("/api/booking-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, address, time, source: "website" }),
      });
      const json = await resp.json();
      if (json.ok) {
        setMessage("Booking submitted. We'll follow up shortly.");
        setName("");
        setEmail("");
        setPhone("");
        setService("");
        setAddress("");
        setTime("");
      } else {
        setMessage("Failed to submit booking.");
      }
    } catch (err) {
      setMessage("Error submitting booking: " + String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container py-12">
      <div className="mx-auto max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Book an appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg">
          <label className="block">
            <div className="text-sm font-medium">Your name</div>
            <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Your email</div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Phone</div>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
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
            <input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Preferred time</div>
            <input value={time} onChange={(e) => setTime(e.target.value)} type="datetime-local" className="mt-1 w-full rounded-md border px-3 py-2" />
          </label>

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Submit Booking"}</Button>
            <a className="text-sm text-muted-foreground" href="/">Cancel</a>
          </div>

          {message ? <div className="text-sm mt-2">{message}</div> : null}
        </form>
      </div>
    </section>
  );
}
