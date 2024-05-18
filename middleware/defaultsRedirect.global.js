export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp();
  const lang_store = useLangStore();
  const theme_store = useThemeStore();
  const auth_store = useAuthStore();

  // Retrieve the locales from the cookie
  const lang_locale = useCookie("lang_locale");
  const theme_locale = useCookie("theme_locale");
  const redirect_token = useCookie("redirect_token");

  /* Set the locales if the cookie is present */
  // Lang
  nuxtApp.$i18n.locale.value = lang_locale.value || lang_store.default_lang;
  nuxtApp.$vuetify.locale.current.value =
    lang_locale.value || lang_store.default_lang;
  lang_store.current_lang = lang_locale.value;

  // Theme
  nuxtApp.$vuetify.theme.global.name.value =
    theme_locale.value || theme_store.default_theme;
  theme_store.current_theme = theme_locale.value;

  // Token
  auth_store.redirect_token = redirect_token.value || null;
});
