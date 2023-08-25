// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthq/ui', '@sidebase/nuxt-auth', 'nuxt-mongoose', '@pinia/nuxt'],
  ui: {
    icons: ['mdi', 'bi', 'icon-park-outline']
  },
  css: [
    '@/assets/style/main.css'
  ],
  auth: {
    globalAppMiddleware: true,
  },
  runtimeConfig: {
    qcrowAuthSecret: ''
  },
  mongoose: {
    uri: process.env.NUXT_QCROW_MONGODB_URI,
    options: {},
    modelsDir: 'models',
  },
})
