export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/image', 'nuxt-simple-sitemap'],

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
      routes: ['/'],
    },
  },

  runtimeConfig: {
    githubApiKey: process?.env?.NUXT_GITHUB_API_KEY ?? '',
    wakatimeApiKey: process?.env?.NUXT_WAKATIME_API_KEY ?? '',
  },

  image: {
    domains: ['mhouge.dk'],
  },

  site: {
    url: 'https://mhouge.dk',
  },

  sitemap: {
    enabled: true,
    cacheMaxAgeSeconds: 3600,
  },
});
