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

export default defineEventHandler(
  async (event) => {
    const config = useRuntimeConfig(event);

    const repos: Project[] = [];

    let cursor: string | null = null;

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
      repos.push(
        ...((response?.data?.user?.repositoriesContributedTo?.nodes ?? []).map(
          (p) => ({
            ...p,
            name: p?.nameWithOwner || p?.name,
            languages: p?.languages?.nodes ?? [],
          }),
        ) || []),
      );

      cursor =
        response?.data?.user?.repositoriesContributedTo?.pageInfo?.endCursor ||
        null;
    } while (cursor);

    return repos;
  },
  // { maxAge: 14400 },
);
