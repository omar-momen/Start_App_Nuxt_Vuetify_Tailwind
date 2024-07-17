export const useAppStore = defineStore("app", () => {
  // Loading
  const initLoading = ref(true);
  const pageLoading = ref(false);

  // App Settings
  const settings = ref(null);
  const getSettings = async () => {
    const data = await settingsService().getSettings();
    settings.value = data;
    return data;
  };

  // Scroll
  const scrollDirection = ref(null);
  const handleScroll = (lastScrollTop) => {
    const scrollTopPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTopPosition > lastScrollTop.value) {
      scrollDirection.value = "down";
    } else if (scrollTopPosition < lastScrollTop.value) {
      scrollDirection.value = "up";
    }
    lastScrollTop.value = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
  };

  // Resize
  const currentWindowSize = ref(null);
  const screen = computed(() => {
    if (currentWindowSize.value > 0 && currentWindowSize.value < 600)
      return "xs";
    if (currentWindowSize.value > 600 && currentWindowSize.value < 960)
      return "sm";
    if (currentWindowSize.value > 960 && currentWindowSize.value < 1280)
      return "md";
    if (currentWindowSize.value > 1280 && currentWindowSize.value < 1920)
      return "lg";
    else return "xl";
  });
  const isSmallScreen = computed(() => {
    return screenSize.value == "xs" || screenSize.value == "sm";
  });
  const handleResize = () => {
    currentWindowSize.value = window.innerWidth;
  };

  return {
    initLoading,
    pageLoading,

    getSettings,
    settings,

    handleScroll,
    scrollDirection,

    screen,
    isSmallScreen,
    handleResize,
  };
});
