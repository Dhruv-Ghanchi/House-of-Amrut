'use strict';

const setPublicReadPermissions = require('./seed/permissions');
const seedContent = require('./seed/content');
const patch2 = require('./seed/patch-2');
const patch3 = require('./seed/patch-3');
const patch4RealBottles = require('./seed/patch-4-real-bottles');
const patch5DedupeBottles = require('./seed/patch-5-dedupe-bottles');

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    await setPublicReadPermissions(strapi);

    try {
      await seedContent(strapi);
    } catch (err) {
      strapi.log.error('[seed] Content seed failed — fix and restart to retry.');
      strapi.log.error(err);
    }

    try {
      await patch2(strapi);
    } catch (err) {
      strapi.log.error('[patch] Field patch failed — fix and restart to retry.');
      strapi.log.error(err);
    }

    try {
      await patch3(strapi);
    } catch (err) {
      strapi.log.error('[patch] Contact form patch failed — fix and restart to retry.');
      strapi.log.error(err);
    }

    try {
      await patch4RealBottles(strapi);
    } catch (err) {
      strapi.log.error('[patch] Real bottle catalog patch failed — fix and restart to retry.');
      strapi.log.error(err);
    }

    try {
      await patch5DedupeBottles(strapi);
    } catch (err) {
      strapi.log.error('[patch] Bottle dedupe failed — fix and restart to retry.');
      strapi.log.error(err);
    }
  },
};
