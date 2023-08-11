export interface VariantAxis {
  type: 'edition' | 'platform' | 'one';
  values: string[];
}

export interface ProductSeed {
  name: string;
  brand: string;
  description: string;
  attributes: Record<string, unknown>;
  basePrice: number;
  compareAtPrice?: number;
  imageUrls: string[];
  axis: VariantAxis;
}

export interface SubcategorySeed {
  name: string;
  products: ProductSeed[];
}

export interface CategorySeed {
  name: string;
  description: string;
  children: SubcategorySeed[];
}

const editions = (...values: string[]): VariantAxis => ({ type: 'edition', values });
const platforms = (...values: string[]): VariantAxis => ({ type: 'platform', values });
const oneSize: VariantAxis = { type: 'one', values: ['Standard'] };

/** Curated Unsplash gaming stills — controllers, consoles, and play sessions. */
const img = {
  neonCity: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&h=1200&q=80',
  arena: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&h=1200&q=80',
  dualsense: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&h=1200&q=80',
  cockpit: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&h=1200&q=80',
  nightRaid: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=900&h=1200&q=80',
  openWorld: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&h=1200&q=80',
  headset: 'https://images.unsplash.com/photo-1599669558054-5ea404f8b4f1?auto=format&fit=crop&w=900&h=1200&q=80',
  setup: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=900&h=1200&q=80',
  racing: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=900&h=1200&q=80',
  rpg: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&h=1200&q=80',
  horror: 'https://images.unsplash.com/photo-1579373903781-fd5c0d4b5f22?auto=format&fit=crop&w=900&h=1200&q=80',
  sports: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&h=1200&q=80',
  indie: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=900&h=1200&q=80',
  retro: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&h=1200&q=80',
  controllerClose: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&h=1200&q=80',
  livingRoom: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=900&h=1200&q=80',
  keyboard: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=900&h=1200&q=80',
  vr: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=900&h=1200&q=80',
  desk: 'https://images.unsplash.com/photo-1616587894289-86480e533129?auto=format&fit=crop&w=900&h=1200&q=80',
  friends: 'https://images.unsplash.com/photo-1605901309584-818e259334b4?auto=format&fit=crop&w=900&h=1200&q=80',
  hero: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1600&h=900&q=80',
};

export const HERO_IMAGE = img.hero;

