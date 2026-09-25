'use strict';

// Replaces the 8 placeholder Library bottles with 19 real Amrut expressions,
// using the photos your colleague uploaded and researched real-world
// cask/ABV/tasting details. Guarded by a marker bottle name so this only
// ever runs once.

const path = require('path');
const fs = require('fs');

const PHOTOS_DIR = path.join(__dirname, '..', '..', 'seed-assets', 'bottle-photos');

const MIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg' };

function fileEntry(filename) {
  const filepath = path.join(PHOTOS_DIR, filename);
  const stat = fs.statSync(filepath);
  const ext = path.extname(filename).slice(1).toLowerCase();
  return { filepath, originalFilename: filename, mimetype: MIME[ext] || 'application/octet-stream', size: stat.size };
}

async function uploadPhoto(strapi, filename) {
  const [uploaded] = await strapi.plugin('upload').service('upload').upload({
    data: {},
    files: fileEntry(filename),
  });
  return uploaded;
}

const BOTTLES = [
  {
    name: 'Amrut Bagheera',
    photo: "Library-Limited edition-Amrut Bagheera.png",
    category: 'Limited Edition',
    year: '2020',
    cask: 'Sherry Cask Finish',
    profile: { sweetness: 78, smoke: 18, spice: 45, fruit: 85, oak: 70 },
  },
  {
    name: 'Amrut Fusion XI',
    photo: "Library-Limited edition-Amrut Fusion XI.png",
    category: 'Limited Edition',
    year: 'Non-Vintage',
    cask: 'Ex-Bourbon + Peated Malt',
    profile: { sweetness: 65, smoke: 45, spice: 50, fruit: 70, oak: 68 },
  },
  {
    name: "Amrut Greedy Angels Chairman's Reserve",
    photo: "Library-Limited edition-Amrut Greedy Angels Chairman's Reserve.png",
    category: 'Limited Edition',
    year: '2013',
    cask: 'Hand-Selected Oak Casks (8yo)',
    profile: { sweetness: 72, smoke: 35, spice: 55, fruit: 75, oak: 78 },
  },
  {
    name: 'Amrut Intermediate Sherry',
    photo: "Library-Limited edition-Amrut Intermediate Sherry.png",
    category: 'Limited Edition',
    year: '2015',
    cask: 'Ex-Bourbon → Sherry → Ex-Bourbon',
    profile: { sweetness: 68, smoke: 40, spice: 78, fruit: 82, oak: 90 },
  },
  {
    name: "Amrut Master Distiller's Reserve",
    photo: "Library-Limited edition-Amrut Master Distiller's Reserve.png",
    category: 'Limited Edition',
    year: '2023',
    cask: 'Ex-Bourbon + 4-Wood Custom Cask',
    profile: { sweetness: 75, smoke: 25, spice: 65, fruit: 80, oak: 88 },
  },
  {
    name: 'Amrut Portonova',
    photo: "Library-Limited edition-Amrut Portonova.png",
    category: 'Limited Edition',
    year: '2013',
    cask: 'Ex-Bourbon + Port Pipe',
    profile: { sweetness: 88, smoke: 15, spice: 60, fruit: 92, oak: 75 },
  },
  {
    name: 'Amrut Rye Single Malt Whisky',
    photo: "Library-Limited edition-Amrut Rye Single Malt Whisky.png",
    category: 'Limited Edition',
    year: '2017',
    cask: 'Ex-Bourbon (100% Malted Rye)',
    profile: { sweetness: 55, smoke: 20, spice: 82, fruit: 50, oak: 65 },
  },
  {
    name: 'Amrut Spectrum',
    photo: "Library-Limited edition-Amrut Spectrum .png",
    category: 'Limited Edition',
    year: '2021',
    cask: '4-Cask Blend (Am/Fr Oak, Oloroso, PX)',
    profile: { sweetness: 70, smoke: 15, spice: 75, fruit: 78, oak: 92 },
  },
  {
    name: 'Amrut Triparva',
    photo: "Library-Limited edition-Amrut Triparva.png",
    category: 'Limited Edition',
    year: '2019',
    cask: 'Triple Cask (Bourbon/Sherry/Brandy)',
    profile: { sweetness: 80, smoke: 10, spice: 40, fruit: 90, oak: 55 },
  },
  {
    name: 'Amrut Cask Strength',
    photo: "Library- DISTILLER'S RESERVE- Amrut Cask Strength.png",
    category: "Distiller's Reserve",
    year: 'Non-Vintage',
    cask: 'Ex-Bourbon, Cask Strength',
    profile: { sweetness: 68, smoke: 15, spice: 70, fruit: 72, oak: 80 },
  },
  {
    name: 'Amrut Fusion Indian Single Malt Whisky',
    photo: "Library- DISTILLER'S RESERVE-Amrut Fusion Indian Single Malt Whisky.png",
    category: "Distiller's Reserve",
    year: 'Non-Vintage',
    cask: 'Ex-Bourbon + Peated Malt',
    profile: { sweetness: 62, smoke: 45, spice: 48, fruit: 68, oak: 65 },
  },
  {
    name: 'Amrut Indian Single Malt Whisky',
    photo: "Library- DISTILLER'S RESERVE-Amrut Indian Single Malt Whisky-.png",
    category: "Distiller's Reserve",
    year: 'Non-Vintage',
    cask: 'Ex-Bourbon',
    profile: { sweetness: 75, smoke: 5, spice: 55, fruit: 70, oak: 72 },
  },
  {
    name: 'Amrut Peated Indian Single Malt Whisky',
    photo: "Library- DISTILLER'S RESERVE-Amrut Peated Indian Single Malt Whisky.png",
    category: "Distiller's Reserve",
    year: 'Non-Vintage',
    cask: 'Ex-Bourbon (Peated Barley)',
    profile: { sweetness: 60, smoke: 70, spice: 45, fruit: 55, oak: 60 },
  },
  {
    name: 'Amrut Peated Indian Single Malt Whisky Cask Strength',
    photo: "Library-DISTILLER'S RESERVE-Amrut Peated Indian Single Malt Whisky Cask Strength.png",
    category: "Distiller's Reserve",
    year: 'Non-Vintage',
    cask: 'Ex-Bourbon, Cask Strength (Peated)',
    profile: { sweetness: 58, smoke: 88, spice: 60, fruit: 58, oak: 75 },
  },
  {
    name: 'Amrut Prestige',
    photo: "Library- amrut prestige whiskey.png",
    category: "Distiller's Reserve",
    year: '1986',
    cask: 'Blended Malt, Multiple Casks',
    profile: { sweetness: 60, smoke: 25, spice: 50, fruit: 55, oak: 45 },
  },
  {
    name: 'Amrut Amalgam Malt Whiskey',
    photo: "Library-Amrutamalgam-malt whskey.png",
    category: "Distiller's Reserve",
    year: '2018',
    cask: 'Blended Malt, Global Casks',
    profile: { sweetness: 72, smoke: 20, spice: 58, fruit: 68, oak: 55 },
  },
  {
    name: 'Amrut Amalgam Peated Blended Malt',
    photo: "Library-AmrutAmalgampeatedwhiskey .png",
    category: "Distiller's Reserve",
    year: '2019',
    cask: 'Blended Malt, Global Casks (Peated)',
    profile: { sweetness: 65, smoke: 55, spice: 55, fruit: 62, oak: 55 },
  },
  {
    name: 'Amrut Single Cask Whisky',
    photo: "Library-singlecask-Amrut Single Cask whisky.png",
    category: 'Single Cask',
    year: '2013',
    cask: 'Ex-Bourbon Cask #3436',
    profile: { sweetness: 65, smoke: 20, spice: 65, fruit: 60, oak: 85 },
  },
  {
    name: 'Amrut Single Cask Peated',
    photo: "Library-singlecask-peated cask .png",
    category: 'Single Cask',
    year: '2021',
    cask: 'Peated Ex-Bourbon Cask #2126',
    profile: { sweetness: 55, smoke: 82, spice: 62, fruit: 50, oak: 80 },
  },
];

module.exports = async function patch4RealBottles(strapi) {
  const uid = 'api::bottle.bottle';
  const marker = await strapi.documents(uid).findFirst({ filters: { name: 'Amrut Prestige' } });
  if (marker) {
    strapi.log.info('[patch] Real bottles already loaded — skipping.');
    return;
  }

  strapi.log.info('[patch] Removing placeholder bottles…');
  const existing = await strapi.documents(uid).findMany({ fields: ['documentId'] });
  for (const b of existing) {
    await strapi.documents(uid).delete({ documentId: b.documentId });
  }

  strapi.log.info(`[patch] Uploading ${BOTTLES.length} real bottle photos and creating entries…`);
  for (const b of BOTTLES) {
    const image = await uploadPhoto(strapi, b.photo);
    await strapi.documents(uid).create({
      status: 'published',
      data: {
        name: b.name,
        year: b.year,
        cask: b.cask,
        category: b.category,
        image: image.id,
        profile: b.profile,
      },
    });
    strapi.log.info(`[patch] Created bottle: ${b.name}`);
  }

  strapi.log.info('[patch] Real bottle catalog loaded.');
};
