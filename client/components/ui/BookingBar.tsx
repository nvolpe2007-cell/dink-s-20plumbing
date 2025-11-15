import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";
import { normalizeToE164 } from "@/lib/utils";

const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;
const phoneDisplay = OWNER_PHONE || "+1 (310)-344-3833";
const phoneNumber = normalizeToE164(phoneDisplay);

export default function BookingBar() {
  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleTextClick = () => {
    window.location.href = `sms:${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-50 transform -translate-x-1/2 sm:hidden">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow-lg">
        <Button onClick={handleCallClick} size="sm" className="px-3 cta-book cursor-pointer">
          <Phone className="mr-2 h-4 w-4" /> Call Now
        </Button>
        <Button onClick={handleTextClick} variant="secondary" size="sm" className="px-3 cursor-pointer">
          <MessageSquare className="mr-2 h-4 w-4" /> Text Us
        </Button>
      </div>
    </div>
  );
}
