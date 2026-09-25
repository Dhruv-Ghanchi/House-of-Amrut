import { useEffect } from "react";

// Applies a page's Strapi-managed meta description to the live document.
// The browser tab title is intentionally left alone — it always shows the
// fixed "House of Amrut" title set in index.html, not a per-page title.
// This is a client-side SPA, so this only affects a crawler that executes
// JS — it can't rewrite the static <meta> tags a link-preview bot reads
// from the initial HTML. True control of those needs SSR/prerendering.
export function useDocumentMeta(seo) {
  useEffect(() => {
    if (seo?.metaDescription) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", seo.metaDescription);
    }
  }, [seo]);
}