export const CATALOG: CategorySeed[] = [
  {
    name: 'PS5 Games',
    description: 'Current-gen titles built for DualSense and 4K play.',
    children: [
      {
        name: 'New Releases',
        products: [
          {
            name: 'Neon Drift: Apex Circuit',
            brand: 'Blue Orbit',
            description:
              'High-speed anti-grav racing across neon megacities. Adaptive triggers bite into every drift; haptic lanes rumble under your tires.',
            attributes: {
              platform: 'PS5',
              genre: 'Racing',
              players: '1-8',
              rating: 'E10+',
            },
            basePrice: 6999,
            compareAtPrice: 7999,
            imageUrls: [img.racing, img.neonCity, img.dualsense],
            axis: editions('Standard', 'Deluxe', "Collector's"),
          },
          {
            name: 'Shadow Protocol',
            brand: 'Nightshift Studio',
            description:
              'Stealth ops across a rain-soaked skyline. Mark targets, hack networks, and vanish before the alarms catch up.',
            attributes: {
              platform: 'PS5',
              genre: 'Stealth / Action',
              players: '1',
              rating: 'M',
            },
            basePrice: 6999,
            imageUrls: [img.nightRaid, img.arena],
            axis: editions('Standard', 'Deluxe'),
          },
          {
            name: 'Iron Haven',
            brand: 'Forgeworks',
            description:
              'Build a last-city fortress while mechs hammer the walls. Co-op base defense with deep loadout crafting.',
            attributes: {
              platform: 'PS5',
              genre: 'Strategy / Co-op',
              players: '1-4',
              rating: 'T',
            },
            basePrice: 5999,
            imageUrls: [img.cockpit, img.setup],
            axis: editions('Standard', 'Deluxe'),
          },
        ],
      },
      {
        name: 'Action & Adventure',
        products: [
          {
            name: 'Astral Tides',
            brand: 'Lumen Quill',
            description:
              'Sail a shattered constellation on a living ship. Explore ruins, recruit a crew, and chart a path home through the void.',
            attributes: {
              platform: 'PS5',
              genre: 'Adventure / RPG',
              players: '1',
              rating: 'T',
            },
            basePrice: 6499,
            imageUrls: [img.openWorld, img.rpg],
            axis: editions('Standard', 'Deluxe'),
          },
          {
            name: 'Blackout District',
            brand: 'Nightshift Studio',
            description:
              'Survival horror in a city that forgets you every dawn. Manage light, memory, and whatever is hunting in the dark.',
            attributes: {
              platform: 'PS5',
              genre: 'Horror',
              players: '1',
              rating: 'M',
            },
            basePrice: 5999,
            compareAtPrice: 6999,
            imageUrls: [img.horror, img.livingRoom],
            axis: editions('Standard', 'Deluxe'),
          },
        ],
      },
    ],
  },
  {
    name: 'PS4 Games',
    description: 'Back-catalog hits still worth a slot on the shelf.',
    children: [
      {
        name: 'Classics',
        products: [
          {
            name: 'Echoes of Valen',
            brand: 'Lumen Quill',
            description:
              'A story-driven RPG about a fallen kingdom and the songs that keep it alive. Fully playable on PS4 and PS5.',
            attributes: {
              platform: 'PS4',
              genre: 'RPG',
              players: '1',
              rating: 'T',
              ps5Compatible: true,
            },
            basePrice: 2999,
            compareAtPrice: 3999,
            imageUrls: [img.rpg, img.indie],
            axis: platforms('PS4 Disc', 'PS4 Digital Code'),
          },
          {
            name: 'Gridlock United',
            brand: 'Pitchline',
            description:
              'Arcade football with wild weather and local rivalry modes. Perfect for couch seasons that never end.',
            attributes: {
              platform: 'PS4',
              genre: 'Sports',
              players: '1-4',
              rating: 'E',
            },
            basePrice: 2499,
            imageUrls: [img.sports, img.friends],
            axis: platforms('PS4 Disc', 'PS4 Digital Code'),
          },
        ],
      },
      {
        name: 'Multiplayer',
        products: [
          {
            name: 'Raidline: Zero Hour',
            brand: 'Forgeworks',
            description:
              'Squad-based PvE raids with weekly modifiers. Drop in with friends and chase the leaderboard reset.',
            attributes: {
              platform: 'PS4',
              genre: 'Shooter / Co-op',
              players: '1-4',
              rating: 'T',
            },
            basePrice: 1999,
            imageUrls: [img.arena, img.keyboard],
            axis: platforms('PS4 Disc', 'PS4 Digital Code'),
          },
        ],
      },
    ],
  },
  {
    name: 'Gear',
    description: 'Controllers, headsets, and kit that belong next to the console.',
    children: [
      {
        name: 'Controllers',
        products: [
          {
            name: 'PulseGrip Wireless Controller',
            brand: 'RiftDrop',
            description:
              'Wireless pad tuned for long sessions — textured grips, programmable paddles, and a quick-charge dock included.',
            attributes: {
              compatibility: 'PS5 / PS4',
              connectivity: 'Bluetooth + USB-C',
              battery: '14 hours',
            },
            basePrice: 7499,
            imageUrls: [img.controllerClose, img.dualsense, img.desk],
            axis: editions('Midnight', 'Arctic', 'Signal Lime'),
          },
          {
            name: 'Arena Pro Fight Pad',
            brand: 'RiftDrop',
            description:
              'Fight-stick layout for competitive play. Quiet switches, removable art plate, and tournament-legal cable.',
            attributes: {
              compatibility: 'PS5 / PS4 / PC',
              layout: 'Fight pad',
            },
            basePrice: 8999,
            imageUrls: [img.setup, img.neonCity],
            axis: oneSize,
          },
        ],
      },
      {
        name: 'Audio',
        products: [
          {
            name: 'Sideline Wireless Headset',
            brand: 'RiftDrop',
            description:
              'Closed-back wireless headset with a detachable boom mic and spatial audio profiles for shooters and racing.',
            attributes: {
              connectivity: '2.4 GHz + Bluetooth',
              battery: '30 hours',
            },
            basePrice: 12999,
            compareAtPrice: 14999,
            imageUrls: [img.headset, img.vr],
            axis: editions('Black', 'White'),
          },
          {
            name: 'Channel Clear Mic Boom',
            brand: 'RiftDrop',
            description:
              'Clip-on condenser boom for clear party chat. Noise gate built in; mounts to most third-party headsets.',
            attributes: {
              connector: '3.5mm',
              pattern: 'Cardioid',
            },
            basePrice: 3499,
            imageUrls: [img.desk, img.retro],
            axis: oneSize,
          },
        ],
      },
    ],
  },
];

