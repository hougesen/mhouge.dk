import { Redis } from '@upstash/redis/cloudflare';
import { REDIS_CACHE_DURATION, REQUEST_CACHE_DURATION } from '~~/caching';
import type { Project } from '~~/github';

type GithubContributedToResponse = {
  data: {
    user: {
      repositoriesContributedTo: {
        nodes: Array<{
          description: string;
          homepageUrl: string;
          languages: { nodes: Array<{ color: string; name: string }> };
          name: string;
          nameWithOwner: string;
          stargazerCount: number;
          url: string;
        }>;
        pageInfo: {
          endCursor?: string | null;
          hasNextPage: boolean;
        };
      };
    };
  };
};

const hardcoded: Project[] = [
  {
    name: 'nim-lang/nim',
    description:
      'Nim is a statically typed compiled systems programming language. It combines successful concepts from mature languages like Python, Ada and Modula. Its design focuses on efficiency, expressiveness, and elegance (in that order of priority).',
    homepageUrl: 'https://nim-lang.org',
    url: 'https://github.com/nim-lang/Nim',
    languages: [
      { color: '#ffc200', name: 'Nim' },
      { color: '#e34c26', name: 'HTML' },
      { color: '#3572A5', name: 'Python' },
    ],
    stargazerCount: 16767,
  },
  {
    name: 'analysis-tools-dev/static-analysis',
    description:
      '⚙️ A curated list of static analysis (SAST) tools and linters for all programming languages, config files, build tools, and more. The focus is on tools which improve code quality.',
    homepageUrl: 'https://analysis-tools.dev',
    stargazerCount: 13527,
    url: 'https://github.com/analysis-tools-dev/static-analysis',
    languages: [
      { color: '#dea584', name: 'Rust' },
      { color: '#427819', name: 'Makefile' },
    ],
  },
  {
    name: 'sparckles/robyn',
    description:
      'Robyn is a Super Fast Async Python Web Framework with a Rust runtime.',
    homepageUrl: 'https://github.com/sparckles/Robyn',
    url: 'https://github.com/sparckles/Robyn',
    languages: [
      { color: '#3572A5', name: 'Python' },
      { color: '#dea584', name: 'Rust' },
    ],
    stargazerCount: 5142,
  },
  {
    name: 'raphamorim/rio',
    description:
      'A hardware-accelerated GPU terminal emulator focusing to run in desktops and browsers.',
    homepageUrl: 'https://raphamorim.io/rio',
    url: 'https://github.com/raphamorim/rio',
    languages: [
      { color: '#dea584', name: 'Rust' },
      { color: '#f1e05a', name: 'JavaScript' },
      { color: '#1a5e9a', name: 'WGSL' },
    ],
    stargazerCount: 4567,
  },
  {
    name: 'stevearc/conform.nvim',
    description: 'Lightweight yet powerful formatter plugin for Neovim',
    homepageUrl: '',
    stargazerCount: 3522,
    url: 'https://github.com/stevearc/conform.nvim',
    languages: [
      { color: '#000080', name: 'Lua' },
      { color: '#3572A5', name: 'Python' },
      { color: '#89e051', name: 'Shell' },
    ],
  },
  {
    name: 'hey-api/openapi-ts',
    description:
      '🚀 The OpenAPI to TypeScript codegen. Generate clients, SDKs, validators, and more. Support: @mrlubos',
    homepageUrl: 'https://heyapi.dev',
    url: 'https://github.com/hey-api/openapi-ts',
    languages: [
      { color: '#3178c6', name: 'TypeScript' },
      { color: '#f1e05a', name: 'JavaScript' },
      { color: '#f7931e', name: 'Handlebars' },
    ],
    stargazerCount: 1752,
  },
  {
    name: 'axodotdev/cargo-dist',
    description: '📦 shippable application packaging',
    homepageUrl: 'https://axodotdev.github.io/cargo-dist/',
    url: 'https://github.com/axodotdev/cargo-dist',
    languages: [
      { color: '#dea584', name: 'Rust' },
      { color: '#a52a22', name: 'Jinja' },
      { color: '#89e051', name: 'Shell' },
    ],
    stargazerCount: 1609,
  },
  {
    name: 'mundimark/awesome-markdown',
    description:
      'A collection of awesome markdown goodies (libraries, services, editors, tools, cheatsheets, etc.)',
    homepageUrl: '',
    url: 'https://github.com/mundimark/awesome-markdown',
    languages: [],
    stargazerCount: 1559,
  },
  {
    name: 'michaelb/sniprun',
    description:
      'A neovim plugin to run lines/blocs of code (independently of the rest of the file), supporting multiples languages',
    homepageUrl: '',
    url: 'https://github.com/michaelb/sniprun',
    languages: [
      { color: '#dea584', name: 'Rust' },
      { color: '#000080', name: 'Lua' },
      { color: '#89e051', name: 'Shell' },
    ],
    stargazerCount: 1526,
  },
  {
    name: 'microlinkhq/unavatar',
    description:
      'Get unified user avatar from social networks, including Instagram, SoundCloud, Telegram, Twitter, YouTube & more.',
    homepageUrl: 'https://unavatar.io',
    url: 'https://github.com/microlinkhq/unavatar',
    languages: [
      { color: '#f1e05a', name: 'JavaScript' },
      { color: '#663399', name: 'CSS' },
      { color: '#e34c26', name: 'HTML' },
    ],
    stargazerCount: 1247,
  },
  {
    name: 'myriad-dreamin/tinymist',
    description:
      'Tinymist [ˈtaɪni mɪst] is an integrated language service for Typst [taɪpst].',
    homepageUrl: 'https://myriad-dreamin.github.io/tinymist',
    url: 'https://github.com/Myriad-Dreamin/tinymist',
    languages: [
      { color: '#dea584', name: 'Rust' },
      { color: '#3178c6', name: 'TypeScript' },
      { color: '#239dad', name: 'Typst' },
    ],
    stargazerCount: 1081,
  },
  {
    name: 'lunatic-solutions/submillisecond',
    description: 'A lunatic web framework.',
    homepageUrl: 'https://github.com/lunatic-solutions/submillisecond',
    url: 'https://github.com/lunatic-solutions/submillisecond',
    languages: [{ color: '#dea584', name: 'Rust' }],
    stargazerCount: 912,
  },
  {
    name: 'olimorris/onedarkpro.nvim',
    description:
      "🎨 Atom's iconic One Dark theme. Cacheable, fully customisable, Tree-sitter and LSP semantic token support. Comes with variants",
    homepageUrl: '',
    url: 'https://github.com/olimorris/onedarkpro.nvim',
    languages: [
      { color: '#000080', name: 'Lua' },
      { color: '#1e4aec', name: 'Scheme' },
      { color: '#199f4b', name: 'Vim Script' },
    ],
    stargazerCount: 861,
  },
  {
    name: 'getsentry/sentry-rust',
    description: 'Official Sentry SDK for Rust',
    homepageUrl: 'https://sentry.io/',
    url: 'https://github.com/getsentry/sentry-rust',
    languages: [
      { color: '#dea584', name: 'Rust' },
      { color: '#427819', name: 'Makefile' },
      { color: '#89e051', name: 'Shell' },
    ],
    stargazerCount: 629,
  },
  {
    name: 'twitchdev/twitch-cli',
    description: 'The official Twitch CLI to make developing on Twitch easier.',
    homepageUrl: '',
    url: 'https://github.com/twitchdev/twitch-cli',
    languages: [
      { color: '#00ADD8', name: 'Go' },
      { color: '#427819', name: 'Makefile' },
      { color: '#384d54', name: 'Dockerfile' },
    ],
    stargazerCount: 618,
  },
  {
    name: 'cluelang/clue',
    description: 'C/Rust like programming language that compiles into Lua code',
    homepageUrl: 'https://crates.io/crates/clue',
    url: 'https://github.com/ClueLang/Clue',
    languages: [
      { color: '#dea584', name: 'Rust' },
      { color: '#000080', name: 'Lua' },
      { color: '#89e051', name: 'Shell' },
    ],
    stargazerCount: 343,
  },
  {
    name: 'mason-org/mason-registry',
    description: 'Core registry for mason.nvim.',
    homepageUrl: 'https://mason-registry.dev/registry/list',
    url: 'https://github.com/mason-org/mason-registry',
    languages: [],
    stargazerCount: 168,
  },
  {
    name: 'nvimtools/none-ls-extras.nvim',
    description:
      'Extra sources for none-ls.nvim. Not extensively tested, may be prone to break.',
    homepageUrl: '',
    url: 'https://github.com/nvimtools/none-ls-extras.nvim',
    languages: [
      { color: '#000080', name: 'Lua' },
      { color: '#427819', name: 'Makefile' },
    ],
    stargazerCount: 99,
  },
  {
    name: 'omnilib/ufmt',
    description: 'Safe, atomic formatting with black and µsort',
    homepageUrl: 'https://ufmt.omnilib.dev',
    url: 'https://github.com/omnilib/ufmt',
    languages: [
      { color: '#3572A5', name: 'Python' },
      { color: '#427819', name: 'Makefile' },
    ],
    stargazerCount: 98,
  },
  {
    name: 'gleam-lang/packages',
    description: '📦 Search for Gleam packages',
    homepageUrl: 'https://packages.gleam.run/',
    url: 'https://github.com/gleam-lang/packages',
    languages: [
      { color: '#ffaff3', name: 'Gleam' },
      { color: '#663399', name: 'CSS' },
      { color: '#B83998', name: 'Erlang' },
    ],
    stargazerCount: 84,
  },
  {
    name: 'byron/pulldown-cmark-to-cmark',
    description:
      'Convert pulldown-cmark Events back to the string they were parsed from',
    homepageUrl: 'https://docs.rs/crate/pulldown-cmark-to-cmark',
    url: 'https://github.com/Byron/pulldown-cmark-to-cmark',
    languages: [
      { color: '#dea584', name: 'Rust' },
      { color: '#89e051', name: 'Shell' },
      { color: '#427819', name: 'Makefile' },
    ],
    stargazerCount: 47,
  },
  {
    name: 'actechworld/vue-onboarding-tour',
    description:
      'VueOnboardingTour is a Vue.js component that creates guided, step-by-step onboarding tours to help users navigate your app intuitively.',
    homepageUrl: 'https://vueonboardingtour.actechworld.com/',
    url: 'https://github.com/acTechWorld/vue-onboarding-tour',
    languages: [
      { color: '#41b883', name: 'Vue' },
      { color: '#f1e05a', name: 'JavaScript' },
      { color: '#3178c6', name: 'TypeScript' },
    ],
    stargazerCount: 12,
  },
  {
    name: 'jdan/fizzbuzz-polyglot',
    description:
      'An experiment in writing FizzBuzz in every language, each with its own Docker container.',
    homepageUrl: 'https://github.com/jdan/fizzbuzz-polyglot',
    url: 'https://github.com/jdan/fizzbuzz-polyglot',
    languages: [{ color: '#000080', name: 'Lua' }],
    stargazerCount: 11,
  },
  {
    name: 'akiomik/mado',
    description: 'A fast Markdown linter written in Rust.',
    homepageUrl: '',
    url: 'https://github.com/akiomik/mado',
    languages: [
      { color: '#dea584', name: 'Rust' },
      { color: '#384d54', name: 'Just' },
      { color: '#89e051', name: 'Shell' },
    ],
    stargazerCount: 7,
  },
  {
    name: 'i18nhero/cli',
    description: 'Cli for easily managing your  i18nhero locale files ',
    homepageUrl: 'https://i18nhero.com',
    stargazerCount: 2,
    url: 'https://github.com/i18nhero/cli',
    languages: [
      { color: '#dea584', name: 'Rust' },
      { color: '#384d54', name: 'Just' },
    ],
  },
];
export default defineCachedEventHandler(
  async (event): Promise<Project[]> => {
    const config = useRuntimeConfig(event);

    const kvStore = new Redis({
      url: config.upstashRedisRestUrl,
      token: config.upstashRedisRestToken,
    });

    const cacheKey = 'github:contributions';

    const cached = await kvStore.get<string>(cacheKey).catch(() => undefined);

    if (cached) {
      setResponseHeader(event, 'content-type', 'application/json');
      setResponseHeader(event, 'x-redis-cache', 'hit');

      return cached as unknown as Project[];
    }

    const projects: Project[] = [];

    let cursor: string | null = null;

    const seenProjects = new Set<string>();

    do {
      const response: GithubContributedToResponse =
        await $fetch<GithubContributedToResponse>(
          'https://api.github.com/graphql',
          {
            method: 'POST',
            headers: {
              authorization: `Bearer ${config.githubApiKey}`,
              'user-agent': 'MadsHougesen +http://mhouge.dk',
            },
            body: {
              query: `{
                user(login: "hougesen") {
                  repositoriesContributedTo(
                    privacy: PUBLIC
                    first: 100
                    orderBy: {field: STARGAZERS, direction: DESC}
                    contributionTypes: [COMMIT]
                    includeUserRepositories: false
                  ) {
                    nodes {
                      ... on Repository {
                        name
                        nameWithOwner
                        description
                        homepageUrl
                        stargazerCount
                        url
                        languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
                          nodes {
                            color
                            name
                          }
                        }
                      }
                    }
                    pageInfo {
                      endCursor
                      hasNextPage
                    }
                  }
                }
              }`,
            },
          },
        );

      const repos = response?.data?.user?.repositoriesContributedTo?.nodes;

      if (Array.isArray(repos) && repos?.length) {
        for (const repo of repos) {
          const name = (repo?.nameWithOwner || repo?.name)?.toLowerCase();

          if (name && !seenProjects.has(name)) {
            projects.push({
              ...repo,
              name,
              languages: repo?.languages?.nodes ?? [],
              stargazerCount: repo?.stargazerCount ?? 0,
            });

            seenProjects.add(name);
          }
        }
      }

      if (
        !response?.data?.user?.repositoriesContributedTo?.pageInfo?.hasNextPage
      ) {
        break;
      }

      cursor =
        response?.data?.user?.repositoriesContributedTo?.pageInfo?.endCursor ||
        null;
    } while (cursor);

    for (const repo of hardcoded) {
      const name = repo?.name?.toLowerCase();

      if (!seenProjects.has(name) && !name.startsWith('kasperbnielsen/')) {
        projects.push({ ...repo, name });

        seenProjects.add(name);
      }
    }

    projects.sort((a, b) => {
      if (a?.stargazerCount === b?.stargazerCount) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      }

      return (b?.stargazerCount ?? 0) - (a?.stargazerCount ?? 0);
    });

    if (projects?.length) {
      kvStore
        .setex(cacheKey, REDIS_CACHE_DURATION, JSON.stringify(projects))
        .catch(() => undefined);
    }

    setResponseHeader(event, 'x-redis-cache', 'miss');

    return projects;
  },
  {
    maxAge: REQUEST_CACHE_DURATION,
  },
);
