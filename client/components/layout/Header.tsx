import { Phone } from "lucide-react";

import React from "react";
import { normalizeToE164 } from "@/lib/utils";

const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;

export default function Header() {
  const hasPhone = typeof OWNER_PHONE === "string" && OWNER_PHONE.length > 0;
  const phoneDisplay = hasPhone ? OWNER_PHONE : "+1 (310)-344-3833";
  const phoneNumber = normalizeToE164(phoneDisplay);
  const callHref = `tel:${phoneNumber}`;
  const textHref = `sms:${phoneNumber}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      {/* Main Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center sm:justify-between flex-wrap gap-4">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <span className="pipe-logo pipe-logo--lg brand-interactive text-5xl sm:text-6xl lg:text-7xl font-black text-blue-400 drop-shadow-lg" aria-label="Dink's Plumbing">Dink's Plumbing</span>
            </a>

            {/* CTA Buttons - hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
              <a
                href={callHref}
                role="button"
                className="cta-shine inline-flex items-center gap-2 px-3 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white font-semibold rounded-full sm:rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg cursor-pointer"
                aria-label={`Call ${phoneDisplay}`}
                style={{ WebkitTouchCallout: "default", WebkitUserSelect: "none" }}
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Call Now</span>
              </a>
              <a
                href={textHref}
                role="button"
                className="cta-shine inline-flex items-center gap-2 px-3 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-900 font-semibold rounded-full sm:rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                aria-label="Text us"
                style={{ WebkitTouchCallout: "default", WebkitUserSelect: "none" }}
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Text Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
