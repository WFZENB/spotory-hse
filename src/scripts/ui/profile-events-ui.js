import { formatEventMeta } from '../lib/format.js';

export function renderProfileEvents(root, events) {
  root.replaceChildren();

  for (const event of events) {
    const item = document.createElement('li');
    item.className = 'profile-event';

    const date = document.createElement('time');
    date.className = 'profile-event__date';
    date.dateTime = event.date;
    date.textContent = event.dateLabel;

    const body = document.createElement('div');
    body.className = 'profile-event__body';

    const title = document.createElement('p');
    title.className = 'profile-event__title';
    title.textContent = event.title;

    const meta = document.createElement('p');
    meta.className = 'profile-event__meta';
    meta.textContent = formatEventMeta(event);

    const tag = document.createElement('span');
    tag.className = `tag tag--${event.tag.slug} profile-event__tag`;
    tag.textContent = event.tag.label;

    body.append(title, meta, tag);
    item.append(date, body);
    root.append(item);
  }
}
