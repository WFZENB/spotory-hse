const MONTHS_GENITIVE = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export function formatPostDateTime(iso) {
  const date = new Date(iso);
  const day = date.getDate();
  const month = MONTHS_GENITIVE[date.getMonth()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day} ${month} · ${hours}:${minutes}`;
}

export function formatDayTitle(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  const monthName = MONTHS_GENITIVE[month - 1];
  return `${day} ${monthName}`;
}

function capitalizeFirst(text) {
  if (!text) {
    return text;
  }
  return text.charAt(0).toLocaleUpperCase('ru-RU') + text.slice(1);
}

export function formatEventMeta({ time, place, detail }) {
  const parts = [time, place];
  if (detail) {
    parts.push(capitalizeFirst(detail));
  }
  return parts.join(' · ');
}

export function formatCommunitySubtitle({ kind, detail }) {
  return `${kind} · ${capitalizeFirst(detail)}`;
}

export function toIsoDate(year, month, day) {
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export function formatEventsHeading(count, dayTitle) {
  if (count === 0) {
    return `События · ${dayTitle}`;
  }
  const mod10 = count % 10;
  const mod100 = count % 100;
  let word = 'событий';
  if (mod10 === 1 && mod100 !== 11) {
    word = 'событие';
  } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    word = 'события';
  }
  return `${count} ${word} · ${dayTitle}`;
}
