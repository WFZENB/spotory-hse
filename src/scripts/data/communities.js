const logoSevernaya = new URL(
  '../../assets/images/severnaya-stena-logo.webp',
  import.meta.url,
).href;
const logoElCapitan = new URL('../../assets/images/el-capitan.webp', import.meta.url).href;
const logoIgels = new URL('../../assets/images/igels.webp', import.meta.url).href;
const logoEnergiya = new URL('../../assets/images/energiya-vysoty.webp', import.meta.url).href;
const logoDirt = new URL('../../assets/images/dirt-spb.webp', import.meta.url).href;
const logoFreak = new URL('../../assets/images/freak-spot.webp', import.meta.url).href;
const logoPark300 = new URL('../../assets/images/park-300-logo.webp', import.meta.url).href;
const logoStart = new URL('../../assets/images/start.webp', import.meta.url).href;

export const COMMUNITY_SECTIONS = [
  {
    id: 'climbing',
    title: 'Скалодромы',
    communities: [
      {
        id: 'severnaya-stena',
        name: 'Северная стена',
        kind: 'Скалодром',
        detail: 'Санкт-Петербург',
        logo: logoSevernaya,
        tags: [
          { slug: 'climbing', label: 'Скалолазание' },
          { slug: 'gym', label: 'Боулдеринг' },
        ],
      },
      {
        id: 'el-capitan',
        name: 'El Capitan',
        kind: 'Скалодром',
        detail: 'центр',
        logo: logoElCapitan,
        tags: [{ slug: 'climbing', label: 'Скалолазание' }],
      },
      {
        id: 'igels',
        name: 'Игелс',
        kind: 'Скалодром',
        detail: 'парковая зона',
        logo: logoIgels,
        tags: [
          { slug: 'climbing', label: 'Скалолазание' },
          { slug: 'gym', label: 'Боулдеринг' },
          { slug: 'parkour', label: 'Паркур' },
        ],
      },
      {
        id: 'energiya-vysoty',
        name: 'Энергия Высоты',
        kind: 'Скалодром',
        detail: 'Василеостровский',
        logo: logoEnergiya,
        tags: [
          { slug: 'climbing', label: 'Скалолазание' },
          { slug: 'gym', label: 'Боулдеринг' },
          { slug: 'ropes', label: 'Веревочный парк' },
        ],
      },
    ],
  },
  {
    id: 'bike-dirt',
    title: 'Bike & dirt',
    communities: [
      {
        id: 'dirt-spb',
        name: 'Bike & dirt SPB',
        kind: 'Велоклуб',
        detail: 'город и трассы',
        logo: logoDirt,
        tags: [{ slug: 'cycling', label: 'Велосипед' }],
      },
      {
        id: 'freak-spot',
        name: 'FREAK Spot',
        kind: 'Dirt',
        detail: 'pump-track',
        logo: logoFreak,
        tags: [{ slug: 'cycling', label: 'Велосипед' }],
      },
    ],
  },
  {
    id: 'outdoor',
    title: 'Outdoor и парки',
    communities: [
      {
        id: 'park-300',
        name: 'Парк 300-летия',
        kind: 'Парк',
        detail: 'пробежки и встречи',
        logo: logoPark300,
        tags: [
          { slug: 'run', label: 'Бег' },
          { slug: 'tourism', label: 'Туризм' },
        ],
      },
      {
        id: 'start',
        name: 'Старт',
        kind: 'Беговой клуб',
        detail: 'набережные',
        logo: logoStart,
        tags: [{ slug: 'run', label: 'Бег' }],
      },
    ],
  },
];
