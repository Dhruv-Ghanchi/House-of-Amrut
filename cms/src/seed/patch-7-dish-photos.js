'use strict';

// Replaces the generic AI-generated regional dish photos (North/East/West/
// South) with real venue photography of the actual dishes now on the menu:
// Three Cheese Mini Kulcha (North), Chilli Paneer (East), Bombay Cutlet Pav
// (West), Curry Leaf Crispy Chicken (South). Updates both the Home page's
// and the Tasting Room page's regional pairing sections, since both reuse
// the same four region slots.
//
// Gated per-pairing (image still null), not by a single global marker —
// an earlier version skipped forever once any upload with the marker name
// existed, even on runs where the page update silently never attached the
// photo id. This version re-checks on every boot and backfills whatever is
// still missing, so it heals itself regardless of what happened before.

const path = require('path');
const fs = require('fs');

const DISH_PHOTOS_DIR = path.join(__dirname, '..', '..', 'seed-assets', 'dish-photos');

const DISH_PHOTOS = {
  North: 'north-three-cheese-kulcha.png',
  East: 'east-chilli-paneer.png',
  South: 'south-curry-leaf-crispy-chicken.png',
  West: 'west-bombay-cutlet-pav.png',
};

const WEST_WHISKY = 'Amrut Indian Single Malt';

function fileEntry(filename) {
  const filepath = path.join(DISH_PHOTOS_DIR, filename);
  const stat = fs.statSync(filepath);
  const ext = path.extname(filename).slice(1).toLowerCase();
  const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
  return { filepath, originalFilename: filename, mimetype: mime, size: stat.size };
}

async function uploadPhoto(strapi, filename) {
  const [uploaded] = await strapi.plugin('upload').service('upload').upload({
    data: {},
    files: fileEntry(filename),
  });
  // Fall back to a fresh DB lookup if the upload service's return shape
  // ever fails to hand back a usable id — this is what let photo ids
  // silently evaporate into null images last time.
  if (uploaded?.id) return uploaded.id;
  const found = await strapi.query('plugin::upload.file').findOne({ where: { name: filename } });
  if (!found) throw new Error(`[patch] Upload of ${filename} did not produce a usable file id.`);
  return found.id;
}

module.exports = async function patch7DishPhotos(strapi) {
  const photoIds = {};
  async function getPhotoId(region) {
    if (photoIds[region]) return photoIds[region];
    const filename = DISH_PHOTOS[region];
    const existing = await strapi.query('plugin::upload.file').findOne({ where: { name: filename } });
    photoIds[region] = existing ? existing.id : await uploadPhoto(strapi, filename);
    return photoIds[region];
  }

  const targets = [
    { uid: 'api::tasting-room-page.tasting-room-page', withWhisky: true },
    { uid: 'api::home-page.home-page', withWhisky: false },
  ];

  for (const { uid, withWhisky } of targets) {
    const page = await strapi.documents(uid).findFirst({ populate: { pairings: true } });
    if (!page?.pairings?.length) continue;

    const missing = page.pairings.filter((p) => !p.image);
    if (!missing.length) {
      strapi.log.info(`[patch] Dish photos already present on ${uid} — skipping.`);
      continue;
    }

    const pairings = await Promise.all(page.pairings.map(async (p) => ({
      id: p.id,
      region: p.region,
      dish: p.dish,
      whisky: withWhisky && p.region === 'West' ? WEST_WHISKY : p.whisky,
      image: p.image ?? await getPhotoId(p.region),
    })));

    await strapi.documents(uid).update({
      documentId: page.documentId,
      status: 'published',
      data: { pairings },
    });
    strapi.log.info(`[patch] Backfilled dish photos on ${uid}.`);
  }
};
