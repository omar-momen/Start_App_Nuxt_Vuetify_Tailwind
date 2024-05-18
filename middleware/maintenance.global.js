export default defineNuxtRouteMiddleware((to, from) => {
  const maintenanceMode = useRuntimeConfig().public.maintenanceMode;
  if (to.fullPath != "/maintenance" && maintenanceMode) {
    return navigateTo("/maintenance");
  }
  if (to.fullPath == "/maintenance" && !maintenanceMode) {
    return navigateTo("/");
  }
});
