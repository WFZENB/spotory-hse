import { bindNotificationsBell } from '../web-api/notifications.js';

export function initAppNotifications() {
  const button = document.getElementById('app-notifications');
  if (button instanceof HTMLButtonElement) {
    bindNotificationsBell(button);
  }
}
