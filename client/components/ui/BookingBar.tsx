import React from "react";
import { Phone, MessageSquare } from "lucide-react";
import { normalizeToE164 } from "@/lib/utils";

const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;
const phoneDisplay = OWNER_PHONE || "+1 (310) 344-3833";
const phoneNumber = normalizeToE164(phoneDisplay);
const callHref = `tel:${phoneNumber}`;
const textHref = `sms:${phoneNumber}`;

export default function BookingBar() {
  return (
    <div
      className="fixed left-0 right-0 z-40 sm:hidden"
      style={{ bottom: "calc(1rem + 10px)" }}
    >
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex gap-2">
          <a
            href={callHref}
            role="button"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md cursor-pointer text-base"
            style={{ WebkitTouchCallout: "default", WebkitUserSelect: "none" }}
          >
            <Phone className="h-5 w-5" />
            <span>Call Now</span>
          </a>
          <a
            href={textHref}
            role="button"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-md cursor-pointer text-base"
            style={{ WebkitTouchCallout: "default", WebkitUserSelect: "none" }}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Text</span>
          </a>
        </div>
      </div>
    </div>
  );
}
