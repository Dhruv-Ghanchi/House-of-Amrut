'use strict';

// Fills in fields added after the initial seed (icon on pillars, per-page
// SEO, two missed button/label strings, and alt text on existing media).
// Every write here is guarded — it only fills what's still empty, so it
// never clobbers an edit made by hand in the admin panel.

const path = require('path');
const fs = require('fs');

const ICONS_DIR = path.join(__dirname, '..', '..', 'seed-assets', 'icons');

const ALT_TEXT = {
  'hero-poster.jpg': 'Dimly lit luxury Amrut whisky bar',
  'tastingCart.jpg': 'The tasting cart with Amrut bottles',
  'tablesideCocktail.jpg': 'Tableside theatre craft cocktail service',
  'heritageArchive.jpg': 'Amrut distillery heritage archive',
  'bottlePlinth.jpg': 'Rare bottle pour',
  'privateDining.jpg': 'Private dining room at House of Amrut',
};

const SEO_DEFAULTS = {
  'home-page': {
    metaTitle: 'House of Amrut — Few Find It. Fewer Own The Night.',
    metaDescription:
      'A spirits library, tasting room and cocktail destination in Jersey City. Rare Indian single malt, guided tastings and tableside cocktail theatre.',
  },
  'the-house-page': {
    metaTitle: 'The House | House of Amrut',
    metaDescription:
      "Since 1948: the heritage, craftsmanship and interiors behind House of Amrut's spirits library and tasting room.",
  },
  'experiences-page': {
    metaTitle: 'Experiences | House of Amrut',
    metaDescription:
      'Curated evenings at House of Amrut — classic, contemporary and signature tastings, tableside cocktail theatre and private dining.',
  },
  'tasting-room-page': {
    metaTitle: 'The Tasting Room | House of Amrut',
    metaDescription: 'Signature cocktails, pure single malts and vintage flights, paired with regional Indian plates.',
  },
  'library-page': {
    metaTitle: 'The Spirits Library | House of Amrut',
    metaDescription: 'A vault of rare and exceptional Indian single malt, poured by the dram or by appointment.',
  },
  'journeys-page': {
    metaTitle: 'Curated Journeys | House of Amrut',
    metaDescription: "Four guided tasting flights through Amrut's single malts, narrated by the sommelier.",
  },
  'contact-page': {
    metaTitle: 'Contact & Reservations | House of Amrut',
    metaDescription: 'Reserve your table at House of Amrut in Jersey City, NJ. Hours, dress code and answers before you arrive.',
  },
};

async function uploadIcon(strapi, filename) {
  const filepath = path.join(ICONS_DIR, filename);
  const stat = fs.statSync(filepath);
  const [uploaded] = await strapi.plugin('upload').service('upload').upload({
    data: {},
    files: { filepath, originalFilename: filename, mimetype: 'image/svg+xml', size: stat.size },
  });
  return uploaded;
}

async function patchAltText(strapi) {
  for (const [filename, alternativeText] of Object.entries(ALT_TEXT)) {
    const files = await strapi.query('plugin::upload.file').findMany({
      where: { name: filename, $or: [{ alternativeText: null }, { alternativeText: '' }] },
    });
    for (const file of files) {
      await strapi.query('plugin::upload.file').update({ where: { id: file.id }, data: { alternativeText } });
    }
    if (files.length) strapi.log.info(`[patch] Set alt text on ${filename}`);
  }
}

async function patchPageSeo(strapi) {
  for (const [uid, seo] of Object.entries(SEO_DEFAULTS)) {
    const apiUid = `api::${uid}.${uid}`;
    const doc = await strapi.documents(apiUid).findFirst({ populate: ['seo'] });
    if (!doc) continue;
    if (doc.seo?.metaTitle) continue;
    await strapi.documents(apiUid).update({ documentId: doc.documentId, status: 'published', data: { seo } });
    strapi.log.info(`[patch] Set default SEO on ${uid}`);
  }
}

async function patchMissedLabels(strapi) {
  const journeysPage = await strapi.documents('api::journeys-page.journeys-page').findFirst();
  if (journeysPage && !journeysPage.reserveCtaLabel) {
    await strapi.documents('api::journeys-page.journeys-page').update({
      documentId: journeysPage.documentId,
      status: 'published',
      data: { reserveCtaLabel: 'Reserve This Journey' },
    });
    strapi.log.info('[patch] Set journeys-page.reserveCtaLabel');
  }

  const tastingRoomPage = await strapi.documents('api::tasting-room-page.tasting-room-page').findFirst();
  if (tastingRoomPage && !tastingRoomPage.pairedWithLabel) {
    await strapi.documents('api::tasting-room-page.tasting-room-page').update({
      documentId: tastingRoomPage.documentId,
      status: 'published',
      data: { pairedWithLabel: 'Paired With' },
    });
    strapi.log.info('[patch] Set tasting-room-page.pairedWithLabel');
  }
}

async function patchPillarIcons(strapi) {
  const home = await strapi.documents('api::home-page.home-page').findFirst({ populate: { threeWays: true } });
  if (!home?.threeWays?.length) return;
  if (home.threeWays.every((w) => w.icon)) return;

  const iconFiles = ['classic.svg', 'contemporary.svg', 'signature.svg'];
  const threeWays = [];
  for (let i = 0; i < home.threeWays.length; i++) {
    const way = home.threeWays[i];
    if (way.icon) {
      threeWays.push({ id: way.id, title: way.title, description: way.description, icon: way.icon.id ?? way.icon });
      continue;
    }
    const filename = iconFiles[i % iconFiles.length];
    const icon = await uploadIcon(strapi, filename);
    threeWays.push({ id: way.id, title: way.title, description: way.description, icon: icon.id });
  }
  await strapi.documents('api::home-page.home-page').update({
    documentId: home.documentId,
    status: 'published',
    data: { threeWays },
  });
  strapi.log.info('[patch] Set icons on home-page.threeWays');
}

module.exports = async function patch2(strapi) {
  await patchAltText(strapi);
  await patchPageSeo(strapi);
  await patchMissedLabels(strapi);
  await patchPillarIcons(strapi);
};
