import { useAuthStore } from "@/stores/auth";
import { useLangStore } from "@/stores/lang";

const handleUnAuthunticated = async (
  auth_store,
  langStore,
  nuxtApp,
  response,
) => {
  if (response.status == 401 && response.url.includes("/auth/logout")) {
    const message =
      langStore.current_lang == "en"
        ? "You have been logged out"
        : "تم تسجيل الخروج";

    useSuccessToas(message);

    auth_store.clearStorage();

    return navigateTo("/authentication/login");
  }

  if (
    response.status == 401 &&
    !response.url.includes("/auth/login") &&
    !response.url.includes("/auth/logout") &&
    auth_store.user
  ) {
    await nuxtApp.$Swal.fire({
      title: useHelpers().capitalizeEveryWord(
        nuxtApp.$i18n.t("alerts.logout.title"),
      ),
      text: useHelpers().capitalizeEveryWord(
        nuxtApp.$i18n.t("alerts.logout.text"),
      ),
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: nuxtApp.$i18n.t("form.ok"),
    });

    auth_store.logOut();
  }
};

const handleUnAuthorized = async (langStore, response) => {
  if (response.status == 403) {
    const message =
      langStore.current_lang == "en"
        ? "You don't have permission to access this page"
        : "ليس لديك الصلاحية للوصول إلى هذه الصفحة";
    useSuccessToas(message);

    return navigateTo("/");
  }
};

const serverError = async (langStore, response) => {
  if (response.status == 500) {
    const message =
      langStore.current_lang == "en" ? "server error" : "خطأ في الخادم";
    showError({
      message: message,
      statusCode: 500,
    });
  }
};

const notFound = async (langStore, response) => {
  if (response.status == 404) {
  }
};

export const useMyFetch = (url, options) => {
  const redirect_token = useCookie("redirect_token");
  const lang_locale = useCookie("lang_locale");

  const BASE_URL = useRuntimeConfig().public.apiBase;
  const lang_store = useLangStore();
  const auth_store = useAuthStore();
  const nuxtApp = useNuxtApp();
  const langStore = useLangStore();

  const my_options = {
    ...options,
    baseURL: BASE_URL,
    headers: {
      ...options?.headers,
      "Accept-Language": lang_locale.value || lang_store.default_lang,
      ...(redirect_token.value
        ? { Authorization: "Bearer " + redirect_token.value }
        : {}),
    },
    onRequestError({ request, options, error }) {},
    async onResponseError({ response, options, error }) {
      handleUnAuthunticated(auth_store, langStore, nuxtApp, response);
      handleUnAuthorized(langStore, response);
      serverError(langStore, response);
      notFound(langStore, response);
    },
  };

  return useFetch(url, my_options);
};
