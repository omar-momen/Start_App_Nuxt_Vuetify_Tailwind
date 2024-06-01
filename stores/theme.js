export const useThemeStore = defineStore("theme", () => {
  const nuxtApp = useNuxtApp();

  const current_theme = ref(null);
  const default_theme = ref("light");

  const domManipulation = (theme) => {
    // Body
    const BODY = document.querySelector("body");
    const HTML = document.querySelector("html");

    // Root Attribuets
    console.log(theme);
    BODY.setAttribute("current_theme", theme);
    HTML.setAttribute("current_theme", theme);
    console.log(theme);
  };

  const framworksLocale = (theme) => {
    nuxtApp.$vuetify.theme.global.name.value = theme;
  };

  const fillStorage = (theme) => {
    const theme_locale = useCookie("theme_locale");
    theme_locale.value = theme;
    nuxtApp.$encryptStorage.setItem("blank_App_Theme", theme);
  };

  const changeTheme = (theme) => {
    framworksLocale(theme);
    fillStorage(theme);
    domManipulation(theme);
  };

  const handleFirstLoad = () => {
    current_theme.value =
      useCookie("theme_locale").value || default_theme.value;
    domManipulation(current_theme.value);
    framworksLocale(current_theme.value);
    fillStorage(current_theme.value);
  };

  return {
    changeTheme,
    handleFirstLoad,
    current_theme,
    default_theme,
  };
});
