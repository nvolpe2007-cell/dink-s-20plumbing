import { Phone } from "lucide-react";

import React from "react";
import { normalizeToE164 } from "@/lib/utils";

const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;

export default function Header() {
  const hasPhone = typeof OWNER_PHONE === "string" && OWNER_PHONE.length > 0;
  const phoneDisplay = hasPhone ? OWNER_PHONE : "+13103443833";
  const phoneNumber = normalizeToE164(phoneDisplay);
  const callHref = `tel:${phoneNumber}`;
  const textHref = `sms:${phoneNumber}`;

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-md"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {/* Main Header */}
      <div className="bg-transparent">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Logo - Mobile optimized */}
            <a
              href="/"
              className="floating-logo flex items-center gap-3 justify-start"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Feb2280196bca4733adf305cb694633d2%2F831d1a3998354903877cdecdb0c255cc?format=webp&width=800"
                alt="Dink's Plumbing"
                className="h-24 sm:h-32 lg:h-40 w-auto"
              />
              <span
                className="pipe-logo pipe-logo--lg brand-interactive text-4xl sm:text-5xl lg:text-7xl font-black text-blue-600 hidden sm:inline"
                aria-label="Dink's Plumbing"
              >
                Dink's Plumbing
              </span>
            </a>

            {/* Contact Info & CTA Buttons - Hidden on mobile, visible on desktop */}
            <div className="hidden sm:flex flex-col sm:flex-row items-center gap-4">
              <div className="flex flex-col items-end gap-1">
                <a
                  href={callHref}
                  className="text-lg font-bold text-blue-600 hover:text-blue-700"
                >
                  {phoneDisplay}
                </a>
                <a
                  href="mailto:Plum4it2@yahoo.com"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Plum4it2@yahoo.com
                </a>
              </div>
              <a
                href={callHref}
                role="button"
                className="cta-shine inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg cursor-pointer"
                aria-label={`Call ${phoneDisplay}`}
                style={{
                  WebkitTouchCallout: "default",
                  WebkitUserSelect: "none",
                }}
              >
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
