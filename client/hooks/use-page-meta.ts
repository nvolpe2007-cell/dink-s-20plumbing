import { useEffect } from "react";

// index.html sets the default title/description/canonical/OG/Twitter tags
// for the homepage. Because this is a client-rendered SPA with no
// react-helmet-style head manager, every other route inherited those same
// homepage tags verbatim — wrong title, wrong description, and a canonical
// pointing at "/" from "/book". This hook lets a non-home route override
// them on mount and restores the previous values on unmount so navigating
// back doesn't leave stale tags behind.

const SITE_URL = "https://www.dinksplumbing.us";

function setMetaContent(selector: string, value: string): string | null {
  const el = document.head.querySelector(selector);
  if (!el) return null;
  const attr = el.tagName === "LINK" ? "href" : "content";
  const prev = el.getAttribute(attr);
  el.setAttribute(attr, value);
  return prev;
}

interface PageMetaOptions {
  /** Document title and og:title / twitter:title. */
  title: string;
  /** Meta description and og:description / twitter:description. */
  description: string;
  /** Route path, e.g. "/book", used to build the canonical and og:url. */
  path: string;
}

export function usePageMeta({ title, description, path }: PageMetaOptions) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const prevTitle = document.title;
    const prevValues: Array<[string, string | null]> = [
      ['meta[name="description"]', setMetaContent('meta[name="description"]', description)],
      ['link[rel="canonical"]', setMetaContent('link[rel="canonical"]', url)],
      ['meta[property="og:title"]', setMetaContent('meta[property="og:title"]', title)],
      [
        'meta[property="og:description"]',
        setMetaContent('meta[property="og:description"]', description),
      ],
      ['meta[property="og:url"]', setMetaContent('meta[property="og:url"]', url)],
      ['meta[name="twitter:title"]', setMetaContent('meta[name="twitter:title"]', title)],
      [
        'meta[name="twitter:description"]',
        setMetaContent('meta[name="twitter:description"]', description),
      ],
    ];

    document.title = title;

    return () => {
      document.title = prevTitle;
      for (const [selector, prev] of prevValues) {
        if (prev !== null) setMetaContent(selector, prev);
      }
    };
  }, [title, description, path]);
}
