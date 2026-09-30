'use strict';

// Replaces the generic AI-generated regional dish photos (North/East/West/
// South) with real venue photography of the actual dishes now on the menu:
// Three Cheese Mini Kulcha (North), Chilli Paneer (East), Bombay Cutlet Pav
// (West), Curry Leaf Crispy Chicken (South). Updates both the Home page's
// and the Tasting Room page's regional pairing sections, since both reuse
// the same four region slots. Guarded by filename so this only runs once.

const path = require('path');
const fs = require('fs');

const DISH_PHOTOS_DIR = path.join(__dirname, '..', '..', 'seed-assets', 'dish-photos');
const MARKER_FILENAME = 'north-three-cheese-kulcha.png';

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
  return uploaded;
}

module.exports = async function patch7DishPhotos(strapi) {
  const already = await strapi.query('plugin::upload.file').findOne({ where: { name: MARKER_FILENAME } });
  if (already) {
    strapi.log.info('[patch] Real dish photos already loaded — skipping.');
    return;
  }

  strapi.log.info('[patch] Uploading real dish photos…');
  const photoIds = {};
  for (const [region, filename] of Object.entries(DISH_PHOTOS)) {
    const uploaded = await uploadPhoto(strapi, filename);
    photoIds[region] = uploaded.id;
    strapi.log.info(`[patch] Uploaded dish photo: ${region} (${filename})`);
  }

  const tastingRoomUid = 'api::tasting-room-page.tasting-room-page';
  const tastingRoomPage = await strapi.documents(tastingRoomUid).findFirst({ populate: { pairings: true } });
  if (tastingRoomPage?.pairings?.length) {
    const pairings = tastingRoomPage.pairings.map((p) => ({
      id: p.id,
      region: p.region,
      whisky: p.region === 'West' ? WEST_WHISKY : p.whisky,
      image: photoIds[p.region] ?? p.image,
    }));
    await strapi.documents(tastingRoomUid).update({
      documentId: tastingRoomPage.documentId,
      status: 'published',
      data: { pairings },
    });
    strapi.log.info('[patch] Updated tasting-room-page pairing photos.');
  }

  const homeUid = 'api::home-page.home-page';
  const homePage = await strapi.documents(homeUid).findFirst({ populate: { pairings: true } });
  if (homePage?.pairings?.length) {
    const pairings = homePage.pairings.map((p) => ({
      id: p.id,
      region: p.region,
      whisky: p.whisky,
      image: photoIds[p.region] ?? p.image,
    }));
    await strapi.documents(homeUid).update({
      documentId: homePage.documentId,
      status: 'published',
      data: { pairings },
    });
    strapi.log.info('[patch] Updated home-page pairing photos.');
  }
};
