import { Redis } from '@upstash/redis/cloudflare';
import type { Project } from '~/github';

type GithubReposoryResponse = {
  data: {
    user: {
      pinnedItems: {
        nodes: Array<{
          description: string;
          homepageUrl: string;
          languages: { nodes: Array<{ color: string; name: string }> };
          name: string;
          url: string;
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
      }),
    );

    if (projects.length) {
      setResponseHeader(event, 'x-redis-cache', 'miss');

      kvStore
        .setex(cacheKey, 14400, JSON.stringify(projects))
        .catch(() => undefined);
    }

    return projects;
  },
  { maxAge: 14400 },
);
