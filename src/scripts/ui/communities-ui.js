import { formatCommunitySubtitle } from '../lib/format.js';

const chevronIcon = new URL('../../assets/icons/chevron.svg', import.meta.url).href;

function createTag(tag) {
  const span = document.createElement('span');
  span.className = `tag tag--${tag.slug}`;
  span.textContent = tag.label;
  return span;
}

function createCommunityCard(community) {
  const article = document.createElement('article');
  article.className = 'community-card';

  const logo = document.createElement('img');
  logo.className = 'community-card__logo';
  logo.src = community.logo;
  logo.width = 44;
  logo.height = 44;
  logo.alt = '';

  const body = document.createElement('div');
  body.className = 'community-card__body';

  const name = document.createElement('h3');
  name.className = 'community-card__name';
  name.textContent = community.name;

  const subtitle = document.createElement('p');
  subtitle.className = 'community-card__subtitle';
  subtitle.textContent = formatCommunitySubtitle(community);

  const tags = document.createElement('div');
  tags.className = 'community-card__tags';
  for (const tag of community.tags) {
    tags.append(createTag(tag));
  }

  body.append(name, subtitle, tags);

  const chevron = document.createElement('img');
  chevron.className = 'community-card__chevron';
  chevron.src = chevronIcon;
  chevron.width = 20;
  chevron.height = 20;
  chevron.alt = '';

  article.append(logo, body, chevron);
  return article;
}

export function renderCommunities(root, store) {
  root.replaceChildren();

  const sections = store.getVisibleSections();

  if (!store.hasVisibleCommunities()) {
    const empty = document.createElement('p');
    empty.className = 'communities-page__empty';
    empty.textContent = 'По вашему запросу ничего не найдено';
    root.append(empty);
    return;
  }

  for (const section of sections) {
    const sectionEl = document.createElement('section');
    sectionEl.className = 'community-list';

    const title = document.createElement('h2');
    title.className = 'community-list__section-title';
    title.id = `${section.id}-title`;
    title.textContent = section.title;

    sectionEl.append(title);
    for (const community of section.communities) {
      sectionEl.append(createCommunityCard(community));
    }
    root.append(sectionEl);
  }
}
