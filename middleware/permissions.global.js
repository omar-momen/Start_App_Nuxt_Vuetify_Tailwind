import { useLangStore } from "@/stores/lang";
import { useUserStore } from "@/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const user_store = useUserStore();
    await user_store.getUserPermissions();

    const lang_store = useLangStore();

    const conditions = [
      to.fullPath.includes("dashboard") &&
        !useHelpers().hasPermission("access-memberDashboard"),
    ];

    if (conditions.some((condition) => condition === true)) {
      // 1- Show Message Not Authorized
      const message =
        lang_store.current_lang == "en"
          ? "You are not authorized to access this page"
          : "ليس لديك الصلاحية للوصول إلى هذه الصفحة";
      useErrorHandler(message);
      // 2- Cancel Navigation
      if (from.href) {
        /* {{If}} Means that you navigate throw a link normaly */
        return navigateTo("/");
      } else {
        /* {{Else}} Means that you navigate throw writing in the web search bar directly */
        return navigateTo("/");
      }
    }
  }
});
