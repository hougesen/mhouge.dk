import { Redis } from '@upstash/redis/cloudflare';
import { REDIS_CACHE_DURATION, REQUEST_CACHE_DURATION } from '~/caching';
import type { Project } from '~/github';

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
    languages: [{ color: '#ffc200', name: 'Nim' }],
  },
  {
    name: 'raphamorim/rio',
    description:
      'A hardware-accelerated GPU terminal emulator focusing to run in desktops and browsers.',
    homepageUrl: 'https://raphamorim.io/rio',
    url: 'https://github.com/raphamorim/rio',
    languages: [{ color: '#dea584', name: 'Rust' }],
  },
  {
    name: 'stevearc/conform.nvim',
    description: 'Lightweight yet powerful formatter plugin for Neovim',
    homepageUrl: '',
    url: 'https://github.com/stevearc/conform.nvim',
    languages: [
      { color: '#000080', name: 'Lua' },
      { color: '#3572A5', name: 'Python' },
      { color: '#89e051', name: 'Shell' },
    ],
  },
  {
    name: 'mundimark/awesome-markdown',
    description:
      'A collection of awesome markdown goodies (libraries, services, editors, tools, cheatsheets, etc.)',
    homepageUrl: '',
    url: 'https://github.com/mundimark/awesome-markdown',
    languages: [],
  },
  {
    name: 'olimorris/onedarkpro.nvim',
    description:
      "🎨 Atom's iconic One Dark theme. Cacheable, fully customisable, Tree-sitter and LSP semantic token support. Comes with variants",
    homepageUrl: '',
    url: 'https://github.com/olimorris/onedarkpro.nvim',
    languages: [
      { color: '#000080', name: 'Lua' },
      { color: '#199f4b', name: 'Vim Script' },
      { color: '#1e4aec', name: 'Scheme' },
    ],
  },
  {
    name: 'byron/pulldown-cmark-to-cmark',
    description:
      'Convert pulldown-cmark Events back to the string they were parsed from',
    homepageUrl: 'https://docs.rs/crate/pulldown-cmark-to-cmark',
    url: 'https://github.com/Byron/pulldown-cmark-to-cmark',
    languages: [{ color: '#dea584', name: 'Rust' }],
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
  },
  {
    name: 'lunatic-solutions/submillisecond',
    description: 'A lunatic web framework.',
    homepageUrl: 'https://github.com/lunatic-solutions/submillisecond',
    url: 'https://github.com/lunatic-solutions/submillisecond',
    languages: [{ color: '#dea584', name: 'Rust' }],
  },
  {
    name: 'jdan/fizzbuzz-polyglot',
    description:
      'An experiment in writing FizzBuzz in every language, each with its own Docker container.',
    homepageUrl: 'https://github.com/jdan/fizzbuzz-polyglot',
    url: 'https://github.com/jdan/fizzbuzz-polyglot',
    languages: [{ color: '#000080', name: 'Lua' }],
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

      if (!seenProjects.has(name)) {
        projects.push({ ...repo, name });

        seenProjects.add(name);
      }
    }

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
