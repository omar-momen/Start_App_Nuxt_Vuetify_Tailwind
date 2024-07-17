import { useThemeStore } from "~/stores/theme";
import { useLangStore } from "~/stores/lang";
import { useAppStore } from "@/stores/app";

// ========= Google Maps
// import { Loader } from "@googlemaps/js-api-loader";

export default defineNuxtPlugin((nuxtApp) => {
  // Auth
  const auth_store = useAuthStore();
  auth_store.handleFirstLoad();

  // Theme
  const theme_store = useThemeStore();
  theme_store.handleFirstLoad();

  // Lang
  const lang_store = useLangStore();
  lang_store.handleFirstLoad();

  // // Google Map Loader
  // const loader = new Loader({
  //   apiKey: useRuntimeConfig().public.googleMapsApiKey,
  //   libraries: ["places"],
  // });

  const app_store = useAppStore();
  nuxtApp.hook("app:mounted", async () => {
    // // Map Init
    // await loader.load();

    // Handle Resize
    app_store.handleResize();
    window.addEventListener("resize", app_store.handleResize);

    // Handle Scroll
    const lastScrollTop = ref(
      window.pageYOffset || document.documentElement.scrollTop
    );
    app_store.handleScroll(lastScrollTop);
    window.addEventListener(
      "scroll",
      () => {
        app_store.handleScroll(lastScrollTop);
      },
      false
    );

    // Handle Page Loading...
    nuxtApp.hook("page:start", () => {
      if (app_store.initLoading) return;
      app_store.pageLoading = true;
    });
    nuxtApp.hook("page:finish", () => {
      app_store.pageLoading = false;
    });
  });
});
