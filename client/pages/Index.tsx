import {
  CheckCircle2,
  Clock,
  Shield,
  Star,
  Wrench,
  Phone,
  MessageSquare,
  Award,
  Users,
} from "lucide-react";
import React, { useEffect } from "react";

import LeadForm from "@/components/LeadForm";
import { normalizeToE164 } from "@/lib/utils";

const OWNER_EMAIL =
  (import.meta.env.VITE_OWNER_EMAIL as string | undefined) ??
  "Plum4it2@yahoo.com";
const OWNER_PHONE = import.meta.env.VITE_OWNER_PHONE as string | undefined;
const phoneDisplay = OWNER_PHONE || "+13103443833";
const phoneNumber = normalizeToE164(phoneDisplay);
const callHref = `tel:${phoneNumber}`;
const textHref = `sms:${phoneNumber}`;
const phoneHref = callHref;

export default function Index() {
  useEffect(() => {
    // Mount lead form into the placeholder to avoid hydration mismatch and keep it modular
    const root = document.getElementById("lead-form-root");
    if (root && root.childElementCount === 0) {
      const el = document.createElement("div");
      root.appendChild(el);
      // render with React in-place
      // dynamic import not necessary here; render directly
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      import("react-dom/client").then((ReactDOM) => {
        const rc = (ReactDOM as any).createRoot(el);
        rc.render(React.createElement(LeadForm, {}));
      });
    }
  }, []);

  return (
    <div className="bg-white pb-24 sm:pb-0">
      {/* LocalBusiness structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Plumber",
            name: "Dink's Plumbing",
            url: window.location.origin,
            telephone:
              (import.meta.env.VITE_OWNER_PHONE as string | undefined) ||
              "+13103443833",
            address: {
              "@type": "PostalAddress",
              streetAddress: "",
              addressLocality: "",
              addressRegion: "",
              postalCode: "",
              addressCountry: "US",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "500",
            },
            priceRange: "$$",
          }),
        }}
      />

      {/* Reviews structured data example */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: { "@type": "Service", name: "Dink's Plumbing" },
            author: { "@type": "Person", name: "Maria K." },
            reviewBody: "Fast, honest, and fixed my leak the same day.",
            reviewRating: { "@type": "Rating", ratingValue: 5 },
          }),
        }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-6 sm:py-10 -mt-2 sm:-mt-4">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Message */}
            <div className="text-center lg:text-left">
              <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                ⚡ Same-Day Service • Licensed & Insured
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-600 mb-4 sm:mb-6 leading-tight">
                Fast, Reliable Plumbing Services You Can Trust
              </h1>

              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                Expert plumbing repairs and installations. No job too big or
                small. Same-day service available. Call now for a free estimate!
              </p>

              {/* Main CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 w-full">
                <a
                  href={callHref}
                  role="button"
                  className="cta-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 text-white text-base sm:text-lg font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center cursor-pointer min-h-12"
                  style={{
                    WebkitTouchCallout: "default",
                    WebkitUserSelect: "none",
                  }}
                >
                  <Phone className="h-5 w-5" />
                  <span className="ml-2">Call Now</span>
                </a>
                <a
                  href={textHref}
                  role="button"
                  className="cta-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gray-900 text-white text-base sm:text-lg font-bold rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center cursor-pointer min-h-12"
                  style={{
                    WebkitTouchCallout: "default",
                    WebkitUserSelect: "none",
                  }}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="ml-2">Send Text</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">1000+ Happy Customers</span>
                </div>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Feb2280196bca4733adf305cb694633d2%2Fac7cc7a74679414cb03a25810c57deef?format=webp&width=800"
                  alt="Professional bathroom renovation"
                  loading="lazy"
                  className="rounded-lg shadow-md w-full h-48 sm:h-56 md:h-48 lg:h-56 object-cover"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Feb2280196bca4733adf305cb694633d2%2F16179b399fc84907a66c72deca2321bd?format=webp&width=800"
                  alt="Professional pipe installation and plumbing work"
                  loading="lazy"
                  className="rounded-lg shadow-md w-full h-64 sm:h-72 md:h-64 lg:h-72 object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Feb2280196bca4733adf305cb694633d2%2F0ca09b896fe44f0f9fb9aca7d1c39fc0?format=webp&width=800"
                  alt="Modern shower installation and bathroom design"
                  loading="lazy"
                  className="rounded-lg shadow-md w-full h-64 sm:h-72 md:h-64 lg:h-72 object-cover"
                />
                <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-sm">Emergency Service Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Plumbing Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From routine maintenance to emergency repairs, we handle it all
              with expertise and care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Wrench,
                title: "Leak Repair",
                desc: "Fast detection and repair of all types of leaks",
              },
              {
                icon: CheckCircle2,
                title: "Drain Cleaning",
                desc: "Professional clearing of clogged drains and pipes",
              },
              {
                icon: Clock,
                title: "Water Heater Service",
                desc: "Installation, repair, and maintenance",
              },
              {
                icon: Shield,
                title: "Emergency Repairs",
                desc: "24/7 availability for urgent plumbing issues",
              },
              {
                icon: CheckCircle2,
                title: "Faucet Installation",
                desc: "Expert installation and repair of all fixtures",
              },
              {
                icon: Wrench,
                title: "Toilet Repair",
                desc: "Quick fixes for running, leaking, or clogged toilets",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Dink's Plumbing?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Same-Day Service</h3>
              <p className="text-gray-600">
                Most repairs completed the same day. We respect your time and
                schedule.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Upfront Pricing</h3>
              <p className="text-gray-600">
                No hidden fees. You'll know the cost before we start any work.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                All work backed by our satisfaction guarantee and warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-6 w-6 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>
            <p className="text-lg text-gray-600 mb-4">
              Rated 4.9/5 from over 500 reviews
            </p>
            <a
              href="https://www.yelp.com/biz/dinks-plumbing-inglewood"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              See All Reviews on Yelp
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7z" />
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Anonymous",
                text: "Dink's Plumbing beat the estimate that I received from Roto Rooter by $400. I appreciate them for installing my tankless water heater. So thankful for the referral from my neighbor. Service, price and results! Thumbs Up!",
                rating: 5,
              },
              {
                name: "Gerald C.",
                text: "We've relied on Dink's Plumbing for over 10 years because his honest, reliable, dependable service! He always uses quality products and provides professional recommendations & options! I would highly recommend using Dink's Plumbing to all my family & friends!",
                rating: 5,
              },
              {
                name: "Yelp Verified Customer",
                text: "Professional, reliable, and honest work. They provide transparent pricing and quality service. Dink's Plumbing is our go-to for all plumbing needs.",
                rating: 5,
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{review.text}"</p>
                <div className="font-semibold text-gray-900">{review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Fix Your Plumbing Problem?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Call now for fast, professional service. We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={callHref}
              role="button"
              className="cta-shine inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg cursor-pointer"
              style={{
                WebkitTouchCallout: "default",
                WebkitUserSelect: "none",
                backgroundColor: "rgba(37, 60, 234, 1)",
              }}
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
            <a
              href={textHref}
              role="button"
              className="cta-shine inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white text-lg font-bold rounded-lg hover:bg-gray-800 transition-all shadow-lg cursor-pointer"
              style={{
                WebkitTouchCallout: "default",
                WebkitUserSelect: "none",
              }}
            >
              <MessageSquare className="h-5 w-5" />
              Send a Text
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="container px-4 py-3">
          <div className="flex gap-2">
            <a
              href={callHref}
              role="button"
              className="cta-shine flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-bold rounded-lg cursor-pointer"
              style={{
                WebkitTouchCallout: "default",
                WebkitUserSelect: "none",
              }}
            >
              <Phone className="h-5 w-5" />
              <span className="ml-2">Call Now</span>
            </a>
            <a
              href={textHref}
              role="button"
              className="cta-shine flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white font-bold rounded-lg cursor-pointer"
              style={{
                WebkitTouchCallout: "default",
                WebkitUserSelect: "none",
              }}
            >
              <MessageSquare className="h-5 w-5" />
              <span className="ml-2">Text</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
