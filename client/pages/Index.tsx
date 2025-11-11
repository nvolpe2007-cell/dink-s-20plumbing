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

  const PLUMBING_IMAGES = [
    { src: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", alt: "Leaky pipe repair" },
    { src: "https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", alt: "Main water pipes" },
    { src: "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", alt: "Modern kitchen faucet" },
  ];

  return (
    <div className="relative bg-gradient-to-br from-sky-50 via-blue-50 to-white dark:from-sidebar dark:via-slate-900 dark:to-background">
      {/* Enhanced animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full filter blur-3xl opacity-20 bg-gradient-to-br from-blue-400 to-cyan-300 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full filter blur-3xl opacity-15 bg-gradient-to-tr from-orange-400 to-yellow-300 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full filter blur-3xl opacity-10 bg-gradient-to-br from-indigo-400 to-purple-300 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <section className="relative overflow-hidden">
        <div className="hero-blob" aria-hidden />
        <div className="hero-blob-secondary" aria-hidden />
        <div className="container grid lg:grid-cols-2 gap-10 py-20 items-center">
          <div className="space-y-6 z-10">
            <div className="ribbon animate-bounce" style={{animationDuration: '2s', animationDelay: '0s'}}>Same‑day • Local • Trusted</div>

            <h1 className="m-0 font-extrabold tracking-tight text-4xl sm:text-5xl md:text-[56px] leading-tight md:leading-[56px] text-slate-900" style={{wordBreak: 'keep-all', animation: 'slide-up-fade 0.8s ease-out'}}>
              Friendly, Reliable Plumbing You Can Count On.
            </h1>

            <p className="text-base sm:text-lg max-w-xl text-muted-foreground" style={{maxWidth: '640px', animation: 'slide-up-fade 0.8s ease-out 0.1s both'}}>
              Fast service, fair pricing, and quality work that lasts.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-center">
              <a href={`tel:+13103443833`} className="cta-book inline-flex items-center px-6 py-3 rounded-full text-white">
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </a>

              <a href={`sms:+13103443833`} className="inline-flex items-center px-5 py-3 rounded-full bg-secondary text-secondary-foreground">
                <Phone className="mr-2 h-4 w-4" /> Text Us
              </a>
            </div>

            <div className="mt-6 w-full max-w-lg">
              <p className="text-sm text-muted-foreground">For fast service, call or text: <a href={`tel:+13103443833`} className="phone-number">+1 (310)-344-3833</a></p>
            </div>

            {/* plumbing image gallery */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PLUMBING_IMAGES.map((img) => (
                <div key={img.src} className="rounded-lg overflow-hidden bg-gray-100">
                  <img src={img.src} alt={img.alt} className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105" />
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200"><CheckCircle2 className="h-4 w-4 text-primary" /> Leak Repair</div>
              <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200"><CheckCircle2 className="h-4 w-4 text-primary" /> Drain Cleaning</div>
              <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200"><CheckCircle2 className="h-4 w-4 text-primary" /> Water Heater Installation</div>
              <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200"><CheckCircle2 className="h-4 w-4 text-primary" /> Emergency Service</div>
              <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200"><CheckCircle2 className="h-4 w-4 text-primary" /> Faucets</div>
              <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200"><CheckCircle2 className="h-4 w-4 text-primary" /> Toilet Repair</div>
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

              <div className="mt-6 grid gap-2">
                <a href={`tel:+13103443833`} className="cta-book inline-flex items-center justify-center px-4 py-3 rounded-md text-white w-full"><Phone className="mr-2 h-4 w-4" /> Call Now</a>
                <a href={`sms:+13103443833`} className="inline-flex items-center justify-center px-4 py-3 rounded-md bg-secondary text-secondary-foreground w-full"><Phone className="mr-2 h-4 w-4" /> Text Us</a>
              </div>
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
          <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20">
            <div className="font-semibold">Maria K.</div>
            <div className="text-sm text-muted-foreground">"Fast, honest, and fixed my leak the same day."</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20">
            <div className="font-semibold">John O.</div>
            <div className="text-sm text-muted-foreground">"Always on time and efficient — great service."</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20">
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
        <div className="flex gap-3 w-full max-w-md mx-auto px-4">
          <a href={`tel:+13103443833`} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg phone-number">
            <Phone className="h-5 w-5" /> Call Now
          </a>
          <a href={`sms:+13103443833`} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-secondary text-secondary-foreground shadow-lg phone-number">
            <Phone className="h-5 w-5" /> Text Us
          </a>
        </div>
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
    <div className="space-y-2 text-center bg-card p-6 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20">
      <div className="mx-auto inline-flex items-center justify-center rounded-md bg-primary/10 p-2 text-primary hover:bg-primary/20 transition-colors duration-200">
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
