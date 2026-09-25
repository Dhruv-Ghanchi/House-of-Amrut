'use strict';

// One-time cleanup: an earlier restart raced two Strapi processes against
// the same database, so patch-4's migration partially double-ran and left
// duplicate bottle entries. This keeps the first (lowest id) entry per
// bottle name and deletes the rest. Safe to run repeatedly — a no-op once
// names are unique.

module.exports = async function patch5DedupeBottles(strapi) {
  const uid = 'api::bottle.bottle';
  const all = await strapi.documents(uid).findMany({
    fields: ['id', 'documentId', 'name'],
    sort: 'id:asc',
    pagination: { pageSize: 200 },
  });

  const seen = new Set();
  let deleted = 0;
  for (const b of all) {
    if (seen.has(b.name)) {
      await strapi.documents(uid).delete({ documentId: b.documentId });
      deleted += 1;
    } else {
      seen.add(b.name);
    }
  }

  if (deleted > 0) {
    strapi.log.info(`[patch] Removed ${deleted} duplicate bottle(s); ${seen.size} unique bottles remain.`);
  }
};
