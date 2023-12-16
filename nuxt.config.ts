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
    githubApiKey: process?.env?.NUXT_GITHUB_API_KEY ?? '',
    wakatimeApiKey: process?.env?.NUXT_WAKATIME_API_KEY ?? '',
  },
});
