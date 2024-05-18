export const useThemeStore = defineStore("theme", () => {
  const nuxtApp = useNuxtApp();

  const current_theme = ref(null);
  const default_theme = ref("light");

  const domManipulation = (theme) => {
    // Body
    const BODY = document.querySelector("body");
    BODY.classList.add(`${theme === "light" ? "lightTheme" : "darkTheme"}`);
    BODY.classList.remove(`${theme === "light" ? "darkTheme" : "lightTheme"}`);

    // Root  Attribuets
    BODY.setAttribute("theme", theme);
    document.documentElement["theme"] = theme;
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
