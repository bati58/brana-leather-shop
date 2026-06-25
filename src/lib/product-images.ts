import type { Subcategory } from '@/types';

/** Verified Unsplash photo IDs (leather goods, footwear, workshop) */
const P = {
  oxfordShoes: 'photo-1549298916-b41d501d3772',
  dressShoes: 'photo-1594223274512-ad4803739b7c',
  shoesLayout: 'photo-1637868796504-32f45a96d5a0',
  bootsFlatlay: 'photo-1479064555552-3ef4979f8908',
  chelseaBoots: 'photo-1608256246200-53e635b5b65f',
  loafers: 'photo-1556906781-9a412961c28c',
  sandals: 'photo-1551107696-a4b0c5a0d9a2',
  sneakers: 'photo-1595950653106-6c9ebd614d3a',
  runningShoes: 'photo-1542291026-7eec264c27ff',
  womensFashion: 'photo-1515886657613-9f3515b0c78f',
  apparel: 'photo-1560343090-f0409e92791a',
  leatherBag: 'photo-1553062407-98eeb64c6a62',
  handbag: 'photo-1491637639811-60e2756cc1c7',
  backpack: 'photo-1548036328-c9fa89d128fa',
  travelBag: 'photo-1602810318383-e386cc2a3ccf',
  belt: 'photo-1585487000160-6ebcfceb0d03',
  leatherSwatches: 'photo-1573227896778-8f378c4029d4',
  stripedApparel: 'photo-1573227895591-e76f6d38ebcf',
  bifoldWallet: 'photo-1627123424574-724758594e93',
  cardWallet: 'photo-1606761568499-6d2451b23c66',
  zipWallet: 'photo-1590874103328-eac38a683ce7',
  walletCraft: 'photo-1628483211662-9bcc692c46dc',
  leatherTexture: 'photo-1571829604981-ea159f94e5ad',
  leatherCloseup: 'photo-1716295177956-420a647c83ac',
  jacketBrown: 'photo-1551028719-00167b16eac5',
  jacketBlack: 'photo-1591047139829-d91aecb6caea',
  denimFashion: 'photo-1542272604-787c3835535d',
  sunglasses: 'photo-1539185441755-769473a23570',
  gloves: 'photo-1571019613454-1cb2f99b2d8b',
  journal: 'photo-1528459105426-b9548367069b',
  stitching: 'photo-1496180317060-d2026272f138',
  workshop: 'photo-1565084888279-aca607ecce0c',
  workshop2: 'photo-1601925260368-ae2f83cf8b7f',
  kitchenCraft: 'photo-1556909114-f6e7ad7d3136',
  leatherChair: 'photo-1451930222827-da9911e15ab3',
  cushion: 'photo-1599933345241-2d01fe8d06ec',
  textile: 'photo-1599568723850-14196ee0f991',
  leatherStack: 'photo-1591195854242-8804547cdcab',
  blueLeather: 'photo-1541763029361-21b1788343db',
  craftHands: 'photo-1558618666-fcd25c85cd64',
} as const;

export function unsplashUrl(id: string, width = 800, height?: number): string {
  const h = height ? `&h=${height}` : '';
  return `https://images.unsplash.com/${id}?w=${width}&q=80&fit=crop${h}`;
}

