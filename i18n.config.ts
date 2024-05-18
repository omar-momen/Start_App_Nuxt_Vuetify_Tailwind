import ar from "./locales/app/ar.js";
import en from "./locales/app/en.js";

export default defineI18nConfig(() => ({
  legacy: false,
  locales: ["ar", "en"],
  locale: "ar",
  defaultLocale: "ar",
  messages: {
    ar,
    en,
  },
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "lang_locale",
    redirectOn: "root", // recommended
  },
}));
