import { PROFILE_SPOTS } from '../data/profile-spots.js';
import { PROFILE_UPCOMING_EVENTS } from '../data/profile-events.js';
import { formatEventMeta } from '../lib/format.js';
import { renderProfileEvents } from './profile-events-ui.js';

export function initProfilePreviews(modal) {
  initSpotsPreview(modal);
  initEventsPreview(modal);
}

function initSpotsPreview(modal) {
  const root = document.getElementById('profile-spots-preview');
  if (!root) {
    return;
  }

  const sorted = [...PROFILE_SPOTS].sort(
    (a, b) => Number(Boolean(b.primary)) - Number(Boolean(a.primary)),
  );
  const featured = sorted[0];
  const restCount = sorted.length - 1;

  const openAll = () => {
    modal.open('Мои площадки', buildSpotsModalContent(sorted));
  };

  const featuredBtn = root.querySelector('[data-profile-spots-open]');
  const moreBtn = root.querySelector('[data-profile-spots-all]');

  if (featured && featuredBtn instanceof HTMLButtonElement) {
    syncFeaturedSpot(featuredBtn, featured);
    featuredBtn.addEventListener('click', openAll);
  }

  if (moreBtn instanceof HTMLButtonElement) {
    if (restCount > 0) {
      moreBtn.hidden = false;
      moreBtn.textContent = `+${restCount}`;
      moreBtn.setAttribute('aria-label', `Показать все площадки, ещё ${restCount}`);
      moreBtn.addEventListener('click', openAll);
    } else {
      moreBtn.hidden = true;
    }
  }
}

function syncFeaturedSpot(button, spot) {
  const logo = button.querySelector('.profile-club__logo');
  const name = button.querySelector('.profile-club__name');
  const meta = button.querySelector('.profile-club__meta');

  if (logo instanceof HTMLImageElement) {
    logo.src = spot.logo;
  }
  if (name) {
    name.textContent = spot.name;
  }
  if (meta) {
    meta.textContent = spot.meta;
  }
  button.setAttribute('aria-label', `Подробнее: ${spot.name}`);
}

function initEventsPreview(modal) {
  const root = document.getElementById('profile-events-preview');
  if (!root) {
    return;
  }

  const sorted = [...PROFILE_UPCOMING_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  const nearest = sorted[0];
  const restCount = sorted.length - 1;

  const openAll = () => {
    modal.open('Ближайшие тренировки', buildEventsModalContent(sorted));
  };

  const featuredBtn = root.querySelector('[data-profile-events-open]');
  const moreBtn = root.querySelector('[data-profile-events-all]');

  if (nearest && featuredBtn instanceof HTMLButtonElement) {
    syncFeaturedEvent(featuredBtn, nearest);
    featuredBtn.addEventListener('click', openAll);
  }

  if (moreBtn instanceof HTMLButtonElement) {
    if (restCount > 0) {
      moreBtn.hidden = false;
      moreBtn.textContent = 'Все';
      moreBtn.setAttribute('aria-label', 'Показать все тренировки');
      moreBtn.addEventListener('click', openAll);
    } else {
      moreBtn.hidden = true;
    }
  }
}

function fillEventDateBadge(dateEl, isoDate, dateLabel) {
  const [day, ...monthParts] = dateLabel.trim().split(/\s+/);
  const month = monthParts.join(' ');

  dateEl.dateTime = isoDate;
  dateEl.replaceChildren();

  const dayEl = document.createElement('span');
  dayEl.className = 'profile-event__date-day';
  dayEl.textContent = day;

  const monthEl = document.createElement('span');
  monthEl.className = 'profile-event__date-month';
  monthEl.textContent = month;

  dateEl.append(dayEl, monthEl);
}

function syncFeaturedEvent(button, event) {
  const date = button.querySelector('.profile-event__date');
  const title = button.querySelector('.profile-event__title');
  const meta = button.querySelector('.profile-event__meta');
  const tag = button.querySelector('.profile-event__tag');

  if (date instanceof HTMLTimeElement) {
    fillEventDateBadge(date, event.date, event.dateLabel);
  }
  if (title) {
    title.textContent = event.title;
  }
  if (meta) {
    meta.textContent = formatEventMeta(event);
  }
  if (tag instanceof HTMLElement) {
    tag.className = `tag tag--${event.tag.slug} profile-event__tag`;
    tag.textContent = event.tag.label;
  }
  button.setAttribute('aria-label', `Подробнее: ${event.title}`);
}

function buildSpotsModalContent(spots) {
  const list = document.createElement('ul');
  list.className = 'profile-clubs profile-modal__list';

  for (const spot of spots) {
    const item = document.createElement('li');
    item.className = 'profile-club';

    const logo = document.createElement('img');
    logo.className = 'profile-club__logo';
    logo.src = spot.logo;
    logo.width = 44;
    logo.height = 44;
    logo.alt = '';

    const body = document.createElement('div');
    body.className = 'profile-club__body';

    const name = document.createElement('p');
    name.className = 'profile-club__name';
    name.textContent = spot.name;

    const meta = document.createElement('p');
    meta.className = 'profile-club__meta';
    meta.textContent = spot.meta;

    body.append(name, meta);
    item.append(logo, body);
    list.append(item);
  }

  return list;
}

function buildEventsModalContent(events) {
  const list = document.createElement('ul');
  list.className = 'profile-events profile-modal__list';
  renderProfileEvents(list, events);
  return list;
}
