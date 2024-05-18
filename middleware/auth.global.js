import { useLangStore } from "@/stores/lang";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const redirect_token = useCookie("redirect_token");
  const lang_store = useLangStore();

  if (to.meta.requireAuth && !redirect_token.value) {
    // 1- Show Message Not Authorized
    const message =
      lang_store.current_lang == "en"
        ? "You have to login to access this page"
        : "يجب عليك تسجيل الدخول للوصول إلى هذه الصفحة";
    useErrorHandler(message);

    // 2- Cancel Navigation
    if (from.href) {
      /* {{If}} Means that you navigate throw a link normaly */
      return navigateTo("/authentication/login");
    } else {
      /* {{Else}} Means that you navigate throw writing in the web search bar directly */
      return navigateTo("/authentication/login");
    }
  }

  if (to.path.includes("authentication") && redirect_token.value) {
    return navigateTo("/");
  }
});
