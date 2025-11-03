import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  Droplets,
  ShieldCheck,
  Wrench,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import ReviewsPanel from "./ReviewsPanel";

const CALENDAR_URL = import.meta.env.VITE_CALENDAR_URL as string | undefined;
const OWNER_EMAIL =
  (import.meta.env.VITE_OWNER_EMAIL as string | undefined) ??
  "Plum4it2@yahoo.com";
const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;
const BOOKING_URL =
  CALENDAR_URL ??
  "https://calendar.google.com/calendar/u/0/r/appointment?pli=1";

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

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white dark:from-sidebar dark:to-background">
      <section className="relative overflow-hidden">
        <div className="hero-blob" aria-hidden />
        <div className="container grid lg:grid-cols-2 gap-10 py-20 items-center">
          <div className="space-y-6 z-10">
            <div className="ribbon">Same‑day • Local • Trusted</div>
            <p className="text-[60px] font-extrabold tracking-tight leading-[60px] mt-6" style={{boxShadow: '7px 3px 38px 1px rgba(0, 0, 0, 1)'}}>
              Plumbing fixed TODAY.
            </p>
            <div className="text-lg max-w-xl" style={{color: 'rgb(0, 53, 53)', fontWeight: 400, textShadow: '1px 1px 3px rgb(0, 0, 0)', boxShadow: '7px 3px 38px 1px rgb(0, 0, 0)', maxWidth: '576px'}}>
                      Leaks, clogs, or no hot water, we arrive fast, fix it
                      right, and leave your place cleaner than we found it.
                    </div>

            <div className="flex flex-wrap gap-3 items-center">
              {hasBooking ? (
                <Button asChild size="lg" className="px-8">
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    <Clock className="h-4 w-4" /> Book a time
                  </a>
                </Button>
              ) : null}

              {hasEmail ? (
                <Button asChild variant="secondary" size="lg" className="px-6">
                  <a
                    href={MAILTO_URL}
                  >
                    Email to book
                  </a>
                </Button>
              ) : null}

              {hasPhone ? (
                <Button asChild variant="outline" size="lg" className="px-6">
                  <a href={`tel:${OWNER_PHONE}`}>Call now</a>
                </Button>
              ) : null}
            </div>

            <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Leaks
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Clogs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Water heaters
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Toilets
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Faucets
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Burst pipes
              </li>
            </ul>
          </div>

          <div className="relative z-10" style={{boxShadow: '7px 3px 38px 1px rgba(0, 0, 0, 1)'}}>
            <div className="glass-card rounded-3xl border p-6 max-w-[456px] mx-auto" style={{boxShadow: '1px 1px 3px 0px rgba(0, 0, 0, 1)'}}>
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
                    <Button asChild className="w-full">
                      <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                        Book now
                      </a>
                    </Button>
                  ) : null}
                  {hasEmail ? (
                    <Button asChild variant="secondary" className="w-full">
                      <a
                        href={MAILTO_URL}
                      >
                        Email to book
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

            <figure className="mt-6 flex items-center gap-4">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <figcaption className="text-sm">
                <p>
                  <br />
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-6">Customer reviews</h2>

        <div className="mx-auto max-w-3xl">
          <ReviewsPanel ownerEmail={OWNER_EMAIL} />
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
