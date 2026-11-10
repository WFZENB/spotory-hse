import { initAppNotifications } from '../init/app-notifications.js';
import { CalendarStore } from '../store/calendar-store.js';
import { renderCalendar } from '../ui/calendar-ui.js';

document.addEventListener('DOMContentLoaded', () => {
  initAppNotifications();
  const grid = document.getElementById('calendar-grid');
  const list = document.getElementById('event-list-items');
  const title = document.getElementById('events-title');

  if (!grid || !list || !title) {
    return;
  }

  const store = new CalendarStore();
  const update = () => renderCalendar(grid, list, title, store);
  store.subscribe(update);
  update();
});
