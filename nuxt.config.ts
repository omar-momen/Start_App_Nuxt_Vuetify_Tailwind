import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ["@/assets/scss/main.scss"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build: {
    transpile: ["vuetify"],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
  ],

  image: {
    unsplash: {
      baseURL: "https://images.unsplash.com/",
    },

    presets: {
      default: {
        modifiers: {
          format: "webp",
          fit: "cover",
          quality: "70",
        },
      },
    },
  },

  i18n: {
    vueI18n: "./i18n.config.ts",
  },

  pinia: {
    autoImports: [
      "defineStore", // import { defineStore } from 'pinia'
    ],
  },

  runtimeConfig: {
    public: {
      apiBase: "",
      googleMapsApiKey: "",
      maintenanceMode: "",
    },
  },

  app: {
    layoutTransition: { name: "fadeIn", mode: "out-in" },
    pageTransition: { name: "fadeIn", mode: "out-in" },
  },

  components: [{ path: "~/components", pathPrefix: false }],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
