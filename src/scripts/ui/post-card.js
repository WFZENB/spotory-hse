import { formatPostDateTime } from '../lib/format.js';

const likeIconUrl = new URL('../../assets/icons/like.svg', import.meta.url).href;
const commentIconUrl = new URL('../../assets/icons/comment.svg', import.meta.url).href;

function createTagElement(tag) {
  const span = document.createElement('span');
  span.className = `tag tag--${tag.slug}`;
  span.textContent = tag.label;
  return span;
}

export function createPostElement(post, handlers = {}) {
  const article = document.createElement('article');
  article.className = 'feed__post post-card';
  article.dataset.postId = post.id;

  const header = document.createElement('header');
  header.className = 'post-card__header';

  const avatar = document.createElement('img');
  avatar.className = 'post-card__avatar';
  avatar.src = post.avatar;
  avatar.width = 40;
  avatar.height = 40;
  avatar.alt = '';

  const meta = document.createElement('div');
  meta.className = 'post-card__meta';

  const author = document.createElement('p');
  author.className = 'post-card__author';
  author.textContent = post.author;

  const time = document.createElement('time');
  time.className = 'post-card__time';
  time.dateTime = post.datetime.slice(0, 10);
  time.textContent = formatPostDateTime(post.datetime);

  meta.append(author, time);
  header.append(avatar, meta);

  const tagsWrap = document.createElement('div');
  tagsWrap.className = 'post-card__tags';
  for (const tag of post.tags) {
    tagsWrap.append(createTagElement(tag));
  }

  const text = document.createElement('p');
  text.className = 'post-card__text';
  text.textContent = post.text;

  article.append(header);
  if (post.tags.length > 0) {
    article.append(tagsWrap);
  }
  article.append(text);

  if (post.media) {
    const media = document.createElement('img');
    media.className = 'post-card__media';
    media.src = post.media;
    media.width = 640;
    media.height = 400;
    media.alt = '';
    article.append(media);
  }

  const footer = document.createElement('footer');
  footer.className = 'post-card__footer';

  const stats = document.createElement('div');
  stats.className = 'post-card__stats';

  const likeButton = document.createElement('button');
  likeButton.type = 'button';
  likeButton.className = 'post-card__stat post-card__stat--like';
  if (post.liked) {
    likeButton.classList.add('post-card__stat--liked');
  }
  likeButton.setAttribute('aria-pressed', post.liked ? 'true' : 'false');
  likeButton.setAttribute(
    'aria-label',
    post.liked ? 'Убрать лайк' : 'Поставить лайк',
  );

  const likeIconEl = document.createElement('img');
  likeIconEl.className = 'post-card__stat-icon';
  likeIconEl.src = likeIconUrl;
  likeIconEl.width = 18;
  likeIconEl.height = 18;
  likeIconEl.alt = '';
  likeIconEl.setAttribute('aria-hidden', 'true');

  const likeCount = document.createElement('span');
  likeCount.textContent = String(post.likes);

  likeButton.append(likeIconEl, likeCount);
  if (handlers.onLike) {
    likeButton.addEventListener('click', () => handlers.onLike(post.id));
  }

  const comments = document.createElement('span');
  comments.className = 'post-card__stat';
  const commentIcon = document.createElement('img');
  commentIcon.className = 'post-card__stat-icon';
  commentIcon.src = commentIconUrl;
  commentIcon.width = 18;
  commentIcon.height = 18;
  commentIcon.alt = '';
  commentIcon.setAttribute('aria-hidden', 'true');
  const commentCount = document.createElement('span');
  commentCount.textContent = String(post.comments);
  comments.append(commentIcon, commentCount);

  stats.append(likeButton, comments);
  footer.append(stats);
  article.append(footer);

  return article;
}

export function renderPosts(container, posts, options = {}) {
  container.replaceChildren();

  if (posts.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'feed__empty';
    empty.textContent = options.emptyMessage ?? 'Ничего не найдено';
    container.append(empty);
    return;
  }

  for (const post of posts) {
    container.append(createPostElement(post, { onLike: options.onLike }));
  }
}
