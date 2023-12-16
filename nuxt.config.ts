export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/image'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    prerender: {
      autoSubfolderIndex: true,
      crawlLinks: true,
    },
  },

  runtimeConfig: {
    githubApiKey: '',
    wakatimeApiKey: '',
  },
});
