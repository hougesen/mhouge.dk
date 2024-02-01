export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/content',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

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

  content: {},
});
