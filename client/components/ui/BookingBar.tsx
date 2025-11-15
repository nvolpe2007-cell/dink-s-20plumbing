import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";

const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;
const PHONE_NUMBER = OWNER_PHONE || "+1 (310)-344-3833";

export default function BookingBar() {
  if (!PHONE_NUMBER) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 transform -translate-x-1/2 sm:hidden">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow-lg">
        <Button asChild size="sm" className="px-3 cta-book">
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={() => {
              try {
                navigator.sendBeacon(
                  "/api/track",
                  JSON.stringify({ event: "click-to-call", phone: PHONE_NUMBER, url: window.location.href }),
                );
              } catch (e) {
                // ignore
              }
            }}
            className="phone-number inline-flex items-center"
          >
            <Phone className="mr-2 h-4 w-4" /> Call Now
          </a>
        </Button>
        <Button asChild variant="secondary" size="sm" className="px-3">
          <a
            href={`sms:${PHONE_NUMBER}`}
            onClick={() => {
              try {
                navigator.sendBeacon(
                  "/api/track",
                  JSON.stringify({ event: "click-to-sms", phone: PHONE_NUMBER, url: window.location.href }),
                );
              } catch (e) {
                // ignore
              }
            }}
            className="phone-number inline-flex items-center"
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Text Us
          </a>
        </Button>
      </div>
    </div>
  );
}
