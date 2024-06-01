<template>
  <div class="root-wrapper">
    <InitialLoader v-if="appStore.initLoading" />
    <div class="layout-wrappe">
      <NuxtLayout>
        <div class="vuetify-app-wrappe">
          <v-app>
            <div class="pages-wrapper">
              <NuxtPage />
            </div>
          </v-app>
        </div>
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup>
const appStore = useAppStore();
const themeStore = useThemeStore();
const nuxtApp = useNuxtApp();

// ======= Handling loading
nuxtApp.hook("app:suspense:resolve", async () => {
  // appStore.initLoading = false;
});

// ======= Handling Theme While loading
const htmlClass = computed(() => {
  return themeStore.current_theme || themeStore.default_theme;
});

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - ${nuxtApp.$i18n.t("app.title")}`
      : nuxtApp.$i18n.t("app.title");
  },
  meta: [
    // Set Meta
    {
      name: "charset",
      content: "utf-8",
    },
    {
      name: "description",
      content:
        "Discover your dream home with DreamSpaces Realty – where exceptional properties meet unparalleled service. Explore a world of unique listings, tailored to fit every lifestyle and budget",
    },
    {
      name: "author",
      content: "Samh Team",
    },
    {
      name: "keywords",
      content: "SALE, BYE, RENT, HOME",
    },

    // Open Graph / Facebook
    {
      property: "og:title",
      content: "Samh Realstate",
    },
    {
      property: "og:descreption",
      content:
        "Discover your dream home with DreamSpaces Realty – where exceptional properties meet unparalleled service. Explore a world of unique listings, tailored to fit every lifestyle and budget",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:image",
      content:
        "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      property: "og:url",
      content: "http://8.213.24.120:8080/",
    },

    // Open Graph /Twitter
    {
      property: "twitter:title",
      content: "Samh Realstate",
    },
    {
      property: "twitter:descreption",
      content:
        "Discover your dream home with DreamSpaces Realty – where exceptional properties meet unparalleled service. Explore a world of unique listings, tailored to fit every lifestyle and budget",
    },
    {
      property: "twitter:type",
      content: "website",
    },
    {
      property: "twitter:image",
      content:
        "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      property: "twitter:url",
      content: "http://8.213.24.120:8080/",
    },
  ],
  htmlAttrs: {
    theme: htmlClass,
  },
});
</script>
