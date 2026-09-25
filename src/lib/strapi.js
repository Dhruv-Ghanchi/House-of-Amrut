// Strapi REST client: base URL, media URL resolution, and a small
// populate-query builder (nested components need explicit populate paths —
// `populate=*` does not reach media fields nested inside repeatable components).

export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

export function strapiMediaUrl(media) {
  if (!media?.url) return null;
  return media.url.startsWith("/") ? `${STRAPI_URL}${media.url}` : media.url;
}

function buildQuery(obj, prefix) {
  const parts = [];
  for (const [key, value] of Object.entries(obj ?? {})) {
    const k = prefix ? `${prefix}[${key}]` : key;
    if (value === true) {
      parts.push(`${encodeURIComponent(k)}=true`);
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      parts.push(buildQuery(value, k));
    } else if (value !== undefined && value !== null) {
      parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(value)}`);
    }
  }
  return parts.filter(Boolean).join("&");
}

export async function strapiFetch(path, params) {
  const qs = params ? `?${buildQuery(params)}` : "";
  const res = await fetch(`${STRAPI_URL}/api${path}${qs}`);
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${path} (${res.status})`);
  }
  const json = await res.json();
  return json.data;
}

// Populate shapes per content type — component fields need `true` to be
// included at all; component fields that themselves hold media need an
// explicit nested `populate`.
export const POPULATE = {
  global: { logo: true, navLinks: true },
  homePage: {
    heroVideo: true,
    heroPoster: true,
    tablesideLeftImage: true,
    tablesideRightImage: true,
    threeWays: { populate: { icon: true } },
    pairings: { populate: { image: true } },
    seo: true,
  },
  theHousePage: {
    heroImage: true,
    heritageImage: true,
    pillars: { populate: { icon: true } },
    gallery: { populate: { image: true } },
    seo: true,
  },
  experiencesPage: {
    heroImage: true,
    tablesideImage: true,
    diningImage: true,
    pillars: true,
    seo: true,
  },
  tastingRoomPage: {
    heroImage: true,
    pairings: { populate: { image: true } },
    seo: true,
  },
  libraryPage: { heroImage: true, vaultImage: true, seo: true },
  journeysPage: { heroImage: true, seo: true },
  contactPage: {
    heroImage: true,
    faq: true,
    seo: true,
    partySizeOptions: true,
    dateOptions: true,
    experienceOptions: true,
  },
  bottle: { image: true, profile: true },
  journey: { icon: true },
  menuCategory: { menu_items: true },
};
