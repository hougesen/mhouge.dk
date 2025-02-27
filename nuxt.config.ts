export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          href: '/apple-touch-icon.png',
          rel: 'apple-touch-icon',
          sizes: '180x180',
        },
        {
          href: '/favicon-32x32.png',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          href: '/favicon-16x16.png',
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          href: '/site.webmanifest',
          rel: 'manifest',
        },
        {
          color: '#5bbad5',
          href: '/safari-pinned-tab.svg',
          rel: 'mask-icon',
        },
        {
          href: 'https://fonts.googleapis.com',
          rel: 'preconnect',
        },
        {
          crossorigin: '',
          href: 'https://fonts.gstatic.com',
          rel: 'preconnect',
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
          rel: 'stylesheet',
        },
      ],
      meta: [
        {
          content: '#da532c',
          name: 'msapplication-TileColor',
        },
        {
          content: '#ffffff',
          name: 'theme-color',
        },
      ],
    },
  },

  compatibilityDate: '2024-10-11',

  content: {
    experimental: {
      cacheContents: true,
    },
    highlight: {
      langs: ['shell', 'go'],
      theme: 'one-dark-pro',
    },
  },

  css: ['~/assets/css/main.css'],

  devtools: {
    enabled: true,
  },

  eslint: {
    checker: true,
    config: {
      stylistic: false,
      typescript: {
        strict: true,
      },
    },
  },

  experimental: {
    payloadExtraction: true,
    sharedPrerenderData: true,
    writeEarlyHints: true,
  },

  modules: [
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/eslint',
  ],

  nitro: {
    minify: true,
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/sitemap.xml',
        '/blog/choosing-a-tech-stack-as-a-junior-developer',
        '/blog/undergraduate-thesis',
        '/lazy',
        '/leetcode',
        '/npm-packages',
        '/rust-packages',
      ],
    },
  },

  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {},
    },
  },

  robots: {
    credits: false,
    disallow: ['/api', '/api/*', '/404'],
    enabled: true,
  },

  routeRules: {
    '/': {
      prerender: true,
    },
    '/api/*': {
      prerender: false,
    },
    '/blog/*': {
      prerender: true,
    },
  },

  runtimeConfig: {
    githubApiKey: process?.env?.NUXT_GITHUB_API_KEY,
    stravaClientId: process?.env?.NUXT_STRAVA_CLIENT_ID,
    stravaClientSecret: process?.env?.NUXT_STRAVA_CLIENT_SECRET,
    stravaRefreshToken: process?.env?.NUXT_STRAVA_REFRESH_TOKEN,
    upstashRedisRestToken: process?.env?.NUXT_UPSTASH_REDIS_REST_TOKEN,
    upstashRedisRestUrl: process?.env?.NUXT_UPSTASH_REDIS_REST_URL,
    wakatimeApiKey: process?.env?.NUXT_WAKATIME_API_KEY,
  },

  site: {
    indexable: true,
    url: 'https://mhouge.dk',
  },

  sitemap: {
    cacheMaxAgeSeconds: 3600,
    credits: false,
    discoverImages: true,
    enabled: true,
  },

  ssr: true,

  telemetry: false,
});
