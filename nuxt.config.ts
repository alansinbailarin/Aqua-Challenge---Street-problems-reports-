// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      mapsApiKey: process.env.NUXT_MAPS_API_KEY,

      apiKey: process.env.NUXT_FIREBASE_APIKEY,
      authDomain: process.env.NUXT_FIREBASE_AUTHDOMAIN,
      projectId: process.env.NUXT_FIREBASE_PROJECTID,
      storageBucket: process.env.NUXT_FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.NUXT_FIREBASE_MESSAGINGSENDERID,
      appId: process.env.NUXT_FIREBASE_APPID,
      // measurementId: process.env.NUXT_FIREBASE_MEASUREMENTID,
    },
  },
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-bezier",
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,

        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
  ],
  googleFonts: {
    families: {
      Poppins: true,
    },
  },
  routeRules: {
    "/": { prerender: true },
    "/dashboard/**": { ssr: false },
    "/auth/**": { ssr: false },
  },
  build: {
    transpile: ["vue-sonner"],
  },
});
