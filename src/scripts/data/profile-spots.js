const logoSevernaya = new URL(
  '../../assets/images/severnaya-stena-logo.webp',
  import.meta.url,
).href;
const logoDirt = new URL('../../assets/images/dirt-spb.webp', import.meta.url).href;
const logoPark300 = new URL('../../assets/images/park-300-logo.webp', import.meta.url).href;

export const PROFILE_SPOTS = [
  {
    id: 'severnaya',
    name: 'Северная стена',
    meta: 'Скалодром · тренер',
    logo: logoSevernaya,
    primary: true,
  },
  {
    id: 'dirt-spb',
    name: 'Bike & dirt SPB',
    meta: 'Велоклуб · участник',
    logo: logoDirt,
  },
  {
    id: 'park-300',
    name: 'Парк 300-летия',
    meta: 'Outdoor · организатор',
    logo: logoPark300,
  },
];
