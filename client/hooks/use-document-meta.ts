import { useEffect } from "react";

const SITE_ORIGIN = "https://www.dinksplumbing.us";

interface DocumentMetaOptions {
  title?: string;
  description?: string;
  canonicalPath?: string;
  noindex?: boolean;
}

/**
 * This SPA has a single static index.html, so every route otherwise shares
 * the homepage's title/description/canonical. Sets per-route values on
 * mount and restores the previous ones on unmount so client-side
 * navigation (no full page reload) doesn't leak one route's tags into
 * the next.
 */
export function useDocumentMeta({
  title,
  description,
  canonicalPath,
  noindex,
}: DocumentMetaOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    const prevDescription = descriptionTag?.getAttribute("content") ?? null;
    if (description && descriptionTag) {
      descriptionTag.setAttribute("content", description);
    }

    const canonicalTag = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonicalTag?.getAttribute("href") ?? null;
    if (canonicalPath && canonicalTag) {
      canonicalTag.setAttribute("href", `${SITE_ORIGIN}${canonicalPath}`);
    }

    const robotsTag = document.querySelector('meta[name="robots"]');
    const prevRobots = robotsTag?.getAttribute("content") ?? null;
    if (noindex && robotsTag) {
      robotsTag.setAttribute("content", "noindex, follow");
    }

    return () => {
      document.title = prevTitle;
      if (descriptionTag && prevDescription !== null) {
        descriptionTag.setAttribute("content", prevDescription);
      }
      if (canonicalTag && prevCanonical !== null) {
        canonicalTag.setAttribute("href", prevCanonical);
      }
      if (robotsTag && prevRobots !== null) {
        robotsTag.setAttribute("content", prevRobots);
      }
    };
  }, [title, description, canonicalPath, noindex]);
}
