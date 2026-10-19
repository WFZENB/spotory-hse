import { COMMUNITY_SECTIONS } from '../data/communities.js';

export class CommunitiesStore {
  #query = '';

  #listeners = new Set();

  subscribe(listener) {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }

  #notify() {
    for (const listener of this.#listeners) {
      listener(this);
    }
  }

  setQuery(query) {
    this.#query = query.trim().toLowerCase();
    this.#notify();
  }

  getVisibleSections() {
    if (!this.#query) {
      return COMMUNITY_SECTIONS;
    }

    return COMMUNITY_SECTIONS.map((section) => ({
      ...section,
      communities: section.communities.filter((community) => {
        const haystack = [
          section.title,
          community.name,
          community.kind,
          community.detail,
          ...community.tags.map((tag) => tag.label),
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(this.#query);
      }),
    })).filter((section) => section.communities.length > 0);
  }

  hasVisibleCommunities() {
    return this.getVisibleSections().some((section) => section.communities.length > 0);
  }
}
