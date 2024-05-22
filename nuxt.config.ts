export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: true,

  modules: [
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/sitemap',
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
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
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
      meta: [
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' },
      ],
    },
  },

  nitro: {
    prerender: {
      autoSubfolderIndex: true,
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
    minify: true,
  },

  runtimeConfig: {
    githubApiKey: process?.env?.NUXT_GITHUB_API_KEY ?? '',

    wakatimeApiKey: process?.env?.NUXT_WAKATIME_API_KEY ?? '',

    stravaClientId: process?.env?.NUXT_STRAVA_CLIENT_ID ?? '',
    stravaClientSecret: process?.env?.NUXT_STRAVA_CLIENT_SECRET ?? '',
    stravaRefreshToken: process?.env?.NUXT_STRAVA_REFRESH_TOKEN ?? '',

    upstashRedisRestUrl: process?.env?.NUXT_UPSTASH_REDIS_REST_URL ?? '',
    upstashRedisRestToken: process?.env?.NUXT_UPSTASH_REDIS_REST_TOKEN ?? '',
  },

  image: {
    domains: ['mhouge.dk'],
    provider: 'ipxStatic',
  },

  site: {
    url: 'https://mhouge.dk',
    indexable: true,
  },

  sitemap: {
    enabled: true,
    cacheMaxAgeSeconds: 3600,
    discoverImages: true,
    credits: false,
  },

  content: {
    experimental: {
      cacheContents: true,
    },
  },

  robots: {
    enabled: true,
    disallow: ['/api', '/api/*', '/404'],
    credits: false,
  },

  routeRules: {
    '/': { prerender: true },
    '/blog/*': { prerender: true },
    '/api/*': { prerender: false },
  },

  experimental: {
    writeEarlyHints: true,
    sharedPrerenderData: true,
    payloadExtraction: true,
  },

  telemetry: false,
});
