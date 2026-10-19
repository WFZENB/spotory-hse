import { CommunitiesStore } from '../store/communities-store.js';
import { renderCommunities } from '../ui/communities-ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const listRoot = document.getElementById('communities-root');
  const searchPanel = document.getElementById('communities-search');
  const searchInput = document.getElementById('communities-search-input');
  const searchToggle = document.getElementById('communities-search-toggle');

  if (!listRoot || !searchPanel || !searchInput || !searchToggle) {
    return;
  }

  const store = new CommunitiesStore();

  const update = () => renderCommunities(listRoot, store);
  store.subscribe(update);
  update();

  searchInput.addEventListener('input', () => {
    store.setQuery(searchInput.value);
  });

  const setSearchOpen = (open) => {
    searchPanel.hidden = !open;
    searchToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    searchToggle.setAttribute(
      'aria-label',
      open ? 'Закрыть поиск' : 'Открыть поиск',
    );
    if (open) {
      searchInput.focus({ preventScroll: true });
      searchToggle.blur();
    } else {
      searchInput.value = '';
      store.setQuery('');
      searchInput.blur();
      queueMicrotask(() => searchToggle.blur());
    }
  };

  searchToggle.addEventListener('click', () => {
    const isOpen = searchToggle.getAttribute('aria-expanded') === 'true';
    setSearchOpen(!isOpen);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && searchToggle.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      setSearchOpen(false);
    }
  });
});
