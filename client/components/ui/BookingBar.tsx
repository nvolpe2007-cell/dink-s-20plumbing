import React from "react";
import { Phone, MessageSquare } from "lucide-react";
import { normalizeToE164 } from "@/lib/utils";

const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;
const phoneDisplay = OWNER_PHONE || "+1 (310)-344-3833";
const phoneNumber = normalizeToE164(phoneDisplay);
const callHref = `tel:${phoneNumber}`;
const textHref = `sms:${phoneNumber}`;

export default function BookingBar() {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 transform -translate-x-1/2 sm:hidden">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow-lg">
        <a
          href={callHref}
          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-md"
        >
          <Phone className="mr-2 h-4 w-4" /> Call Now
        </a>
        <a
          href={textHref}
          className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-900 font-semibold rounded-full hover:bg-gray-200 transition-colors"
        >
          <MessageSquare className="mr-2 h-4 w-4" /> Text Us
        </a>
      </div>
    </div>
  );
}
