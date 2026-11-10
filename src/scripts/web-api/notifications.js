import { EVENTS } from '../data/events.js';

const NOTIFICATION_ICON = new URL(
  '../../assets/favicon.svg',
  import.meta.url,
).href;

export function isNotificationSupported() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

function getNextEvent() {
  const sorted = [...EVENTS].sort((a, b) => {
    const left = `${a.date}T${a.time}`;
    const right = `${b.date}T${b.time}`;
    return left.localeCompare(right);
  });
  return sorted[0] ?? null;
}

function buildNotificationPayload() {
  const event = getNextEvent();
  if (!event) {
    return {
      title: 'Spotory',
      body: 'Новых событий в календаре пока нет',
      tag: 'spotory-calendar-empty',
    };
  }
  return {
    title: 'Ближайшее событие',
    body: `${event.date} в ${event.time}: ${event.title} — ${event.place}`,
    tag: `spotory-event-${event.id}`,
  };
}

export async function ensureNotificationPermission() {
  if (!isNotificationSupported()) {
    return 'unsupported';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  if (Notification.permission === 'denied') {
    return 'denied';
  }
  try {
    return await Notification.requestPermission();
  } catch {
    return 'denied';
  }
}

export function showSpotoryNotification() {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return false;
  }

  const payload = buildNotificationPayload();
  try {
    new Notification(payload.title, {
      body: payload.body,
      tag: payload.tag,
      icon: NOTIFICATION_ICON,
    });
    return true;
  } catch {
    return false;
  }
}

export function bindNotificationsBell(button) {
  button.addEventListener('click', async () => {
    if (!isNotificationSupported()) {
      window.alert('Ваш браузер не поддерживает уведомления');
      return;
    }

    const permission = await ensureNotificationPermission();

    if (permission === 'denied') {
      window.alert(
        'Уведомления заблокированы. Разрешите их в настройках браузера для этого сайта.',
      );
      return;
    }

    if (permission !== 'granted') {
      return;
    }

    const shown = showSpotoryNotification();
    if (!shown) {
      window.alert('Не удалось показать уведомление');
    }
  });
}
