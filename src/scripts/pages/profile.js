import { CURRENT_USER } from '../data/user.js';
import { PostsStore } from '../store/posts-store.js';
import { bindProfileModal } from '../ui/profile-modal.js';
import { initProfilePreviews } from '../ui/profile-preview-ui.js';
import { renderPosts } from '../ui/post-card.js';

const TAG_OPTIONS = [
  { slug: 'climbing', label: 'Скалолазание' },
  { slug: 'run', label: 'Бег' },
  { slug: 'cycling', label: 'Велосипед' },
  { slug: 'tourism', label: 'Туризм' },
];

document.addEventListener('DOMContentLoaded', () => {
  const postsRoot = document.getElementById('profile-posts');
  const form = document.getElementById('profile-post-form');
  const modalDialog = document.getElementById('profile-modal');

  const modal =
    modalDialog instanceof HTMLDialogElement ? bindProfileModal(modalDialog) : null;
  if (modal) {
    initProfilePreviews(modal);
  }

  if (!postsRoot || !form) {
    return;
  }

  const store = new PostsStore();

  const updatePosts = () => {
    renderPosts(postsRoot, store.getPostsByAuthor(CURRENT_USER.id), {
      onLike: (id) => store.toggleLike(id),
      emptyMessage: 'Вы ещё не публиковали посты',
    });
  };

  store.subscribe(updatePosts);
  updatePosts();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const text = data.get('text');
    if (typeof text !== 'string') {
      return;
    }

    const tags = TAG_OPTIONS.filter((tag) => data.get(`tag-${tag.slug}`) === 'on');

    store.addPost({ text, tags });
    form.reset();
    postsRoot.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