/** Per-product galleries — primary image matched to product name/type */
const PRODUCT_GALLERY: Record<string, readonly string[]> = {
  // Footwear
  'heritage-oxford-shoes': [P.oxfordShoes, P.dressShoes, P.shoesLayout, P.leatherTexture],
  'derby-brogue-shoes': [P.dressShoes, P.oxfordShoes, P.shoesLayout, P.leatherCloseup],
  'monk-strap-shoes': [P.shoesLayout, P.dressShoes, P.oxfordShoes, P.bootsFlatlay],
  'womens-leather-flats': [P.womensFashion, P.apparel, P.handbag, P.leatherSwatches],
  'artisan-leather-sandals': [P.sandals, P.sneakers, P.leatherTexture, P.leatherCloseup],
  'loafers-classic': [P.loafers, P.oxfordShoes, P.shoesLayout, P.dressShoes],
  'chelsea-boots': [P.chelseaBoots, P.bootsFlatlay, P.oxfordShoes, P.leatherTexture],
  'handcrafted-moccasins': [P.loafers, P.sandals, P.leatherCloseup, P.stitching],

  // Bags
  'artisan-shoulder-bag': [P.leatherBag, P.handbag, P.leatherTexture, P.workshop],
  'classic-handbag': [P.handbag, P.leatherBag, P.womensFashion, P.leatherCloseup],
  'leather-tote-bag': [P.leatherBag, P.handbag, P.travelBag, P.leatherTexture],
  'crossbody-saddle-bag': [P.handbag, P.leatherBag, P.leatherSwatches, P.zipWallet],
  'leather-backpack': [P.backpack, P.travelBag, P.leatherBag, P.workshop],
  'messenger-bag': [P.travelBag, P.backpack, P.leatherBag, P.stitching],
  'weekender-duffle-bag': [P.travelBag, P.leatherBag, P.backpack, P.bootsFlatlay],
  'evening-clutch': [P.zipWallet, P.handbag, P.leatherCloseup, P.leatherSwatches],

  // Belts
  'handcrafted-leather-belt': [P.belt, P.shoesLayout, P.leatherTexture, P.leatherSwatches],
  'reversible-belt': [P.leatherSwatches, P.belt, P.leatherTexture, P.shoesLayout],
  'womens-slim-belt': [P.belt, P.stripedApparel, P.womensFashion, P.leatherCloseup],
  'braided-leather-belt': [P.leatherStack, P.belt, P.leatherSwatches, P.leatherTexture],

  // Small leather goods
  'artisan-bifold-wallet': [P.bifoldWallet, P.cardWallet, P.walletCraft, P.leatherTexture],
  'zip-around-wallet': [P.zipWallet, P.bifoldWallet, P.cardWallet, P.walletCraft],
  'card-holder-wallet': [P.cardWallet, P.zipWallet, P.bifoldWallet, P.leatherCloseup],
  'coin-purse-key-organizer': [P.walletCraft, P.cardWallet, P.zipWallet, P.stitching],
  'travel-passport-wallet': [P.zipWallet, P.walletCraft, P.bifoldWallet, P.travelBag],
  'leather-keychain': [P.walletCraft, P.leatherTexture, P.stitching, P.leatherCloseup],

  // Clothing & accessories
  'classic-leather-jacket': [P.jacketBrown, P.jacketBlack, P.denimFashion, P.workshop],
  'bomber-jacket': [P.jacketBlack, P.jacketBrown, P.apparel, P.denimFashion],
  'vintage-rider-jacket': [P.denimFashion, P.jacketBrown, P.jacketBlack, P.sunglasses],
  'suede-trucker-jacket': [P.stripedApparel, P.jacketBlack, P.apparel, P.denimFashion],
  'heritage-leather-vest': [P.sunglasses, P.jacketBrown, P.denimFashion, P.apparel],
  'leather-cap': [P.womensFashion, P.sunglasses, P.apparel, P.stripedApparel],
  'artisan-leather-gloves': [P.gloves, P.stitching, P.walletCraft, P.workshop],
  'handcrafted-watch-strap': [P.bootsFlatlay, P.belt, P.leatherTexture, P.leatherSwatches],

  // Home & office
  'leather-journal-cover': [P.journal, P.stitching, P.walletCraft, P.workshop],
  'desk-organizer-tray': [P.stitching, P.workshop, P.walletCraft, P.leatherTexture],
  'leather-coasters-set': [P.leatherTexture, P.leatherCloseup, P.leatherStack, P.leatherChair],
  'leather-photo-frame': [P.workshop2, P.workshop, P.craftHands, P.kitchenCraft],
  'leather-cushion-cover': [P.cushion, P.leatherChair, P.textile, P.blueLeather],

  // Gifts
  'engraved-gift-wallet': [P.bifoldWallet, P.walletCraft, P.cardWallet, P.shoesLayout],
  'executive-gift-set': [P.shoesLayout, P.bootsFlatlay, P.bifoldWallet, P.belt],
  'personalized-tote-gift': [P.handbag, P.leatherBag, P.travelBag, P.walletCraft],
};

