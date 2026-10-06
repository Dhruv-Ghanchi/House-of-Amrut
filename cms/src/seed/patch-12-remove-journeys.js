'use strict';

// The Journeys page and journey collection type were removed from the
// codebase (content-type folders deleted), so strapi.documents() can no
// longer address them — there's no model left to look up. Their tables
// still exist in the database from before, though, so this drops them
// directly via a raw query. CASCADE also clears Strapi's relation link
// tables (e.g. journeys_icon_lnk) that hold a foreign key into them.
// IF EXISTS makes this a no-op once it's run. Postgres-specific syntax
// (production's database) — a local SQLite dev db will log a harmless
// error here since SQLite's DROP TABLE has no CASCADE, caught by the
// try/catch around every patch in index.js.

const TABLES = ['journeys', 'journeys_page'];

async function dropOrphanedTables(strapi) {
  for (const table of TABLES) {
    await strapi.db.connection.raw(`DROP TABLE IF EXISTS "${table}" CASCADE`);
  }
  strapi.log.info('[patch] Dropped journeys/journeys_page tables (if present).');
}

// The live global singleton still has a "Journeys" nav link seeded in long
// before this page existed to remove — that's real content, not something
// a schema change touches, so it has to be dropped here explicitly.
async function removeNavLink(strapi) {
  const uid = 'api::global.global';
  const global = await strapi.documents(uid).findFirst({ populate: { navLinks: true } });
  if (!global?.navLinks?.length) return;

  const kept = global.navLinks.filter((n) => n.url !== '/journeys');
  if (kept.length === global.navLinks.length) return;

  await strapi.documents(uid).update({
    documentId: global.documentId,
    status: 'published',
    data: { navLinks: kept },
  });
  strapi.log.info('[patch] Removed the Journeys nav link.');
}

module.exports = async function patch12RemoveJourneys(strapi) {
  await dropOrphanedTables(strapi);
  await removeNavLink(strapi);
};
