'use strict';

// Replaces the placeholder tasting-room menu with the House of Amrut's real
// printed menu (Amrut Archive, Amrut Bar, Wine, Beer, Non-Alcoholic
// Cocktails, On The House Nibbles). Lives entirely on tasting-room-page.menu
// now — no more separate Menu Category / Menu Item content types to juggle.
// Guarded by a marker category name so this only ever runs once; after that,
// the owner's own edits in Strapi are the source of truth.

const MARKER_CATEGORY = "Greedy Angels & Rare Aged";

const MENU = [
  {
    name: "Greedy Angels & Rare Aged",
    sectionGroup: "Amrut Archive",
    priceColumns: "0.5 oz, 1 oz, 2 oz",
    order: 1,
    items: [
      { name: "Amrut Greedy Angels, 10 Years Old, 46%", notes: "Tropical fruit | honey | toasted oak", abv: "46% ABV", price1: "65", price2: "125", price3: "250", order: 1 },
      { name: "Amrut Greedy Angels, 10 Years Old, 55%", notes: "Coconut | vanilla | tropical fruit", abv: "55% ABV", price1: "80", price2: "155", price3: "315", order: 2 },
      { name: "Amrut Greedy Angels Chairman's Reserve, 12 Years Old", notes: "Candied orange | almond | caramel", abv: "60% ABV", price1: "160", price2: "315", price3: "625", order: 3 },
      { name: "Amrut Greedy Angels Ex-Bourbon Finish Chairman's Reserve, 12 Years Old", notes: "Vanilla | oak | honey | dried fruit", abv: "60% ABV", price1: "185", price2: "365", price3: "730", order: 4 },
    ],
  },
  {
    name: "Cask-Finished & Sherry",
    sectionGroup: "Amrut Archive",
    priceColumns: "0.5 oz, 1 oz, 2 oz",
    description: "Discover the rarest expressions in our collection with a 0.5 oz discovery pour.",
    order: 2,
    items: [
      { name: "Amrut Intermediate Sherry", notes: "Port | candied cherry | spice | oak", abv: "57.1% ABV", price1: "10", price2: "15", price3: "30", order: 1 },
      { name: "Amrut Naarangi", notes: "Orange peel | chocolate | cinnamon | oak", abv: "50% ABV", price1: "10", price2: "15", price3: "30", order: 2 },
      { name: "Amrut Portonova, 48%", notes: "Raisin | vanilla | cherry | spice", abv: "48% ABV", price1: "10", price2: "15", price3: "25", order: 3 },
      { name: "Amrut Portonova, 62.1%", notes: "Raisin | vanilla | cherry | spice", abv: "62.1% ABV", price1: "10", price2: "20", price3: "35", order: 4 },
      { name: "Amrut Double Cask", notes: "Honey | vanilla | tropical fruit | light smoke", abv: "46% ABV", price1: "10", price2: "20", price3: "40", order: 5 },
    ],
  },
  {
    name: "Peat & Smoke",
    sectionGroup: "Amrut Archive",
    priceColumns: "0.5 oz, 1 oz, 2 oz",
    order: 3,
    items: [
      { name: "Amrut Peated", notes: "Dry peat | molasses | citrus | vanilla", abv: "46% ABV", price2: "10", price3: "15", order: 1 },
      { name: "Amrut Peated Cask Strength", notes: "Smoke | salted malt | pepper | oak", abv: "62.8% ABV", price2: "15", price3: "25", order: 2 },
    ],
  },
  {
    name: "Single Malt Whiskies",
    sectionGroup: "Amrut Archive",
    priceColumns: "0.5 oz, 1 oz, 2 oz",
    order: 4,
    items: [
      { name: "Amrut Kranthi", notes: "Tropical fruit | pomelo | coconut | vanilla", abv: "40% ABV", price2: "7", price3: "14", order: 1 },
      { name: "Amrut Indian Single Malt", notes: "Spice | fruit | honey | toffee", abv: "46% ABV", price2: "7", price3: "14", order: 2 },
      { name: "Amrut Indian Single Malt 2017", notes: "Spice | fruit | honey | toffee", abv: "46% ABV", order: 3 },
      { name: "Amrut Cask Strength", notes: "Barley sugar | orange | cocoa | oak", abv: "61.8% ABV", price2: "15", price3: "20", order: 4 },
      { name: "Amrut Fusion", notes: "Smoke | vanilla | chocolate | spice", abv: "50% ABV", price2: "10", price3: "15", order: 5 },
      { name: "Amrut Fusion 2017", notes: "Smoke | vanilla | chocolate | spice", abv: "50% ABV", order: 6 },
      { name: "Amrut Triparva", notes: "Peach | melon | plantain | honey", abv: "50% ABV", price1: "15", price2: "25", price3: "40", order: 7 },
      { name: "Amrut Two Continents", notes: "Vanilla | soft fruit | spice | oak", abv: "46% ABV", price1: "10", price2: "15", price3: "35", order: 8 },
      { name: "Amrut Single Cask Single Grain", notes: "Dried fruit | vanilla | honey | oak", abv: "57.1% ABV", price1: "15", price2: "25", price3: "40", order: 9 },
      { name: "Single Malts of India Kurinji", notes: "Pear | melon | floral | vanilla", abv: "46% ABV", price1: "10", price2: "15", price3: "25", order: 10 },
      { name: "Single Malts of India Marudham", notes: "Plantain | pineapple | chocolate | vanilla", abv: "46% ABV", price1: "10", price2: "15", price3: "25", order: 11 },
    ],
  },
  {
    name: "Limited Edition & Reserve",
    sectionGroup: "Amrut Archive",
    priceColumns: "0.5 oz, 1 oz, 2 oz",
    order: 5,
    items: [
      { name: "Amrut Fusion X", notes: "Smoke | oak | chocolate | molasses", abv: "50% ABV", price1: "20", price2: "40", price3: "70", order: 1 },
      { name: "Amrut Master Distiller's Reserve", notes: "Fig | plum | toffee | soft peat", abv: "50% ABV", price1: "15", price2: "30", price3: "55", order: 2 },
    ],
  },
  {
    name: "Rum & Gin",
    sectionGroup: "Amrut Archive",
    priceColumns: "1 oz, 2 oz",
    order: 6,
    items: [
      { name: "Amrut Old Port Rum", notes: "Vanilla | pistachio | ginger | nutmeg", abv: "42.8% ABV", price1: "7", price2: "14", order: 1 },
      { name: "Amrut Two Indies Rum", notes: "Tropical fruit | clove | cinnamon | molasses", abv: "42.8% ABV", price1: "7", price2: "14", order: 2 },
      { name: "Amrut Two Indies Dark Rum", notes: "Black fruit | toffee | saffron | spice", abv: "42.8% ABV", price1: "7", price2: "14", order: 3 },
      { name: "Amrut Nilgiris Indian Dry Gin", notes: "Juniper | tea | paan | raw mango", abv: "42.8% ABV", price1: "7", price2: "14", order: 4 },
    ],
  },
  {
    name: "A Rare Expression",
    sectionGroup: "Amrut Archive",
    priceColumns: "Bottle",
    description: "Available by the bottle for gifting or private collection.",
    order: 7,
    items: [
      { name: "Amrut 1948 Expedition, 15 Years Old", notes: "Indian single malt | Sherry | dark fruit | oak | spice", abv: "62.8% ABV", price1: "15000", order: 1 },
    ],
  },
  {
    name: "The Amrut Sensory Archive",
    sectionGroup: "Amrut Archive",
    priceColumns: "Per Guest",
    description: "Whisky experienced in five senses — a guided, tableside ritual through five Amrut expressions, exploring sight, touch, aroma, taste and sound. Five 0.5 oz pours, 30–40 minutes, tableside, by reservation.",
    order: 8,
    items: [
      { name: "Kranthi · Fusion · Naarangi · Portonova 48% · Greedy Angels 10 Years Old", notes: "Sight | Touch | Aroma | Taste | Sound", price1: "90", order: 1 },
    ],
  },
  {
    name: "Compliments of the House",
    sectionGroup: "Amrut Bar",
    description: "On the house.",
    order: 9,
    items: [
      { name: "The First Exchange", notes: "Bourbon | Black Nocino | Jaggery | Orange | Candied Walnut", order: 1 },
      { name: "The Parting Light", notes: "Dark Rum | Thandai | Saffron | Pistachio | Rose", order: 2 },
    ],
  },
  {
    name: "Classic Cocktails",
    sectionGroup: "Amrut Bar",
    priceColumns: "Price",
    order: 10,
    items: [
      { name: "Old Fashion", notes: "Amrut Whiskey | Brown sugar | Aromatic bitters", price1: "17", order: 1 },
      { name: "Manhattan", notes: "Amrut Whiskey | Sweet Vermouth | Angostura Bitters", price1: "17", order: 2 },
      { name: "Whiskey Sour", notes: "Bourbon | Fresh Lemon | Simple Syrup | Egg white", price1: "17", order: 3 },
    ],
  },
  {
    name: "Signature Cocktails",
    sectionGroup: "Amrut Bar",
    priceColumns: "Price",
    order: 11,
    items: [
      { name: "Ghee Wizz", notes: "Amrut Rum | Amrut Whiskey | Ghee | Jaggery | Smoke", price1: "20", order: 1 },
      { name: "Understory", notes: "Amrut Dark Rum | Campari | Pineapple Juice | Lime Juice | Honey Syrup", price1: "20", order: 2 },
      { name: "The Spice Route", notes: "Amrut Gin | Curry Leaves | Lychee Juice | Lime Juice | Simple Syrup", price1: "17", order: 3 },
    ],
  },
  {
    name: "Contemporary Cocktails",
    sectionGroup: "Amrut Bar",
    priceColumns: "Price",
    order: 12,
    items: [
      { name: "Espresso Martini", notes: "Amrut Gin | Cream Coffee Liqueur | Espresso | Cocoa Bitters", price1: "20", order: 1 },
      { name: "Gilded Citrus", notes: "Amrut Whiskey | Grapefruit Juice | Lemon Juice | Honey Syrup | Dehydrated Grapefruit", price1: "17", order: 2 },
      { name: "The Honeyed Ember", notes: "Amrut Whiskey | Lemon Juice | Honey Syrup | Ginger Juice | Whiskey Float", price1: "20", order: 3 },
    ],
  },
  {
    name: "Non-Alcoholic Cocktails",
    priceColumns: "Price",
    order: 13,
    items: [
      { name: "Ruby Current", notes: "Pomegranate Juice | Chaat Masala | Curry Leaves | Club Soda", price1: "15", order: 1 },
      { name: "Grove Light", notes: "Mango Pulp | Mint Leaves | Simple Syrup | Lime Juice", price1: "15", order: 2 },
      { name: "Peach Reverie", notes: "Peach Syrup | Orange Juice | Ginger Ale", price1: "15", order: 3 },
    ],
  },
  {
    name: "Wine",
    priceColumns: "5 oz, 8.5 oz, Bottle",
    order: 14,
    items: [
      { name: "Les Fontanelles Pinot Noir, France 2022", notes: "Red Wine | Smooth | Black cherry | Blackberry", price1: "7", price2: "10", price3: "30", order: 1 },
      { name: "High Note Malbec, Argentina 2022", notes: "Red Wine | Blackberry | Vanilla | Tobacco | Earthy notes", price1: "7", price2: "10", price3: "30", order: 2 },
      { name: "Les Fontanelles Sauvignon Blanc, France 2022", notes: "White Wine | Crisp and dry | Peach | Pear | Delicate florals", price1: "7", price2: "10", price3: "30", order: 3 },
      { name: "Les Fontanelles Chardonnay, France 2022", notes: "White Wine | White flowers | Acacia", price1: "7", price2: "10", price3: "30", order: 4 },
    ],
  },
  {
    name: "Beer",
    priceColumns: "22 oz",
    order: 15,
    items: [
      { name: "Kingfisher", price1: "10", order: 1 },
      { name: "Rupee IPA", price1: "10", order: 2 },
      { name: "Rupee Mango", price1: "10", order: 3 },
      { name: "Old Monk", price1: "10", order: 4 },
      { name: "Taj Mahal", price1: "10", order: 5 },
    ],
  },
  {
    name: "On The House Nibbles",
    priceColumns: "Price",
    description: "Complimentary: Masala Peanuts · Roasted Makhana (Fox Nuts) · Roasted Almonds · Cashews · Walnuts",
    order: 16,
    items: [
      { name: "Three Cheese Mini Kulcha", notes: "Tandoor-baked mini kulcha, three-cheese filling, cultured butter", region: "North", price1: "10", order: 1 },
      { name: "Chilli Paneer", notes: "Crisp Paneer, peppers, scallions, Indo-Chinese chilli glaze", region: "East", price1: "10", order: 2 },
      { name: "Curry Leaf Crispy Chicken", notes: "Crisp spiced chicken, curry leaves, green chilli, lime", region: "South", price1: "15", order: 3 },
      { name: "Bombay Cutlet Pav", notes: "Spiced vegetable cutlet, soft pav, green chutney", region: "West", price1: "15", order: 4 },
    ],
  },
];

module.exports = async function patch6RealMenu(strapi) {
  const uid = 'api::tasting-room-page.tasting-room-page';
  const page = await strapi.documents(uid).findFirst({ populate: { menu: true } });
  if (!page) return;

  const already = (page.menu ?? []).some((c) => c.name === MARKER_CATEGORY);
  if (already) {
    strapi.log.info('[patch] Real menu already loaded — skipping.');
    return;
  }

  await strapi.documents(uid).update({
    documentId: page.documentId,
    status: 'published',
    data: { menu: MENU },
  });

  strapi.log.info('[patch] Real House of Amrut menu loaded onto Tasting Room page.');
};
