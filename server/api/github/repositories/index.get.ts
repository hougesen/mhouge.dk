import { Redis } from '@upstash/redis/cloudflare';
import { REDIS_CACHE_DURATION, REQUEST_CACHE_DURATION } from '~/caching';
import type { Project } from '~/github';

type GithubReposoryResponse = {
  data: {
    user: {
      pinnedItems: {
        nodes: Array<{
          description: string | null;
          homepageUrl: string | null;
          languages: { nodes: Array<{ color: string; name: string }> };
          name: string;
          url: string | null;
          stargazerCount: number;
        }>;
      };
    };
  };
};

export default defineCachedEventHandler(
  async (event): Promise<Project[]> => {
    const config = useRuntimeConfig(event);

    const kvStore = new Redis({
      url: config.upstashRedisRestUrl,
      token: config.upstashRedisRestToken,
    });

    const cacheKey = 'github:repositories';

    const cached = await kvStore.get<string>(cacheKey).catch(() => undefined);

    if (cached) {
      setResponseHeader(event, 'content-type', 'application/json');
      setResponseHeader(event, 'x-redis-cache', 'hit');

      return cached as unknown as Project[];
    }

    const response = await $fetch<GithubReposoryResponse>(
      'https://api.github.com/graphql',
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${config.githubApiKey}`,
          'user-agent': 'MadsHougesen +http://mhouge.dk',
        },
        body: {
          query: `
            query GET_PROJECTS {
              user(login: "hougesen") {
                pinnedItems(first: 6) {
                  nodes {
                    ... on Repository {
                      name
                      languages(
                        first: 3
                        orderBy: { field: SIZE, direction: DESC }
                      ) {
                        nodes {
                          color
                          name
                        }
                      }
                      description
                      homepageUrl
                      url
                    }
                  }
                }
              }
            }
          `,
        },
      },
    );

    const projects = (response?.data?.user?.pinnedItems?.nodes ?? []).map(
      (p) => ({
        ...p,
        languages: p?.languages?.nodes ?? [],
        description: p?.description ?? '',
        homepageUrl: p?.homepageUrl ?? '',
        url: p?.url ?? '',
        stargazerCount: p?.stargazerCount ?? 0,
      }),
    );

    if (projects.length) {
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
