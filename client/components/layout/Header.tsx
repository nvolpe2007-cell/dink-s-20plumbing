import { Phone } from "lucide-react";

import React, { useState, useEffect, useRef } from "react";
import { normalizeToE164 } from "@/lib/utils";

const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;

export default function Header() {
  const hasPhone = typeof OWNER_PHONE === "string" && OWNER_PHONE.length > 0;
  const phoneDisplay = hasPhone ? OWNER_PHONE : "+13103443833";
  const phoneNumber = normalizeToE164(phoneDisplay);
  const callHref = `tel:${phoneNumber}`;
  const textHref = `sms:${phoneNumber}`;

  const [logoScale, setLogoScale] = useState(1);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 640;
  });
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    if (!isMobile) {
      setLogoScale(1);
      return;
    }

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 0) {
        setLogoScale(0.4);
      } else {
        setLogoScale(1);
      }

      lastScrollRef.current = currentScroll;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (window.scrollY === lastScrollRef.current) {
          setLogoScale(1);
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);
      if (!mobile) {
        setLogoScale(1);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full ${isMobile ? "bg-transparent border-0 shadow-none" : "bg-white border-b border-gray-200 shadow-md"}`}
      style={{ paddingTop: "env(safe-area-inset-top)", transition: "background 0.3s ease" }}
    >
      {/* Main Header */}
      <div className="bg-transparent w-full">
        <div className="w-full px-3 sm:px-4 py-1 sm:py-1.5 md:py-1 lg:py-1 flex justify-center relative">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* Desktop contact info floating right */}
            <div className="hidden sm:flex flex-col items-end gap-1 md:gap-1 absolute top-2 md:top-1.5 right-4 text-right">
              <a
                href={callHref}
                className="text-lg font-bold text-blue-600 hover:text-blue-700"
              >
                {phoneDisplay}
              </a>
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

            {/* Logo - Mobile optimized */}
            <a
              href="/"
              className="floating-logo flex items-center gap-3 justify-center"
              style={{
                transform: isMobile ? `scale(${logoScale})` : "scale(1)",
                transformOrigin: "center center",
                transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Feb2280196bca4733adf305cb694633d2%2Ffed4a654c08b4c7aa4bc83e951acdd96?format=webp&width=800"
                alt="Dink's Plumbing"
                className="h-28 sm:h-36 md:h-32 lg:h-40 w-auto"
              />
              <span
                className="pipe-logo pipe-logo--lg brand-interactive text-6xl sm:text-7xl md:text-6xl lg:text-7xl font-black text-blue-600 hidden sm:inline"
                aria-label="Dink's Plumbing"
              >
                Dink's Plumbing
              </span>
            </a>

          </div>
        </div>
      </div>
    </header>
  );
}
