export const useLangStore = defineStore("lang", () => {
  const nuxtApp = useNuxtApp();

  const current_lang = ref(null);
  const default_lang = ref("ar");

  const domManipulation = (lang) => {
    // Body Direction
    const BODY = document.querySelector("body");
    BODY.classList.add(`${lang === "ar" ? "rtl" : "ltr"}`);
    BODY.classList.remove(`${lang === "ar" ? "ltr" : "rtl"}`);

    // Root Attribuets
    BODY.setAttribute("dir", `${lang === "ar" ? "rtl" : "ltr"}`);
    document.documentElement["lang"] = current_lang.value;
  };

  const framworksLocale = (lang) => {
    nuxtApp.$i18n.locale.value = lang;
  };

  const fillStorage = (lang) => {
    const lang_locale = useCookie("lang_locale");
    lang_locale.value = lang;
    nuxtApp.$encryptStorage.setItem("blank_App_Lang", lang);
  };

  const changeLang = (lang) => {
    fillStorage(lang);
    location.reload();
  };

  const switchLang = () => {
    const lang = current_lang.value === "ar" ? "en" : "ar";
    fillStorage(lang);
    location.reload();
  };

  const handleFirstLoad = () => {
    current_lang.value = useCookie("lang_locale").value || default_lang.value;
    domManipulation(current_lang.value);
    framworksLocale(current_lang.value);
    fillStorage(current_lang.value);
  };

  return {
    current_lang,
    default_lang,
    changeLang,
    switchLang,
    handleFirstLoad,
  };
});
