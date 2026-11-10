export function isLocalStorageAvailable() {
  try {
    const probeKey = '__spotory_ls_probe__';
    localStorage.setItem(probeKey, '1');
    localStorage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}
