import { CALENDAR_MONTH } from '../data/events.js';
import {
  formatDayTitle,
  formatEventMeta,
  formatEventsHeading,
  toIsoDate,
} from '../lib/format.js';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function buildMonthGrid(year, month) {
  const first = new Date(year, month - 1, 1);
  const last = new Date(year, month, 0);
  const daysInMonth = last.getDate();
  const startOffset = (first.getDay() + 6) % 7;

  const cells = [];

  const prevMonthLast = new Date(year, month - 1, 0).getDate();
  for (let i = startOffset - 1; i >= 0; i -= 1) {
    const day = prevMonthLast - i;
    const m = month === 1 ? 12 : month - 1;
    const y = month === 1 ? year - 1 : year;
    cells.push({ day, iso: toIsoDate(y, m, day), muted: true });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, iso: toIsoDate(year, month, day), muted: false });
  }

  let tailDay = 0;
  while (cells.length % 7 !== 0) {
    tailDay += 1;
    const m = month === 12 ? 1 : month + 1;
    const y = month === 12 ? year + 1 : year;
    cells.push({ day: tailDay, iso: toIsoDate(y, m, tailDay), muted: true });
  }

  return cells;
}

export function renderCalendar(gridRoot, listRoot, titleEl, store) {
  const { year, month, label } = CALENDAR_MONTH;
  const monthLabel = gridRoot.closest('.calendar-widget')?.querySelector('.calendar-widget__month span');
  if (monthLabel) {
    monthLabel.textContent = label;
  }

  const selected = store.getSelectedDate();
  const cells = buildMonthGrid(year, month);

  gridRoot.replaceChildren();

  for (const weekday of WEEKDAYS) {
    const labelEl = document.createElement('span');
    labelEl.className = 'calendar-widget__weekday';
    labelEl.textContent = weekday;
    gridRoot.append(labelEl);
  }

  for (const cell of cells) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'calendar-widget__day';
    button.textContent = String(cell.day);
    button.dataset.date = cell.iso;

    if (cell.muted) {
      button.classList.add('calendar-widget__day--muted');
    }
    const eventCount = store.getEventCountForDate(cell.iso);
    if (eventCount > 0) {
      const markers = document.createElement('span');
      markers.className = 'calendar-widget__markers';
      markers.setAttribute('aria-hidden', 'true');
      const dot = document.createElement('span');
      dot.className = 'calendar-widget__marker';
      markers.append(dot);
      button.append(markers);
    }
    if (cell.iso === selected) {
      button.classList.add('calendar-widget__day--selected');
      button.setAttribute('aria-current', 'date');
    }

    button.addEventListener('click', () => store.selectDate(cell.iso));
    gridRoot.append(button);
  }

  const events = store.getEventsForSelectedDay();
  const dayTitle = formatDayTitle(selected);
  titleEl.textContent = formatEventsHeading(events.length, dayTitle);
  listRoot.replaceChildren();

  if (events.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'event-list__empty';
    empty.textContent = 'На этот день событий нет';
    listRoot.append(empty);
    return;
  }

  if (events.length === 1) {
    listRoot.append(createEventCard(events[0]));
    return;
  }

  const stack = document.createElement('div');
  stack.className = 'event-stack';
  for (const event of events) {
    stack.append(createEventCard(event));
  }
  listRoot.append(stack);
}

function createEventCard(event) {
  const article = document.createElement('article');
  article.className = 'event-card';

  const name = document.createElement('h4');
  name.className = 'event-card__name';
  name.textContent = event.title;

  const venue = document.createElement('p');
  venue.className = 'event-card__venue';
  venue.textContent = formatEventMeta(event);

  article.append(name, venue);
  return article;
}
