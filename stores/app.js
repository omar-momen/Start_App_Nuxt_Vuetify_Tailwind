export const useAppStore = defineStore("app", () => {
  // Loading
  const initLoading = ref(true);
  const pageLoading = ref(false);

  return {
    initLoading,
    pageLoading,
  };
});