/** Subcategory fallbacks when slug is missing from the map */
const SUBCATEGORY_FALLBACK: Record<Subcategory, readonly string[]> = {
  'mens-dress-shoes': [P.oxfordShoes, P.dressShoes, P.shoesLayout, P.leatherTexture],
  'womens-heels-flats': [P.womensFashion, P.apparel, P.handbag, P.leatherSwatches],
  sandals: [P.sandals, P.sneakers, P.leatherTexture, P.leatherCloseup],
  loafers: [P.loafers, P.oxfordShoes, P.shoesLayout, P.dressShoes],
  boots: [P.chelseaBoots, P.bootsFlatlay, P.oxfordShoes, P.leatherTexture],
  moccasins: [P.loafers, P.sandals, P.leatherCloseup, P.stitching],
  'shoulder-bags': [P.leatherBag, P.handbag, P.leatherTexture, P.workshop],
  'handbags-purses': [P.handbag, P.leatherBag, P.womensFashion, P.leatherCloseup],
  'tote-bags': [P.leatherBag, P.handbag, P.travelBag, P.leatherTexture],
  'crossbody-bags': [P.handbag, P.leatherBag, P.leatherSwatches, P.zipWallet],
  backpacks: [P.backpack, P.travelBag, P.leatherBag, P.workshop],
  'laptop-briefcases': [P.travelBag, P.backpack, P.leatherBag, P.stitching],
  'travel-duffel-bags': [P.travelBag, P.leatherBag, P.backpack, P.bootsFlatlay],
  'clutch-bags': [P.zipWallet, P.handbag, P.leatherCloseup, P.leatherSwatches],
  'mens-formal-belts': [P.belt, P.shoesLayout, P.leatherTexture, P.leatherSwatches],
  'mens-casual-belts': [P.leatherSwatches, P.belt, P.leatherTexture, P.shoesLayout],
  'womens-belts': [P.belt, P.stripedApparel, P.womensFashion, P.leatherCloseup],
  'wide-fashion-belts': [P.leatherStack, P.belt, P.leatherSwatches, P.leatherTexture],
  'bifold-trifold-wallets': [P.bifoldWallet, P.cardWallet, P.walletCraft, P.leatherTexture],
  'card-holders': [P.cardWallet, P.zipWallet, P.bifoldWallet, P.leatherCloseup],
  'coin-purses': [P.walletCraft, P.cardWallet, P.zipWallet, P.stitching],
  'passport-holders': [P.zipWallet, P.walletCraft, P.bifoldWallet, P.travelBag],
  keychains: [P.walletCraft, P.leatherTexture, P.stitching, P.leatherCloseup],
  'leather-jackets': [P.jacketBrown, P.jacketBlack, P.denimFashion, P.workshop],
  'leather-vests': [P.sunglasses, P.jacketBrown, P.denimFashion, P.apparel],
  'caps-hats': [P.womensFashion, P.sunglasses, P.apparel, P.stripedApparel],
  gloves: [P.gloves, P.stitching, P.walletCraft, P.workshop],
  'watch-straps': [P.bootsFlatlay, P.belt, P.leatherTexture, P.leatherSwatches],
  'notebook-covers': [P.journal, P.stitching, P.walletCraft, P.workshop],
  'desk-accessories': [P.stitching, P.workshop, P.walletCraft, P.leatherTexture],
  coasters: [P.leatherTexture, P.leatherCloseup, P.leatherStack, P.leatherChair],
  'photo-frames': [P.workshop2, P.workshop, P.craftHands, P.kitchenCraft],
  'cushion-covers': [P.cushion, P.leatherChair, P.textile, P.blueLeather],
  'engraved-wallets': [P.bifoldWallet, P.walletCraft, P.cardWallet, P.shoesLayout],
  'gift-sets': [P.shoesLayout, P.bootsFlatlay, P.bifoldWallet, P.belt],
  'personalized-bags': [P.handbag, P.leatherBag, P.travelBag, P.walletCraft],
};

const MARKETING = {
  shoes: P.oxfordShoes,
  shoe: P.dressShoes,
  bag: P.leatherBag,
  pouch: P.handbag,
  classic: P.belt,
  jacket: P.jacketBrown,
} as const;

/** Gallery images matched to product slug — each card gets a distinct, relevant photo */
export function productImagesFor(slug: string, subcategory: Subcategory): string[] {
  const ids = PRODUCT_GALLERY[slug] ?? SUBCATEGORY_FALLBACK[subcategory];
  return ids.map((id, i) => unsplashUrl(id, i === 0 ? 800 : 760, i >= 2 ? 900 : undefined));
}

/** Category / marketing hero images */
export function leatherMarketingImage(
  key: keyof typeof MARKETING,
  width = 900
): string {
  return unsplashUrl(MARKETING[key], width);
}

export { P as UNSPLASH_PHOTOS };
