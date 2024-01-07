// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig:{
    public:{
      WEATHER_APP_SECRET: process.env.WEATHER_APP_SECRET
    }
  },
  devtools: { enabled: true },
  css: [
    "~/assets/css/tailwind.css"
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
