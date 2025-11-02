import React, { useEffect, useRef, useState } from "react";

export default function ReviewsPanel({ ownerEmail }: { ownerEmail: string }) {
  const reviews = [
    {
      id: 1,
      name: "Maria K.",
      date: "Apr 7, 2022",
      excerpt: "Fast, honest, and fixed my leak the same day.",
      full: "Fast, honest, and fixed my leak the same day. Highly recommend Dink's Plumbing."
    },
    {
      id: 2,
      name: "John O.",
      date: "Mar 7, 2022",
      excerpt: "Always on time and efficient — great service.",
      full: "Always on time and efficient — great service. Dink's crew were professional and quick."
    },
    {
      id: 3,
      name: "Gerald C.",
      date: "Jul 29, 2021",
      excerpt: "We've relied on Dink's for years — dependable and honest.",
      full: "We've relied on Dink's for years — dependable and honest. Never disappointed."
    }
  ];

  const [expanded, setExpanded] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  // Try to load Elfsight widget script and render widget by its app id
  useEffect(() => {
    const APP_CLASS = "elfsight-app-7637e8fe-79b3-4a63-9d9e-ca81911779c1";
    // If widget exists already, mark loaded
    if (document.querySelector(`.${APP_CLASS}`)) {
      setWidgetLoaded(true);
      return;
    }

    const s = document.createElement("script");
    s.src = "https://apps.elfsight.com/p/platform.js";
    s.defer = true;
    s.onload = () => {
      // platform initializes automatically
      setTimeout(() => setWidgetLoaded(true), 500);
    };
    document.body.appendChild(s);

    return () => {
      // don't remove script to avoid disrupting other widgets
    };
  }, []);

  function prev() {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  }
  function next() {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">What people say</h3>
        <div className="flex gap-2">
          <button onClick={prev} className="rounded-md bg-muted px-3 py-1 text-sm">Prev</button>
          <button onClick={next} className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground">Next</button>
        </div>
      </div>

      { /* If Elfsight widget is available, render it. Otherwise fallback to local reviews carousel */ }
      {widgetLoaded ? (
        <div className="elfsight-widget-wrapper">
          <div className="elfsight-app-7637e8fe-79b3-4a63-9d9e-ca81911779c1" />
        </div>
      ) : (
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
          {reviews.map((r) => (
            <article
              key={r.id}
              onClick={() => setExpanded(expanded === r.id ? null : r.id)}
              className={`min-w-[280px] max-w-sm snap-start bg-card p-4 rounded-lg shadow-sm cursor-pointer transition-transform ${expanded === r.id ? "scale-105" : ""}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
                <div className="text-primary">★</div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{expanded === r.id ? r.full : r.excerpt}</p>
            </article>
          ))}
        </div>
      )}

      <div className="mt-3 text-right">
        <a className="text-sm text-primary underline" href={`mailto:${ownerEmail}?subject=${encodeURIComponent("I want to leave a review for Dink's Plumbing")}`}>Leave us a review</a>
      </div>

    </div>
  );
}
