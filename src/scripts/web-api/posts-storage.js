import { isLocalStorageAvailable } from './local-storage.js';

const USER_POSTS_KEY = 'spotory:user-posts';
const POST_LIKES_KEY = 'spotory:post-likes';

function readJson(key, fallback) {
  if (!isLocalStorageAvailable()) {
    return fallback;
  }
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function loadUserPosts() {
  const posts = readJson(USER_POSTS_KEY, []);
  return Array.isArray(posts) ? posts : [];
}

export function saveUserPost(post) {
  const posts = loadUserPosts().filter((item) => item.id !== post.id);
  posts.unshift(post);
  writeJson(USER_POSTS_KEY, posts);
}

export function loadPostLikes() {
  const likes = readJson(POST_LIKES_KEY, {});
  return likes && typeof likes === 'object' && !Array.isArray(likes) ? likes : {};
}

export function savePostLike(id, liked, likes) {
  const map = loadPostLikes();
  map[id] = { liked, likes };
  writeJson(POST_LIKES_KEY, map);
}

export function applyStoredLikes(posts) {
  const map = loadPostLikes();
  for (const post of posts) {
    const stored = map[post.id];
    if (stored) {
      post.liked = Boolean(stored.liked);
      post.likes = Number.isFinite(stored.likes) ? stored.likes : post.likes;
    }
  }
}

export function mergeUserPosts(posts) {
  const userPosts = loadUserPosts();
  const ids = new Set(posts.map((post) => post.id));
  const merged = [...posts];

  for (let index = userPosts.length - 1; index >= 0; index -= 1) {
    const post = userPosts[index];
    if (ids.has(post.id)) {
      continue;
    }
    merged.unshift({
      ...post,
      tags: (post.tags ?? []).map((tag) => ({ ...tag })),
    });
  }

  return merged;
}
