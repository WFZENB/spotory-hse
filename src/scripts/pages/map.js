import { initAppNotifications } from '../init/app-notifications.js';
import {
  formatCoordinates,
  geolocationErrorMessage,
  getCurrentPosition,
  isGeolocationSupported,
} from '../web-api/geolocation.js';

function setGeolocationUi({ coordsEl, statusEl, refreshBtn, loading }) {
  if (refreshBtn) {
    refreshBtn.disabled = loading;
  }
  if (loading && statusEl) {
    statusEl.textContent = 'Определяем координаты…';
  }
  if (loading && coordsEl) {
    coordsEl.textContent = '—';
  }
}

async function refreshGeolocation({ coordsEl, statusEl, refreshBtn }) {
  if (!isGeolocationSupported()) {
    if (coordsEl) {
      coordsEl.textContent = 'Недоступно';
    }
    if (statusEl) {
      statusEl.textContent = geolocationErrorMessage({ message: 'GEOLOCATION_UNSUPPORTED' });
    }
    if (refreshBtn) {
      refreshBtn.disabled = true;
    }
    return;
  }

  setGeolocationUi({ coordsEl, statusEl, refreshBtn, loading: true });

  try {
    const position = await getCurrentPosition();
    const { latitude, longitude, accuracy } = position.coords;

    if (coordsEl) {
      coordsEl.textContent = formatCoordinates(latitude, longitude);
    }
    if (statusEl) {
      statusEl.textContent = `Точность ≈ ${Math.round(accuracy)} м`;
    }
  } catch (error) {
    if (coordsEl) {
      coordsEl.textContent = '—';
    }
    if (statusEl) {
      statusEl.textContent = geolocationErrorMessage(error);
    }
  } finally {
    if (refreshBtn) {
      refreshBtn.disabled = !isGeolocationSupported();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initAppNotifications();

  const coordsEl = document.getElementById('map-geolocation-coords');
  const statusEl = document.getElementById('map-geolocation-status');
  const refreshBtn = document.getElementById('map-geolocation-refresh');

  if (!coordsEl || !statusEl) {
    return;
  }

  if (refreshBtn instanceof HTMLButtonElement) {
    refreshBtn.addEventListener('click', () => {
      refreshGeolocation({ coordsEl, statusEl, refreshBtn });
    });
  }

  refreshGeolocation({ coordsEl, statusEl, refreshBtn });
});
