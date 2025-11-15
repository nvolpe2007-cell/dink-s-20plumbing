import { Phone, MessageSquare } from "lucide-react";

const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;
const phoneNumber = OWNER_PHONE || "+1 (310)-344-3833";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Dink's Plumbing</h3>
            <p className="text-gray-400 mb-4">
              Professional plumbing services for residential and commercial properties. 
              Licensed, insured, and trusted by the community.
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
                <Phone className="h-4 w-4" />
                Call {phoneNumber}
              </a>
              <a
                href={`sms:${phoneNumber}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Text {phoneNumber}
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <div className="space-y-2 text-gray-400">
              <div>Mon-Fri: 7:00 AM - 7:00 PM</div>
              <div>Saturday: 8:00 AM - 5:00 PM</div>
              <div>Sunday: Emergency Only</div>
              <div className="text-red-400 font-semibold mt-3">
                24/7 Emergency Service
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Dink's Plumbing. All rights reserved. Licensed & Insured.</p>
        </div>
      </div>
    </footer>
  );
}
