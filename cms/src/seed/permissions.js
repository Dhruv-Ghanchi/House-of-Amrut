'use strict';

// Content types the public marketing site needs to read without an API token.
// Single types only expose `find`; collection types also expose `findOne`.
const SINGLE_TYPES = [
  'global',
  'home-page',
  'the-house-page',
  'experiences-page',
  'tasting-room-page',
  'library-page',
  'journeys-page',
  'contact-page',
];

const COLLECTION_TYPES = ['bottle', 'journey'];

// Publicly creatable but not publicly listable/readable — the reservation
// form submits here, but submissions should only be visible in the admin.
const PUBLIC_CREATE_TYPES = ['reservation'];

module.exports = async function setPublicReadPermissions(strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('[seed] Public role not found — skipping permission setup.');
    return;
  }

  const actions = [
    ...SINGLE_TYPES.map((uid) => `api::${uid}.${uid}.find`),
    ...COLLECTION_TYPES.flatMap((uid) => [
      `api::${uid}.${uid}.find`,
      `api::${uid}.${uid}.findOne`,
    ]),
    ...PUBLIC_CREATE_TYPES.map((uid) => `api::${uid}.${uid}.create`),
  ];

  for (const action of actions) {
    const existing = await strapi
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });

    if (!existing) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id },
      });
      strapi.log.info(`[seed] Granted public permission: ${action}`);
    }
  }
};
