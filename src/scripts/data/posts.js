const avatarSevernaya = new URL(
  '../../assets/images/severnaya-stena-logo.webp',
  import.meta.url,
).href;
const mediaSevernaya = new URL(
  '../../assets/images/post-severnaya-stena.webp',
  import.meta.url,
).href;
const avatarFominikh = new URL(
  '../../assets/images/fominikh-photo.webp',
  import.meta.url,
).href;
const mediaRun = new URL(
  '../../assets/images/post-run-embankment.webp',
  import.meta.url,
).href;
const avatarDirt = new URL('../../assets/images/dirt-spb.webp', import.meta.url).href;
const mediaDirt = new URL('../../assets/images/post-dirt.webp', import.meta.url).href;

export const INITIAL_POSTS = [
  {
    id: 'post-severnaya',
    authorId: 'severnaya-stena',
    author: 'Северная стена',
    avatar: avatarSevernaya,
    datetime: '2026-10-02T18:40:00',
    tags: [
      { slug: 'climbing', label: 'Скалолазание' },
      { slug: 'gym', label: 'Боулдеринг' },
    ],
    text:
      'Открытая тренировка для новичков в субботу. Приходите в 11:00 — разминка, техника и свободное лазание.',
    media: mediaSevernaya,
    likes: 124,
    liked: false,
    comments: 18,
  },
  {
    id: 'post-pavel-run',
    authorId: 'pavel',
    author: 'Павел Фоминых',
    avatar: avatarFominikh,
    datetime: '2026-10-01T07:15:00',
    tags: [{ slug: 'run', label: 'Бег' }],
    text: 'Утренний круг по набережной — 5 км, лёгкий темп. Кто со мной в четверг?',
    media: mediaRun,
    likes: 42,
    liked: false,
    comments: 6,
  },
  {
    id: 'post-dirt',
    authorId: 'dirt-spb',
    author: 'Bike & dirt SPB',
    avatar: avatarDirt,
    datetime: '2026-09-30T20:10:00',
    tags: [{ slug: 'cycling', label: 'Велосипед' }],
    text:
      'Субботний выезд на FREAK Spot: разминка, несколько заездов по pump-track и чай после. Берите шлем и перчатки.',
    media: mediaDirt,
    likes: 89,
    liked: false,
    comments: 11,
  },
];
