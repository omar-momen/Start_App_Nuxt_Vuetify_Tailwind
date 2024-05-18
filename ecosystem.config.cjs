module.exports = {
  apps: [
    {
      name: "Omars' Start App",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      env_production: {
        NODE_ENV: "production",
        NUXT_PUBLIC_API_BASE: "https://domain/api/",
        NUXT_PUBLIC_GOOGLE_MAPS_API_KEY:
          "AIzaSyC2MTR_vRbsbQQRPt5f5ZLCvvaKOpzkzlA",
      },
    },
  ],
};
