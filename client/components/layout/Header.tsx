import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

const CALENDAR_URL = import.meta.env.VITE_CALENDAR_URL as string | undefined;
const OWNER_EMAIL = (import.meta.env.VITE_OWNER_EMAIL as string | undefined) ?? "Plum4it2@yahoo.com";
const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;
const BOOKING_URL = CALENDAR_URL ?? "https://calendar.google.com/calendar/u/0/r/appointment?pli=1";

export default function Header() {
  const hasBooking = typeof BOOKING_URL === "string" && BOOKING_URL.length > 0;
  const hasEmail = typeof OWNER_EMAIL === "string" && OWNER_EMAIL.length > 0;
  const hasPhone = typeof OWNER_PHONE === "string" && OWNER_PHONE.length > 0;

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Announcement bar */}
      <div className="w-full bg-accent text-accent-foreground">
        <div className="container flex items-center justify-between text-sm py-1">
          <div className="font-medium">Emergency plumbing — we respond fast</div>
          <div>
            {hasPhone ? (
              <a className="font-semibold underline" href={`tel:${OWNER_PHONE}`}>Call now</a>
            ) : hasBooking ? (
              <a className="font-semibold underline" href={BOOKING_URL} target="_blank" rel="noreferrer">Book</a>
            ) : hasEmail ? (
              <a className="font-semibold underline" href={`mailto:${OWNER_EMAIL}?subject=Emergency%20plumbing`}>Email</a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Droplets className="h-5 w-5" />
            </span>
            <span className="font-extrabold tracking-tight text-xl">Dink's Plumbing</span>
          </a>
          <div className="flex items-center gap-2">
            {hasPhone ? (
              <Button asChild variant="secondary" size="sm" aria-label="Call now">
                <a href={`tel:${OWNER_PHONE}`}>Call</a>
              </Button>
            ) : null}
            {BOOKING_URL ? (
              <Button asChild size="sm" aria-label="Book now">
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">Book now</a>
              </Button>
            ) : hasEmail ? (
              <Button asChild size="sm" aria-label="Email us">
                <a href={`mailto:${OWNER_EMAIL}?subject=${encodeURIComponent("Booking request - Dink's Plumbing")}`}>Email</a>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
