import { Phone, MessageSquare } from "lucide-react";

import { normalizeToE164 } from "@/lib/utils";

const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;
const phoneDisplay = OWNER_PHONE || "+13103443833";
const phoneNumber = normalizeToE164(phoneDisplay);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Feb2280196bca4733adf305cb694633d2%2F831d1a3998354903877cdecdb0c255cc?format=webp&width=800"
              alt="Dink's Plumbing"
              className="h-32 w-auto mb-4"
            />
            <h3 className="text-2xl font-bold mb-4">Dink's Plumbing</h3>
            <p className="text-gray-400 mb-4">
              Professional plumbing services for residential and commercial
              properties. Licensed, insured, and trusted by the community.
            </p>
            <p className="text-gray-400">
              321 E Fairview Blvd, Inglewood, CA 90302
            </p>
            <p className="text-gray-400 mt-2">
              Serving Inglewood, Los Angeles County &amp; the Greater Los
              Angeles area
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                Call {phoneDisplay}
              </a>
              <a
                href={`sms:${phoneNumber}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                Text {phoneDisplay}
              </a>
              <a
                href="mailto:Plum4it2@yahoo.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                Plum4it2@yahoo.com
              </a>
              <div className="text-gray-400">
                321 E Fairview Blvd, Inglewood, CA 90302
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <div className="space-y-2 text-gray-400">
              <div>Monday – Saturday: 8:00 AM – 8:00 PM</div>
              <div>Sunday: Emergency Only</div>
              <div className="text-red-400 font-semibold mt-3">
                24/7 Emergency Service
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Dink's Plumbing. All rights reserved.
            Licensed & Insured.
          </p>
        </div>
      </div>
    </footer>
  );
}
