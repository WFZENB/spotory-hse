export function isGeolocationSupported() {
  return typeof navigator !== 'undefined' && 'geolocation' in navigator;
}

export function getCurrentPosition(options = {}) {
  const {
    enableHighAccuracy = false,
    timeout = 15_000,
    maximumAge = 60_000,
  } = options;

  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      reject(new Error('GEOLOCATION_UNSUPPORTED'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy,
      timeout,
      maximumAge,
    });
  });
}

export function formatCoordinates(latitude, longitude) {
  return `${latitude.toFixed(5)}°, ${longitude.toFixed(5)}°`;
}

export function geolocationErrorMessage(error) {
  if (!error) {
    return 'Не удалось определить местоположение';
  }
  if (error.message === 'GEOLOCATION_UNSUPPORTED') {
    return 'Геолокация недоступна в этом браузере';
  }
  const code = error.code;
  if (code === 1) {
    return 'Доступ к геолокации запрещён';
  }
  if (code === 2) {
    return 'Местоположение не определено';
  }
  if (code === 3) {
    return 'Превышено время ожидания геолокации';
  }
  return 'Не удалось определить местоположение';
}
