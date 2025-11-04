import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Phone } from "lucide-react";

const CALENDAR_URL = import.meta.env.VITE_CALENDAR_URL as string | undefined;
const OWNER_EMAIL =
  (import.meta.env.VITE_OWNER_EMAIL as string | undefined) ??
  "Plum4it2@yahoo.com";
const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;
const BOOKING_URL = CALENDAR_URL ?? `https://calendar.google.com/calendar/u/0/r/eventedit?add=${encodeURIComponent(OWNER_EMAIL)}`;

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

export default function BookingBar() {
  const hasBooking = !!BOOKING_URL;
  const hasEmail = !!OWNER_EMAIL;
  const hasPhone = !!OWNER_PHONE;

  if (!hasBooking && !hasEmail && !hasPhone) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 transform -translate-x-1/2 sm:hidden">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow-lg">
        {hasBooking ? (
          <Button asChild size="sm" className="px-3 cta-book">
            <a href={BOOKING_URL} target="_blank" rel="noreferrer">
              <Clock className="mr-2 h-4 w-4" /> Book now
            </a>
          </Button>
        ) : null}

        {hasEmail ? (
          <Button asChild variant="secondary" size="sm" className="px-3 cta-book">
            <a href={`tel:+13103443833`}>
              <Phone className="mr-2 h-4 w-4 inline-block" /> Text or call to book +1 (310)-344-3833
            </a>
          </Button>
        ) : null}

        {hasPhone ? (
          <Button asChild variant="outline" size="sm" className="px-3">
            <a href={`tel:${OWNER_PHONE}`}>
              <Phone className="mr-2 h-4 w-4" /> Call
            </a>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
