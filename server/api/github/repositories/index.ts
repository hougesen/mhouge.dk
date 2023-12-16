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

export default defineEventHandler(async (event): Promise<Project[]> => {
  const config = useRuntimeConfig(event);

  const response = await $fetch<GithubReposoryResponse>(
    'https://api.github.com/graphql',
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${config.githubApiKey}`,
        'user-agent': 'MadsHougesen +http://yandex.com/bots',
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

  return (response?.data?.user?.pinnedItems?.nodes ?? []).map((p) => ({
    ...p,
    languages: p?.languages?.nodes ?? [],
  }));
});
