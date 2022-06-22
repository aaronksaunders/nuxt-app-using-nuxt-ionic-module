import { defineNuxtConfig } from 'nuxt'
export default defineNuxtConfig({
  modules: ['nuxt-ionic'],
  ionic: {
    integrations: {
      //
    },
    css: {
      basic : true,
      core : true,
      utilities : true,
    },
  },
})