import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Book() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [start, setStart] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const end = new Date(new Date(start).getTime() + 30 * 60000).toISOString();
      const resp = await fetch("/api/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, start, end }),
      });
      const json = await resp.json();
      if (json.ok) {
        setMessage("Booking created — we emailed and will text the owner.");
      } else {
        setMessage("Failed to create booking: " + (json.error?.message || JSON.stringify(json.error)));
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
            <div className="text-sm font-medium">Appointment time</div>
            <input required value={start} onChange={(e) => setStart(e.target.value)} type="datetime-local" className="mt-1 w-full rounded-md border px-3 py-2" />
          </label>

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={loading}>{loading ? "Booking..." : "Confirm booking"}</Button>
            <a className="text-sm text-muted-foreground" href="/">Cancel</a>
          </div>

          {message ? <div className="text-sm mt-2">{message}</div> : null}
        </form>
      </div>
    </section>
  );
}
