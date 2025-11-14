import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Phone } from "lucide-react";

// Prevent ReferenceError if BOOKING_URL was referenced elsewhere in old builds
const BOOKING_URL: string | undefined = (typeof (globalThis as any).BOOKING_URL !== 'undefined') ? (globalThis as any).BOOKING_URL : undefined;

const OWNER_EMAIL =
  (import.meta.env.VITE_OWNER_EMAIL as string | undefined) ??
  "Plum4it2@yahoo.com";
const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;
const PHONE_NUMBER = OWNER_PHONE || "+1 (310)-344-3833";

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
  const hasEmail = !!OWNER_EMAIL;
  const hasPhone = !!OWNER_PHONE;

  if (!hasEmail && !hasPhone) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 transform -translate-x-1/2 sm:hidden">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow-lg">
        {hasPhone ? (
          <>
            <Button asChild size="sm" className="px-3 cta-book">
              <a href={`tel:${PHONE_NUMBER}`} onClick={() => { try { navigator.sendBeacon('/api/track', JSON.stringify({event: 'click-to-call', phone: PHONE_NUMBER, url: window.location.href})); } catch(e){} }} className="phone-number"><Phone className="mr-2 h-4 w-4" /> Call Now</a>
            </Button>
            <Button asChild variant="secondary" size="sm" className="px-3">
              <a href={`sms:${PHONE_NUMBER}`} onClick={() => { try { navigator.sendBeacon('/api/track', JSON.stringify({event: 'click-to-sms', phone: PHONE_NUMBER, url: window.location.href})); } catch(e){} }} className="phone-number"><Phone className="mr-2 h-4 w-4" /> Text Us</a>
            </Button>
          </>
        ) : null}

        {hasEmail ? (
          <Button asChild variant="secondary" size="sm" className="px-3 cta-book">
            <a href={`mailto:${OWNER_EMAIL}`} className="phone-number">
              <Phone className="mr-2 h-4 w-4 inline-block" /> Email
            </a>
          </Button>
        ) : null}

      </div>
    </div>
  );
}
