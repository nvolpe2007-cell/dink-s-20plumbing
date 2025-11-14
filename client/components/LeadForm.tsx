import React, { useEffect, useState } from "react";

export default function LeadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Capture UTM params
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const utm_source = params.get("utm_source");
      const utm_medium = params.get("utm_medium");
      const utm_campaign = params.get("utm_campaign");
      if (utm_source || utm_medium || utm_campaign) {
        localStorage.setItem(
          "lead_utm",
          JSON.stringify({ utm_source, utm_medium, utm_campaign })
        );
      }
    } catch (e) {
      // ignore
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const utm = localStorage.getItem("lead_utm");
      const payload: any = { name, phone, email, source: "lead-form" };
      if (utm) payload.utm = JSON.parse(utm);
      const resp = await fetch("/api/booking-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await resp.json();
      if (json.ok) {
        setMsg("Thanks — we received your request.");
        setName("");
        setPhone("");
        setEmail("");
        if (onSuccess) onSuccess();
      } else {
        setMsg("Something went wrong; please try again.");
      }
    } catch (err) {
      setMsg("Error submitting, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded-lg shadow-sm max-w-md mx-auto">
      <div className="text-sm text-gray-700 font-semibold">Get a Free Estimate</div>
      <div>
        <input required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border px-3 py-2" />
      </div>
      <div>
        <input required placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-md border px-3 py-2" />
      </div>
      <div>
        <input placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border px-3 py-2" />
      </div>
      <div className="flex items-center gap-2">
        <button type="submit" disabled={loading} className="cta-shine inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md font-bold">
          {loading ? "Sending..." : "Request Estimate"}
        </button>
        <div className="text-sm text-muted-foreground">Or call <a href={`tel:${(import.meta.env.VITE_OWNER_PHONE as string | undefined) ?? "+1 (310)-344-3833"}`} className="font-semibold">{(import.meta.env.VITE_OWNER_PHONE as string | undefined) ?? "+1 (310)-344-3833"}</a></div>
      </div>
      {msg ? <div className="text-sm text-green-600">{msg}</div> : null}
    </form>
  );
}
