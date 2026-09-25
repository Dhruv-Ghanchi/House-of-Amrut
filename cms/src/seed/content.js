'use strict';

const path = require('path');
const fs = require('fs');

const SEED_ASSETS = path.join(__dirname, '..', '..', 'seed-assets');
const IMAGES_DIR = path.join(SEED_ASSETS, 'images');
const VIDEOS_DIR = path.join(SEED_ASSETS, 'videos');
const ICONS_DIR = path.join(SEED_ASSETS, 'icons');

const MIME = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', svg: 'image/svg+xml', mp4: 'video/mp4' };

function fileEntry(dir, filename) {
  const filepath = path.join(dir, filename);
  const stat = fs.statSync(filepath);
  const ext = path.extname(filename).slice(1).toLowerCase();
  return { filepath, originalFilename: filename, mimetype: MIME[ext] || 'application/octet-stream', size: stat.size };
}

async function uploadAsset(strapi, dir, filename) {
  const [uploaded] = await strapi.plugin('upload').service('upload').upload({
    data: {},
    files: fileEntry(dir, filename),
  });
  return uploaded;
}

module.exports = async function seedContent(strapi) {
  const already = await strapi.documents('api::global.global').findFirst();
  if (already) {
    strapi.log.info('[seed] Content already present — skipping.');
    return;
  }

  strapi.log.info('[seed] Uploading media assets…');
  const img = {};
  const imageFiles = {
    heroBar: 'heroBar.jpg',
    tastingCart: 'tastingCart.jpg',
    tablesideCocktail: 'tablesideCocktail.jpg',
    dishNorth: '70d688159_generated_ced416f2.jpg',
    dishEast: 'fb222bfdb_generated_3f3b396d.jpg',
    dishWest: '7a28416b0_generated_09c02005.jpg',
    dishSouth: '3627954d8_generated_4f8d61a3.jpg',
    theHouseHero: 'theHouseHero.jpg',
    heritageArchive: 'heritageArchive.jpg',
    experiencesHero: 'experiencesHero.jpg',
    tastingRoomHero: 'tastingRoomHero.jpg',
    libraryHero: 'libraryHero.jpg',
    journeysHero: 'journeysHero.jpg',
    contactHero: 'contactHero.jpg',
    loungeInterior: 'loungeInterior.jpg',
    privateBooth: 'privateBooth.jpg',
    privateDining: 'privateDining.jpg',
    libraryTile: 'libraryTile.jpg',
    bottlePlinth: 'bottlePlinth.jpg',
    heroPoster: 'hero-poster.jpg',
    logo: 'logo.png',
  };
  for (const [key, filename] of Object.entries(imageFiles)) {
    img[key] = await uploadAsset(strapi, IMAGES_DIR, filename);
  }
  const heroVideo = await uploadAsset(strapi, VIDEOS_DIR, 'hero.mp4');

  strapi.log.info('[seed] Writing global settings…');
  await strapi.documents('api::global.global').create({
    status: 'published',
    data: {
      siteName: 'House of Amrut',
      logo: img.logo.id,
      footerTagline: 'A spirits library, tasting room and cocktail destination.',
      reserveCtaLabel: 'Reserve Your Table',
      navLinks: [
        { label: 'The House', url: '/the-house' },
        { label: 'Experiences', url: '/experiences' },
        { label: 'Tasting Room', url: '/tasting-room' },
        { label: 'Library', url: '/library' },
        { label: 'Journeys', url: '/journeys' },
        { label: 'Contact', url: '/contact' },
      ],
      address: 'BLJC, 136 Newark Avenue, Jersey City, NJ 07302',
      hours: 'Tuesday to Sunday · 6:00 PM to 1:00 AM',
      closedNote: 'Closed Mondays',
      dressCode: 'Smart Elegant · 21+ Only',
      instagramHandle: '@houseofamrut',
      instagramUrl: 'https://instagram.com',
      copyrightText: '© 2024 House of Amrut. All Rights Reserved.',
      footerMotto: 'Few Find It. Fewer Own The Night.',
      designerCredit: 'Designed by Dhruv Ghanchi.',
    },
  });

  strapi.log.info('[seed] Writing home page…');
  await strapi.documents('api::home-page.home-page').create({
    status: 'published',
    data: {
      heroEyebrow: 'A Spirits Library · Tasting Room · Cocktail Destination',
      heroTitle: 'House of Amrut',
      heroSubtitle: 'Few find it. Fewer own the night.',
      heroCtaLabel: 'Enter The House',
      heroVideo: heroVideo.id,
      heroPoster: img.heroPoster.id,
      legacyEyebrow: 'Est. 1948 · Jersey City',
      legacyTitle: "A Journey Through Amrut's Legacy",
      legacyText:
        'An intimate world of rare spirits, considered cocktails and stories from India, gathered within a single house where heritage is poured, not printed. Here, every glass carries the weight of seven decades of craft.',
      threeWaysEyebrow: 'The Experience',
      threeWaysTitle: 'Three Ways to Experience the House',
      threeWays: [
        { title: 'Classic', description: 'Familiar, through an Amrut lens.' },
        { title: 'Contemporary', description: 'Classics reinterpreted.' },
        { title: 'Signature', description: 'The spirit of India.' },
      ],
      tablesideLeftLabel: '01 · Pour',
      tablesideLeftTitle: 'The Tasting Cart',
      tablesideLeftImage: img.tastingCart.id,
      tablesideRightLabel: '02 · Craft',
      tablesideRightTitle: 'Tableside Theatre',
      tablesideRightImage: img.tablesideCocktail.id,
      tablesideQuote:
        'Where the mixologist becomes the storyteller, and every pour is performed in the glow of candlelight.',
      curatedJourneysEyebrow: 'Guided Flights',
      curatedJourneysTitle: 'Curated Journeys',
      regionalPairingsEyebrow: 'The Table',
      regionalPairingsTitle: 'From India, With Intent.',
      regionalPairingsText:
        'Regional plates composed to converse with the spirit. A map of India, told in four courses.',
      pairings: [
        { region: 'North', image: img.dishNorth.id },
        { region: 'East', image: img.dishEast.id },
        { region: 'West', image: img.dishWest.id },
        { region: 'South', image: img.dishSouth.id },
      ],
      footerCtaEyebrow: 'Reservations',
      footerCtaTitle: 'The House Awaits.',
      footerCtaSubtitle: 'An evening worth remembering.',
      footerCtaLabel: 'Reserve Your Table',
    },
  });

  strapi.log.info('[seed] Writing The House page…');
  await strapi.documents('api::the-house-page.the-house-page').create({
    status: 'published',
    data: {
      heroEyebrow: 'The House',
      heroTitle: 'The House',
      heroSubtitle: 'Where Heritage Meets Modern Indulgence',
      heroImage: img.theHouseHero.id,
      heritageEyebrow: 'Our Heritage',
      heritageTitle: 'Since 1948, A Quiet Revolution',
      heritageText:
        "What began as a small distillery in Bangalore would, over seven decades, become the name that put Indian single malt on the world map. Amrut pioneered a spirit once thought impossible to craft in the tropics.\n\nHouse of Amrut is its sanctuary, a place where that legacy is not merely stored but poured, studied and celebrated. Every bottle on these shelves carries the weight of an unlikely triumph.",
      heritageImage: img.heritageArchive.id,
      craftsmanshipEyebrow: 'Craftsmanship & Philosophy',
      craftsmanshipTitle: 'The Making of a Spirit',
      pillars: [
        {
          title: 'Distillation',
          description:
            'Copper pot stills refining Indian six-row barley into a spirit of uncommon body and structure.',
        },
        {
          title: 'Maturation in the Tropics',
          description:
            "An unforgiving climate that accelerates the angels' share, concentrating flavour faster than any northern warehouse.",
        },
        {
          title: 'Artisan Blending',
          description: 'Casks selected by hand and married with intent. Each release a composition, never a formula.',
        },
      ],
      galleryTitle: 'Interior & Ambiance',
      gallery: [
        { image: img.loungeInterior.id, label: 'The Lounge', category: 'Lounge' },
        { image: img.privateBooth.id, label: 'Private Booths', category: 'Booths' },
        { image: img.heroBar.id, label: 'The Bar', category: 'Bar' },
        { image: img.libraryTile.id, label: 'The Library', category: 'Library' },
      ],
      ctaTitle: 'Enter the Spirits Library',
      ctaLabel: 'Explore Our Tasting Room',
      ctaLink: '/tasting-room',
    },
  });

  strapi.log.info('[seed] Writing Experiences page…');
  await strapi.documents('api::experiences-page.experiences-page').create({
    status: 'published',
    data: {
      heroEyebrow: 'Experiences',
      heroTitle: 'Experiences',
      heroSubtitle: 'Curated evenings, composed pour by pour.',
      heroImage: img.experiencesHero.id,
      pillarsEyebrow: 'The Three Pillars',
      pillarsTitle: 'Choose Your Evening',
      pillars: [
        {
          name: 'Classic',
          duration: '60 min',
          group: '1-4 guests',
          tier: '₹₹',
          description:
            "Familiar, through an Amrut lens. A guided flight of house expressions served neat, with still water and a brief on each pour's origin.",
        },
        {
          name: 'Contemporary',
          duration: '75 min',
          group: '1-6 guests',
          tier: '₹₹₹',
          description:
            "Classics reinterpreted. Our mixologists rebuild the canon of the Old Fashioned, Manhattan and Sour around Amrut's single malts, tableside.",
        },
        {
          name: 'Signature',
          duration: '90 min',
          group: '1-8 guests',
          tier: '₹₹₹₹',
          description:
            'The spirit of India. Rare allocations paired with regional plates, narrated by the sommelier from the Tasting Cart.',
        },
      ],
      tablesideEyebrow: 'Tableside Theatre',
      tablesideTitle: 'The Tasting Cart, At Your Table',
      tablesideText:
        'A private experience where the mixologist wheels the cart to your booth and composes each cocktail in the glow of candlelight. Bitters measured by eye, ice cut by hand, every gesture part of the performance.',
      tablesideImage: img.tablesideCocktail.id,
      tablesideCtaLabel: 'Enquire Privately',
      diningEyebrow: 'Private Dining & Events',
      diningTitle: 'Buy the House',
      diningText:
        'Reserve a private VIP room or take the house in its entirety. Bespoke menus, dedicated sommelier, and a sealed guest list for celebrations that deserve no audience but your own.',
      diningImage: img.privateDining.id,
      diningCtaLabel: 'Submit an Inquiry',
      stickyCtaLabel: 'Book an Experience',
    },
  });

  strapi.log.info('[seed] Writing Tasting Room page…');
  await strapi.documents('api::tasting-room-page.tasting-room-page').create({
    status: 'published',
    data: {
      heroEyebrow: 'The Tasting Room',
      heroTitle: 'The Tasting Room',
      heroSubtitle: 'A menu composed in shadow and gold.',
      heroImage: img.tastingRoomHero.id,
      downloadMenuLabel: 'Download Full Menu',
      pairingsEyebrow: 'Culinary Pairings',
      pairingsTitle: 'A Map of India, Paired',
      pairings: [
        { region: 'North', whisky: 'Amrut Naarangi', image: img.dishNorth.id },
        { region: 'East', whisky: 'Amrut Peated', image: img.dishEast.id },
        { region: 'West', whisky: 'Amrut Single Malt', image: img.dishWest.id },
        { region: 'South', whisky: 'Amrut Cask Strength', image: img.dishSouth.id },
      ],
    },
  });

  strapi.log.info('[seed] Writing Library page…');
  await strapi.documents('api::library-page.library-page').create({
    status: 'published',
    data: {
      heroEyebrow: 'The Library',
      heroTitle: 'The Spirits Library',
      heroSubtitle: 'A vault of rare and exceptional Indian single malt.',
      heroImage: img.libraryHero.id,
      vaultEyebrow: "Sommelier's Vault",
      vaultTitle: 'Pour By The Dram',
      vaultText:
        'Certain bottles never leave the shelf. They are too rare, too singular, too storied. At House of Amrut, these allocations are opened exclusively for pour-by-the-dram, measured by the sommelier for those who ask.',
      vaultImage: img.bottlePlinth.id,
      vaultBadge: 'By Appointment Only',
    },
  });

  strapi.log.info('[seed] Writing Journeys page…');
  await strapi.documents('api::journeys-page.journeys-page').create({
    status: 'published',
    data: {
      heroEyebrow: 'Journeys',
      heroTitle: 'Curated Journeys',
      heroSubtitle: 'Four guided tasting flights, narrated by the sommelier.',
      heroImage: img.journeysHero.id,
      sectionEyebrow: 'Flight Selection',
      sectionTitle: 'Four Routes Through the Spirit',
      quoteText:
        '"Each journey is guided. The sommelier pours, and the story follows. You are not drinking; you are listening."',
    },
  });

  strapi.log.info('[seed] Writing Contact page…');
  await strapi.documents('api::contact-page.contact-page').create({
    status: 'published',
    data: {
      heroEyebrow: 'Contact',
      heroTitle: 'Get In Touch',
      heroSubtitle: 'Jersey City, New Jersey',
      heroImage: img.contactHero.id,
      infoLabel: 'The House',
      faqTitle: 'Before You Arrive',
      faq: [
        {
          question: 'What is the dress code?',
          answer: 'Smart elegant. We ask guests to honour the house. No sportswear or open footwear after 8 PM.',
        },
        {
          question: 'Is there an age restriction?',
          answer: 'Yes. The House is strictly 21 and above. Valid identification is required at entry.',
        },
        {
          question: 'What is the cancellation policy?',
          answer:
            'Reservations may be modified or cancelled up to 24 hours prior. Within 24 hours, a 50% hold applies to the booking.',
        },
        {
          question: 'Is valet available?',
          answer: 'Complimentary valet is offered for all reserved guests from 6 PM onward at the main entrance.',
        },
      ],
      formTitle: 'Reservation Request',
    },
  });

  strapi.log.info('[seed] Writing bottles…');
  const bottles = [
    { name: 'Amrut Fusion', year: '2009', cask: 'Ex-Bourbon + Peated', category: "Distiller's Reserve", profile: { sweetness: 70, smoke: 55, spice: 60, fruit: 65, oak: 75 } },
    { name: 'Greedy Angels 8yo', year: '2014', cask: 'Ex-Bourbon', category: 'Limited Edition', profile: { sweetness: 80, smoke: 20, spice: 50, fruit: 85, oak: 70 } },
    { name: 'Single Cask #1127', year: '2012', cask: 'Oloroso Sherry', category: 'Single Cask', profile: { sweetness: 60, smoke: 30, spice: 75, fruit: 80, oak: 90 } },
    { name: 'Amrut Portonova', year: '2010', cask: 'Ex-Port Pipe', category: "Distiller's Reserve", profile: { sweetness: 85, smoke: 15, spice: 55, fruit: 90, oak: 65 } },
    { name: 'Madeira Cask', year: '2013', cask: 'Ex-Madeira', category: 'Limited Edition', profile: { sweetness: 75, smoke: 25, spice: 60, fruit: 88, oak: 72 } },
    { name: 'Amrut 100 Proof', year: '2011', cask: 'Ex-Bourbon', category: 'Discontinued', profile: { sweetness: 65, smoke: 45, spice: 80, fruit: 55, oak: 78 } },
    { name: 'Cask #2204', year: '2015', cask: 'Ex-Sherry Butt', category: 'Single Cask', profile: { sweetness: 55, smoke: 40, spice: 70, fruit: 78, oak: 92 } },
    { name: 'Founders Reserve', year: '2008', cask: 'Ex-Bourbon', category: "Distiller's Reserve", profile: { sweetness: 72, smoke: 50, spice: 58, fruit: 68, oak: 80 } },
  ];
  for (const b of bottles) {
    await strapi.documents('api::bottle.bottle').create({
      status: 'published',
      data: { ...b, image: img.bottlePlinth.id },
    });
  }

  strapi.log.info('[seed] Writing journeys…');
  const journeys = [
    { name: 'The Innovators', description: 'Exploring pioneering wood finishes: ex-bourbon, ex-sherry, and the experimental casks that rewrote what Indian malt could be.', duration: '60 min', pours: '4 × 15ml', price: '₹4,500 / person', order: 1, iconFile: 'innovators.svg' },
    { name: "The Angel's Share", description: 'A focus on rapid tropical maturation, and how heat, humidity and time compress decades of flavour into a few intense years.', duration: '60 min', pours: '4 × 15ml', price: '₹5,200 / person', order: 2, iconFile: 'angels-share.svg' },
    { name: 'Land & Time', description: 'A terroir-focused flight tracing Indian barley origins, from the northern plains to the southern coast, in four glasses.', duration: '60 min', pours: '4 × 15ml', price: '₹4,800 / person', order: 3, iconFile: 'land-time.svg' },
    { name: 'The Rare & Exceptional', description: 'Poured from cask-strength and limited allocations: bottles that exist in handfuls, opened only for those who journey here.', duration: '75 min', pours: '4 × 15ml', price: '₹7,500 / person', order: 4, iconFile: 'rare-exceptional.svg' },
  ];
  for (const j of journeys) {
    const { iconFile, ...data } = j;
    const icon = await uploadAsset(strapi, ICONS_DIR, iconFile);
    await strapi.documents('api::journey.journey').create({
      status: 'published',
      data: { ...data, icon: icon.id },
    });
  }

  strapi.log.info('[seed] Writing tasting room menu…');
  const MENU = {
    'Signature Cocktails': [
      { name: 'Amrut Old Fashioned', notes: 'Peat · Bitters · Orange Peel', abv: '32%', price: '₹1,200' },
      { name: 'The Cask & Smoke', notes: 'Smoke · Charred Oak · Honey', abv: '28%', price: '₹1,400' },
      { name: 'Velvet Saffron', notes: 'Saffron · Cardamom · Cream', abv: '24%', price: '₹1,100' },
      { name: 'Chennai Sour', notes: 'Citrus · Tamarind · Egg White', abv: '22%', price: '₹950' },
    ],
    'Pure Single Malts': [
      { name: 'Amrut Single Malt', notes: 'Honey · Vanilla · Oak', abv: '46%', price: '₹900 / dram' },
      { name: 'Amrut Cask Strength', notes: 'Spice · Dark Fruit · Leather', abv: '62.8%', price: '₹1,600 / dram' },
      { name: 'Amrut Peated', notes: 'Peat · Malt · Sea Salt', abv: '46%', price: '₹1,100 / dram' },
      { name: 'Amrut Naarangi', notes: 'Orange · Oak · Spice', abv: '40%', price: '₹1,250 / dram' },
    ],
    'Vintage Flight Collections': [
      { name: 'Founders Reserve Flight', notes: '3 × 15ml · House Lineage', abv: '', price: '₹3,800' },
      { name: 'Ex-Bourbon Cask Flight', notes: '3 × 15ml · Vanilla Forward', abv: '', price: '₹4,200' },
      { name: 'Sherry Cask Flight', notes: '3 × 15ml · Dark Fruit', abv: '', price: '₹4,800' },
      { name: 'Cask Strength Flight', notes: '3 × 15ml · Untamed', abv: '', price: '₹5,400' },
    ],
    'Small Bites': [
      { name: 'Truffle Bhelpuri', notes: 'Black Truffle · Puffed Rice', abv: '', price: '₹650' },
      { name: 'Malai Tikka Skewers', notes: 'Charcoal · Cream · Saffron', abv: '', price: '₹780' },
      { name: 'Goan Sausage Toast', notes: 'Smoked · Vinegar · Chili', abv: '', price: '₹720' },
      { name: 'Dark Chocolate & Cask', notes: '70% Cacao · Oak-aged Cream', abv: '', price: '₹590' },
    ],
  };
  let catOrder = 0;
  for (const [catName, items] of Object.entries(MENU)) {
    catOrder += 1;
    const category = await strapi.documents('api::menu-category.menu-category').create({
      status: 'published',
      data: { name: catName, order: catOrder },
    });
    let itemOrder = 0;
    for (const item of items) {
      itemOrder += 1;
      await strapi.documents('api::menu-item.menu-item').create({
        status: 'published',
        data: { ...item, order: itemOrder, category: category.documentId },
      });
    }
  }

  strapi.log.info('[seed] Done. House of Amrut content is live in Strapi.');
};
