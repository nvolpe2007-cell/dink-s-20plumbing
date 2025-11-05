import {
  CheckCircle2,
  Clock,
  Droplets,
  ShieldCheck,
  Wrench,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

import ReviewsPanel from "./ReviewsPanel";

const CALENDAR_URL = import.meta.env.VITE_CALENDAR_URL as string | undefined;
const OWNER_EMAIL =
  (import.meta.env.VITE_OWNER_EMAIL as string | undefined) ??
  "Plum4it2@yahoo.com";
const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;
const BOOKING_URL =
  CALENDAR_URL ??
  `https://calendar.google.com/calendar/u/0/r/eventedit?add=${encodeURIComponent(OWNER_EMAIL)}`;

const MAIL_SUBJECT = "Booking request - Dink's Plumbing";
const MAIL_BODY = `Hi Dink's Plumbing,

I'd like to book a service.
Preferred date & time:
Address:
Phone:
Details:

Thanks,`;
const MAILTO_URL = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(
  MAIL_SUBJECT
)}&body=${encodeURIComponent(MAIL_BODY)}`;

export default function Index() {
  const hasBooking = typeof BOOKING_URL === "string" && BOOKING_URL.length > 0;
  const hasEmail = typeof OWNER_EMAIL === "string" && OWNER_EMAIL.length > 0;
  const hasPhone = typeof OWNER_PHONE === "string" && OWNER_PHONE.length > 0;
  const [revealPhone, setRevealPhone] = useState(false);

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white dark:from-sidebar dark:to-background">
      <section className="relative overflow-hidden">
        <div className="hero-blob" aria-hidden />
        <div className="container grid lg:grid-cols-2 gap-10 py-20 items-center">
          <div className="space-y-6 z-10">
            <div className="ribbon">Same‑day • Local • Trusted</div>

            <h1 className="m-0 font-extrabold tracking-tight text-4xl sm:text-5xl md:text-[56px] leading-tight md:leading-[56px] text-slate-900" style={{wordBreak: 'keep-all'}}>
              Friendly, Reliable Plumbing You Can Count On.
            </h1>

            <p className="text-base sm:text-lg max-w-xl text-muted-foreground" style={{maxWidth: '640px'}}>
              Fast service, fair pricing, and quality work that lasts.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-center">
              <Button asChild size="lg" className="px-8 w-full sm:w-auto cta-book">
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  <Clock className="mr-2 h-4 w-4" /> Book an Appointment
                </a>
              </Button>

              <Button asChild variant="secondary" size="lg" className="px-6 w-full sm:w-auto">
                <a href={`tel:+13103443833`} className="phone-number"><Phone className="mr-2 h-4 w-4 inline-block" /> Call now</a>
              </Button>
            </div>

            {/* small booking form above the fold */}
            <div className="mt-6 w-full max-w-lg">
              <form id="quick-book" className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-4 rounded-lg shadow-sm" onSubmit={(e) => {e.preventDefault(); const fd = new FormData(e.currentTarget as HTMLFormElement); fetch('/api/booking-webhook', {method: 'POST', body: JSON.stringify(Object.fromEntries(fd as any)), headers: { 'Content-Type': 'application/json' }}).then(()=> { const msg = document.getElementById('booking-msg'); if(msg) msg.textContent = 'Thanks — we received your request!'; }).catch(()=>{ const msg = document.getElementById('booking-msg'); if(msg) msg.textContent = 'Something went wrong. Try calling us.'; })}}>
                <input name="name" placeholder="Your name" className="p-2 border rounded-md" required />
                <input name="phone" placeholder="Phone" className="p-2 border rounded-md" required />
                <input name="email" placeholder="Email (optional)" className="p-2 border rounded-md" />
                <select name="service" className="p-2 border rounded-md">
                  <option>Leak Repair</option>
                  <option>Drain Cleaning</option>
                  <option>Water Heater</option>
                  <option>Emergency Service</option>
                </select>
                <input name="date" type="datetime-local" className="p-2 border rounded-md sm:col-span-2" />
                <div className="sm:col-span-2 flex gap-2">
                  <Button type="submit" className="w-full cta-book">Submit</Button>
                  <Button asChild variant="outline" className="w-full sm:w-auto"><a href={`tel:+13103443833`} className="phone-number"><Phone className="mr-2 h-4 w-4 inline-block" /> +1 (310)-344-3833</a></Button>
                </div>
              </form>
              <div id="booking-msg" className="text-sm mt-2 text-muted-foreground" />
            </div>

            {/* small team image for trust */}
            <div className="mt-6">
              <img src="/placeholder.svg" alt="Dink's Plumbing team" className="rounded-lg shadow-md w-full max-w-xs" />
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Leak Repair</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Drain Cleaning</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Water Heater Installation</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Emergency Service</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Faucets</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Toilet Repair</div>
            </div>
          </div>

          <div className="relative z-10" style={{boxShadow: '0 30px 60px rgba(2,6,23,0.12)'}}>
            <div className="glass-card rounded-3xl border p-6 max-w-[456px] mx-auto" style={{boxShadow: '0 8px 24px rgba(2,6,23,0.08)'}}>
              <div className="flex items-center gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Wrench className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold text-lg">Dink's Promise</div>
                  <div className="text-sm text-muted-foreground">
                    No-nonsense plumbing. Flat-rate quotes.
                  </div>
                </div>
              </div>

              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Wrench className="mt-0.5 h-4 w-4 text-primary" /> Same-day
                  service, on time
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />{" "}
                  Upfront pricing, guaranteed
                </li>
                <li className="flex items-start gap-3">
                  <Droplets className="mt-0.5 h-4 w-4 text-primary" /> Clean
                  workspace, zero mess
                </li>
              </ul>

              {hasBooking || hasEmail || hasPhone ? (
                <div className="mt-6 grid gap-2">
                  {hasBooking ? (
                    <Button asChild className="w-full cta-book">
                      <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                        <Clock className="mr-2 h-4 w-4" /> Book now
                      </a>
                    </Button>
                  ) : null}
                  {hasEmail ? (
                    <Button asChild variant="secondary" className="w-full cta-book">
                      <a href={`tel:+13103443833`} className="phone-number">
                        <Phone className="mr-2 h-4 w-4 inline-block" /> +1 (310)-344-3833
                      </a>
                    </Button>
                  ) : null}
                  {hasPhone ? (
                    <Button asChild variant="outline" className="w-full">
                      <a href={`tel:${OWNER_PHONE}`}>Call us</a>
                    </Button>
                  ) : null}
                </div>
              ) : (
                <p className="mt-6 text-sm text-muted-foreground">
                  Add VITE_CALENDAR_URL or VITE_OWNER_EMAIL to enable one‑click
                  booking.
                </p>
              )}
            </div>

            <div className="mt-4">
              <button type="button" onClick={() => setRevealPhone(r => !r)} className="inline-flex items-center gap-2 text-sm text-primary">
                <Phone className="h-4 w-4" />
                {revealPhone ? <span className="font-medium">+1 (310)-344-3833</span> : <span className="sr-only">Show phone</span>}
              </button>
            </div>

            <div className="mt-6 text-sm text-muted-foreground">Friendly technicians.</div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-6">Customer reviews</h2>

        <div className="mx-auto max-w-3xl">
          <ReviewsPanel ownerEmail={OWNER_EMAIL} />
        </div>

        {/* Testimonials */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="font-semibold">Maria K.</div>
            <div className="text-sm text-muted-foreground">"Fast, honest, and fixed my leak the same day."</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="font-semibold">John O.</div>
            <div className="text-sm text-muted-foreground">"Always on time and efficient — great service."</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="font-semibold">Gerald C.</div>
            <div className="text-sm text-muted-foreground">"Dependable and honest. Never disappointed."</div>
          </div>
        </div>

      </section>

      <section className="border-t">
        <div className="container py-12 grid sm:grid-cols-3 gap-6">
          <Stat
            icon={<Clock className="h-5 w-5" />}
            label="Response"
            value="Under 60 min"
          />
          <Stat
            icon={<ShieldCheck className="h-5 w-5" />}
            label="Warranty"
            value="1 year"
          />
          <Stat
            icon={<Droplets className="h-5 w-5" />}
            label="Happy homeowners"
            value="Thousands"
          />
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="mobile-cta fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <a href={`tel:+13103443833`} className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-primary text-primary-foreground shadow-lg phone-number">
          <Phone className="h-5 w-5" /> Call or text us
        </a>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-2 text-center bg-card p-6 rounded-xl shadow-sm">
      <div className="mx-auto inline-flex items-center justify-center rounded-md bg-primary/10 p-2 text-primary">
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
