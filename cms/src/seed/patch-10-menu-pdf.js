'use strict';

// Attaches the real House of Amrut menu PDF (as provided by the owner) to
// menuPdf, so the "Download Full Menu" button has something to serve.
// Gated on menuPdf being unset — clear that field in Strapi admin and
// restart to re-attach after swapping the source file.

const path = require('path');
const fs = require('fs');

const MENU_PDF_PATH = path.join(__dirname, '..', '..', 'seed-assets', 'menu', 'house-of-amrut-menu.pdf');

module.exports = async function patch10MenuPdf(strapi) {
  const uid = 'api::tasting-room-page.tasting-room-page';
  const page = await strapi.documents(uid).findFirst({ populate: { menuPdf: true } });
  if (!page) return;

  if (page.menuPdf) {
    strapi.log.info('[patch] Menu PDF already attached — skipping.');
    return;
  }

  const stat = fs.statSync(MENU_PDF_PATH);
  const [uploaded] = await strapi.plugin('upload').service('upload').upload({
    data: {},
    files: {
      filepath: MENU_PDF_PATH,
      originalFilename: 'house-of-amrut-menu.pdf',
      mimetype: 'application/pdf',
      size: stat.size,
    },
  });

  if (!uploaded?.id) {
    strapi.log.error('[patch] Menu PDF upload did not return a usable file id.');
    return;
  }

  await strapi.documents(uid).update({
    documentId: page.documentId,
    status: 'published',
    data: { menuPdf: uploaded.id },
  });
  strapi.log.info('[patch] Attached the real menu PDF.');
};
