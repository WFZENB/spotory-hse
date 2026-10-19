import { PostsStore } from '../store/posts-store.js';
import { renderFeed } from '../ui/feed-ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const feedRoot = document.getElementById('feed');
  const searchPanel = document.getElementById('feed-search');
  const searchInput = document.getElementById('feed-search-input');
  const searchToggle = document.getElementById('feed-search-toggle');

  if (!feedRoot || !searchPanel || !searchInput || !searchToggle) {
    return;
  }

  const store = new PostsStore();

  const update = () => renderFeed(feedRoot, store);
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
