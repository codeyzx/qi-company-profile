import { writable, derived } from "svelte/store";
import type { Writable } from "svelte/store";

export type Locale = "id" | "en";

// Create locale store with default 'id'
export const locale: Writable<Locale> = writable("id");

// Helper to get locale value
export const getLocale = (): Locale => {
  let currentLocale: Locale = "id";
  locale.subscribe((value) => {
    currentLocale = value;
  })();
  return currentLocale;
};

// Helper to set locale
export const setLocale = (newLocale: Locale) => {
  locale.set(newLocale);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("locale", newLocale);
  }
};

// Initialize locale from localStorage if available
if (typeof localStorage !== "undefined") {
  const savedLocale = localStorage.getItem("locale") as Locale | null;
  if (savedLocale && (savedLocale === "id" || savedLocale === "en")) {
    locale.set(savedLocale);
  }
}
