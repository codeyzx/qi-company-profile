import { derived, writable } from "svelte/store";
import { locale, type Locale } from "$lib/stores/locale";
import translationsId from "./id.json";
import translationsEn from "./en.json";

type Translations = typeof translationsId;

const translations: Record<Locale, Translations> = {
  id: translationsId,
  en: translationsEn,
};

// Create derived store for current translations
export const t = derived(locale, ($locale) => {
  const currentTranslations = translations[$locale];

  // Helper function to get nested translation
  return (key: string): string => {
    const keys = key.split(".");
    let result: any = currentTranslations;

    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof result === "string" ? result : key;
  };
});

export { locale, setLocale, getLocale, type Locale } from "$lib/stores/locale";
