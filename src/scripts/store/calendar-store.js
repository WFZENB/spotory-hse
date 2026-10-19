import { DEFAULT_SELECTED_DATE, EVENTS } from '../data/events.js';

export class CalendarStore {
  #selectedDate;

  #listeners = new Set();

  constructor(selectedDate = DEFAULT_SELECTED_DATE) {
    this.#selectedDate = selectedDate;
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

  getSelectedDate() {
    return this.#selectedDate;
  }

  selectDate(isoDate) {
    this.#selectedDate = isoDate;
    this.#notify();
  }

  getEventDates() {
    return new Set(EVENTS.map((event) => event.date));
  }

  getEventCountForDate(isoDate) {
    return EVENTS.filter((event) => event.date === isoDate).length;
  }

  getEventsForSelectedDay() {
    return EVENTS.filter((event) => event.date === this.#selectedDate).sort(
      (a, b) => a.time.localeCompare(b.time),
    );
  }
}
