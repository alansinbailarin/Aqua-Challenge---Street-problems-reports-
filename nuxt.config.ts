// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      mapsApiKey: process.env.NUXT_MAPS_API_KEY,
    },
  },
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-bezier",
  ],
  googleFonts: {
    families: {
      Poppins: true,
    },
  },
});