export type CustomerKind = 'credential' | 'google' | 'invited';

export interface CustomerSeed {
  firstName: string;
  lastName: string;
  kind: CustomerKind;
  city: string;
  region: string;
  country: string;
}

export const CUSTOMERS: CustomerSeed[] = [
  { firstName: 'Olivia', lastName: 'Bennett', kind: 'credential', city: 'Brooklyn', region: 'NY', country: 'US' },
  { firstName: 'Liam', lastName: 'Carter', kind: 'credential', city: 'Austin', region: 'TX', country: 'US' },
  { firstName: 'Sophia', lastName: 'Nguyen', kind: 'google', city: 'San Jose', region: 'CA', country: 'US' },
  { firstName: 'Noah', lastName: 'Patel', kind: 'credential', city: 'Chicago', region: 'IL', country: 'US' },
  { firstName: 'Emma', lastName: 'Rodriguez', kind: 'credential', city: 'Denver', region: 'CO', country: 'US' },
  { firstName: 'James', lastName: 'O’Connor', kind: 'google', city: 'Boston', region: 'MA', country: 'US' },
  { firstName: 'Ava', lastName: 'Thompson', kind: 'credential', city: 'Seattle', region: 'WA', country: 'US' },
  { firstName: 'William', lastName: 'Hughes', kind: 'credential', city: 'Portland', region: 'OR', country: 'US' },
  { firstName: 'Isabella', lastName: 'Rossi', kind: 'invited', city: 'Miami', region: 'FL', country: 'US' },
  { firstName: 'Ethan', lastName: 'Walsh', kind: 'invited', city: 'Nashville', region: 'TN', country: 'US' },
];

export const STREETS = [
  '120 Greenpoint Ave',
  '48 Larkspur Lane',
  '900 Cedar Street',
  '17 Marlow Court',
  '231 Harbor View',
  '64 Sutton Place',
  '512 Birchwood Rd',
  '8 Kingfisher Way',
];

export const REVIEW_TITLES = [
  'Installed and hooked',
  'Solid drop',
  'Worth the preorder',
  'My new main game',
  'Great for couch co-op',
  'Looks sharp in 4K',
];

export const REVIEW_BODIES = [
  'Arrived sealed and booted clean on PS5. Load times are snappy and the DualSense feedback is excellent.',
  'Shipping was fast and the disc was mint. Already deep into the campaign.',
  'Better than the trailer — combat feels weighty and the soundtrack slaps.',
  'Played a full weekend with friends. No issues with online matchmaking so far.',
  'Packaging was solid and the collector extras were actually worth it.',
];
