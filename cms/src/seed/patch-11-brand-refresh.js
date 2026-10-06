'use strict';

// Swaps in the rebuilt brand assets: the gold-on-transparent logo (from the
// vector logo rebuild), a new hero background video, and a poster frame
// extracted from that same video (so the poster never mismatches the video
// mid-buffer, which otherwise looks like the old video briefly playing).
// SVG is skipped for the logo — plugins.js denies image/svg+xml uploads
// (XSS risk), so the 4000px transparent PNG from the same export is used.
//
// Gated by filename, not a global marker — each target is only skipped once
// it already points to this exact file, so an owner who later swaps the
// logo/video by hand in Strapi admin won't have this patch fight them on
// the next boot.

const path = require('path');
const fs = require('fs');

const LOGO_PATH = path.join(__dirname, '..', '..', 'seed-assets', 'logo', 'house-of-amrut-logo-gold-transparent.png');
const HERO_VIDEO_PATH = path.join(__dirname, '..', '..', 'seed-assets', 'hero', 'hero-video.mp4');
const HERO_POSTER_PATH = path.join(__dirname, '..', '..', 'seed-assets', 'hero', 'hero-poster.jpg');

async function uploadFile(strapi, filepath, mimetype) {
  const filename = path.basename(filepath);
  const stat = fs.statSync(filepath);
  const [uploaded] = await strapi.plugin('upload').service('upload').upload({
    data: {},
    files: { filepath, originalFilename: filename, mimetype, size: stat.size },
  });
  if (uploaded?.id) return uploaded.id;
  const found = await strapi.query('plugin::upload.file').findOne({ where: { name: filename } });
  if (!found) throw new Error(`[patch] Upload of ${filename} did not produce a usable file id.`);
  return found.id;
}

async function setLogo(strapi) {
  const filename = path.basename(LOGO_PATH);
  const uid = 'api::global.global';
  const page = await strapi.documents(uid).findFirst({ populate: { logo: true } });
  if (!page) return;
  if (page.logo?.name === filename) {
    strapi.log.info('[patch] Gold-transparent logo already set — skipping.');
    return;
  }

  const fileId = await uploadFile(strapi, LOGO_PATH, 'image/png');
  await strapi.documents(uid).update({ documentId: page.documentId, status: 'published', data: { logo: fileId } });
  strapi.log.info('[patch] Set the gold-transparent logo.');
}

async function setHeroVideo(strapi) {
  const filename = path.basename(HERO_VIDEO_PATH);
  const uid = 'api::home-page.home-page';
  const page = await strapi.documents(uid).findFirst({ populate: { heroVideo: true } });
  if (!page) return;
  if (page.heroVideo?.name === filename) {
    strapi.log.info('[patch] Hero video already set — skipping.');
    return;
  }

  const fileId = await uploadFile(strapi, HERO_VIDEO_PATH, 'video/mp4');
  await strapi.documents(uid).update({ documentId: page.documentId, status: 'published', data: { heroVideo: fileId } });
  strapi.log.info('[patch] Set the new hero background video.');
}

// The poster shows while the video buffers — if it's a frame from a
// different video than heroVideo, that mismatch reads as a glitchy swap
// once playback starts. This is the new video's own first frame, so it
// always matches.
async function setHeroPoster(strapi) {
  const filename = path.basename(HERO_POSTER_PATH);
  const uid = 'api::home-page.home-page';
  const page = await strapi.documents(uid).findFirst({ populate: { heroPoster: true } });
  if (!page) return;
  if (page.heroPoster?.name === filename) {
    strapi.log.info('[patch] Hero poster already set — skipping.');
    return;
  }

  const fileId = await uploadFile(strapi, HERO_POSTER_PATH, 'image/jpeg');
  await strapi.documents(uid).update({ documentId: page.documentId, status: 'published', data: { heroPoster: fileId } });
  strapi.log.info('[patch] Set the hero poster to match the new video.');
}

module.exports = async function patch11BrandRefresh(strapi) {
  await setLogo(strapi);
  await setHeroVideo(strapi);
  await setHeroPoster(strapi);
};
