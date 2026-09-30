'use strict';

// Sets the venue's coordinates for the Contact page map. Geocoded from the
// address already in the global singleton ("136 Newark Avenue, Jersey City,
// NJ 07302") via OpenStreetMap Nominatim. Unlike the other patches, this
// always overwrites rather than filling only-if-empty: these are derived
// technical values (not admin-editable copy), and an earlier version of
// this patch ran while the field was still `decimal` type, which Postgres
// silently rounded to 2 decimal places (~1km of error) — this corrects that.

const COORDINATES = {
  latitude: 40.7204522,
  longitude: -74.0434354,
};

module.exports = async function patch9(strapi) {
  const uid = 'api::global.global';
  const global = await strapi.documents(uid).findFirst();
  if (!global) return;

  const data = {};
  for (const [field, value] of Object.entries(COORDINATES)) {
    if (global[field] !== value) data[field] = value;
  }

  if (Object.keys(data).length === 0) return;

  await strapi.documents(uid).update({ documentId: global.documentId, status: 'published', data });
  strapi.log.info(`[patch] Set global map coordinates: ${Object.keys(data).join(', ')}`);
};
