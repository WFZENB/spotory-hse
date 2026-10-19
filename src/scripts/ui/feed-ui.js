import { renderPosts } from './post-card.js';

export function renderFeed(root, store) {
  renderPosts(root, store.getVisiblePosts(), {
    onLike: (id) => store.toggleLike(id),
    emptyMessage: 'По вашему запросу ничего не найдено',
  });
}
