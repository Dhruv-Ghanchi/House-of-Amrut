'use strict';

// Adds the actual dish name to each regional pairing (e.g. "Three Cheese
// Mini Kulcha" for North) — patch-7 wired up the real photos but didn't
// have a `dish` field to fill in yet. Guarded per-page so it only fills
// what's still empty, never clobbering an edit made by hand.

const DISH_NAMES = {
  North: 'Three Cheese Mini Kulcha',
  East: 'Chilli Paneer',
  South: 'Curry Leaf Crispy Chicken',
  West: 'Bombay Cutlet Pav',
};

async function patchPage(strapi, uid) {
  const page = await strapi.documents(uid).findFirst({ populate: { pairings: true } });
  if (!page?.pairings?.length) return;
  if (page.pairings.every((p) => p.dish)) return;

  const pairings = page.pairings.map((p) => ({
    id: p.id,
    region: p.region,
    whisky: p.whisky,
    image: p.image?.id ?? p.image,
    dish: p.dish || DISH_NAMES[p.region],
  }));

  await strapi.documents(uid).update({
    documentId: page.documentId,
    status: 'published',
    data: { pairings },
  });
  strapi.log.info(`[patch] Set dish names on ${uid}.`);
}

module.exports = async function patch8DishNames(strapi) {
  await patchPage(strapi, 'api::tasting-room-page.tasting-room-page');
  await patchPage(strapi, 'api::home-page.home-page');
};
