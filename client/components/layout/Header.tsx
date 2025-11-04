import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Clock, Phone, BookOpen } from "lucide-react";
import { useState } from "react";

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

export default function Header() {
  const hasBooking = typeof BOOKING_URL === "string" && BOOKING_URL.length > 0;
  const hasEmail = typeof OWNER_EMAIL === "string" && OWNER_EMAIL.length > 0;
  const hasPhone = typeof OWNER_PHONE === "string" && OWNER_PHONE.length > 0;
  const [showPhone, setShowPhone] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Announcement bar */}
      <div className="w-full bg-accent text-accent-foreground">
        <div className="container flex items-center justify-between text-sm py-1">
          <div className="font-medium">
            Emergency plumbing — we respond fast
          </div>
          <div className="flex items-center gap-3">
            <div>
              {hasPhone ? (
                <a
                  className="font-semibold underline"
                  href={`tel:${OWNER_PHONE}`}
                >
                  Call now
                </a>
              ) : hasBooking ? (
                <a
                  className="font-semibold underline cta-link"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Clock className="mr-1 inline-block h-4 w-4" /> Book now
                </a>
              ) : hasEmail ? (
                <a
                  className="font-semibold underline cta-link"
                  href={MAILTO_URL}
                >
                  <BookOpen className="mr-1 inline-block h-4 w-4" /> Book
                </a>
              ) : null}
            </div>

            {/* phone reveal button */}
            <div>
              <button type="button" className="text-sm text-primary inline-flex items-center gap-2" onClick={() => setShowPhone((s) => !s)}>
                <Phone className="h-4 w-4" />
                {showPhone ? <span className="font-medium">310-344-3833</span> : <span className="sr-only">Show phone</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background/80">
        <div className="container mx-auto px-4 py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
            <a href="/" className="flex items-center gap-0 w-full sm:w-auto">
              <span className="pipe-font brand-interactive text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 whitespace-nowrap">Dink's Plumbing</span>
            </a>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {hasPhone ? (
                <Button asChild variant="secondary" size="sm" className="w-full sm:w-auto">
                  <a href={`tel:${OWNER_PHONE}`}>Call</a>
                </Button>
              ) : null}

              {BOOKING_URL ? (
                <Button asChild size="sm" className="w-full sm:w-auto">
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer"><Clock className="mr-2 h-4 w-4" /> Book now</a>
                </Button>
              ) : hasEmail ? (
                <Button asChild size="sm" className="w-full sm:w-auto">
                  <a href={MAILTO_URL}><BookOpen className="mr-2 h-4 w-4 inline-block" /> Book</a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
