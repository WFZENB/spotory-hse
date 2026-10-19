import { INITIAL_POSTS } from '../data/posts.js';
import { CURRENT_USER } from '../data/user.js';

function clonePosts(posts) {
  return posts.map((post) => ({
    ...post,
    tags: post.tags.map((tag) => ({ ...tag })),
  }));
}

export class PostsStore {
  #posts;

  #query = '';

  #listeners = new Set();

  constructor(initialPosts = INITIAL_POSTS) {
    this.#posts = clonePosts(initialPosts);
  }

  subscribe(listener) {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }

  #notify() {
    for (const listener of this.#listeners) {
      listener(this);
    }
  }

  getQuery() {
    return this.#query;
  }

  setQuery(query) {
    this.#query = query.trim().toLowerCase();
    this.#notify();
  }

  getVisiblePosts() {
    if (!this.#query) {
      return this.#posts;
    }
    return this.#posts.filter((post) => {
      const haystack = [
        post.text,
        post.author,
        ...post.tags.map((t) => t.label),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(this.#query);
    });
  }

  getPostsByAuthor(authorId) {
    return this.#posts.filter((post) => post.authorId === authorId);
  }

  toggleLike(id) {
    const post = this.#posts.find((item) => item.id === id);
    if (!post) {
      return;
    }
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    this.#notify();
  }

  addPost(payload) {
    const text = payload.text.trim();
    if (!text) {
      return;
    }
    const post = {
      id: `post-${Date.now()}`,
      authorId: CURRENT_USER.id,
      author: CURRENT_USER.name,
      avatar: CURRENT_USER.avatar,
      datetime: new Date().toISOString(),
      tags: payload.tags ?? [],
      text,
      media: null,
      likes: 0,
      liked: false,
      comments: 0,
    };
    this.#posts.unshift(post);
    this.#notify();
  }
}
