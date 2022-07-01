import { defineNuxtConfig } from 'nuxt'
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: process.env.NODE_ENV === "development" ? "/api" : 'http://192.168.4.80:3000/api',
    }
  },
  modules: ['nuxt-ionic'],
  ssr: true,
  meta: [{
    name: "viewport",
    content: "viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
  }
  ],
  ionic: {
    integrations: {
      //
      // pwa: true,
      // router: true,
    },
    css: {
      // basic: false,
      // core: false,
      utilities: true,
    },
  },
})