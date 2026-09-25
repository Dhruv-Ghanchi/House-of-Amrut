'use strict';

// Moves the last hardcoded piece of the site — the reservation form on the
// Contact page — into Strapi: every label, placeholder, dropdown option
// list, and the success message. Each field is filled only if it's still
// empty, so a hand-made edit in the admin is never overwritten — and a
// partial run (e.g. interrupted mid-boot) always gets completed next time
// instead of being permanently skipped.

const opts = (labels) => labels.map((label) => ({ label }));

const DEFAULTS = {
  addressLabel: 'Address',
  hoursLabel: 'Hours',
  dressCodeLabel: 'Dress Code',
  mapPlaceholderLabel: 'Jersey City, NJ',
  selectPlaceholder: 'Select',
  nameLabel: 'Full Name',
  namePlaceholder: 'Your name',
  emailLabel: 'Email',
  emailPlaceholder: 'you@email.com',
  phoneLabel: 'Phone Number',
  phonePlaceholder: 'Best number to reach you',
  partySizeLabel: 'Party Size',
  dateLabel: 'Date',
  timeLabel: 'Time',
  experienceLabel: 'Experience',
  notesLabel: 'Special Requests',
  notesPlaceholder: 'Anniversary, dietary notes, seating preference…',
  submitLabel: 'Submit Reservation Request',
  successTitle: 'Request Received',
  successMessage: 'The house will be in touch within 24 hours to confirm your evening.',
};

const OPTION_DEFAULTS = {
  partySizeOptions: ['1', '2', '3', '4', '5', '6', '7', '8+ guests'],
  dateOptions: ['Mon 09', 'Tue 10', 'Wed 11', 'Thu 12', 'Fri 13', 'Sat 14'],
  experienceOptions: ['Tasting Room', 'Guided Journey', 'Private Event'],
};

module.exports = async function patch3(strapi) {
  const uid = 'api::contact-page.contact-page';
  const page = await strapi.documents(uid).findFirst({
    populate: ['partySizeOptions', 'dateOptions', 'experienceOptions'],
  });
  if (!page) return;

  const data = {};
  for (const [field, value] of Object.entries(DEFAULTS)) {
    if (!page[field]) data[field] = value;
  }
  for (const [field, labels] of Object.entries(OPTION_DEFAULTS)) {
    if (!page[field]?.length) data[field] = opts(labels);
  }

  if (Object.keys(data).length === 0) return;

  await strapi.documents(uid).update({ documentId: page.documentId, status: 'published', data });
  strapi.log.info(`[patch] Filled contact-page fields: ${Object.keys(data).join(', ')}`);
};
