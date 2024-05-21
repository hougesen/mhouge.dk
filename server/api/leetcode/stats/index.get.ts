import { Redis } from '@upstash/redis/cloudflare';

type LeetcodeResponse = {
  data: {
    matchedUser: {
      username: string;
      submitStats: {
        acSubmissionNum: [
          {
            difficulty: string;
            count: number;
            submissions: number;
          },
        ];
      };
    };
  };
};

type LeetcodeDifficuties = {
  all: {
    count: number;
    submissions: number;
  };
  easy: {
    count: number;
    submissions: number;
  };
  medium: {
    count: number;
    submissions: number;
  };
  hard: {
    count: number;
    submissions: number;
  };
};

export default defineCachedEventHandler(
  async (event): Promise<LeetcodeDifficuties> => {
    const config = useRuntimeConfig(event);

    const kvStore = new Redis({
      url: config.upstashRedisRestUrl,
      token: config.upstashRedisRestToken,
    });

    const cacheKey = 'leetcode:stats';

    const cached = await kvStore.get<string>(cacheKey).catch(() => undefined);

    if (cached) {
      setResponseHeader(event, 'content-type', 'application/json');
      setResponseHeader(event, 'x-redis-cache', 'hit');

      return cached as unknown as LeetcodeDifficuties;
    }

    const difficulties: LeetcodeDifficuties = {
      all: { count: 0, submissions: 0 },
      easy: { count: 0, submissions: 0 },
      medium: { count: 0, submissions: 0 },
      hard: { count: 0, submissions: 0 },
    };

    const response = await $fetch<LeetcodeResponse>(
      'https://leetcode.com/graphql',
      {
        method: 'POST',
        headers: {
          'user-agent': 'MadsHougesen +http://mhouge.dk',
        },
        body: {
          query: `{
              matchedUser(username: "hougesen") {
                username
                submitStats: submitStatsGlobal {
                  acSubmissionNum {
                    difficulty
                    count
                    submissions
                  }
                }
              }
            }`,
        },
      },
    );

    for (const stat of response?.data?.matchedUser?.submitStats
      ?.acSubmissionNum ?? []) {
      const difficulty = stat?.difficulty?.toLowerCase();

      switch (difficulty) {
        case 'all':
        case 'easy':
        case 'medium':
        case 'hard':
          difficulties[difficulty] = {
            count: stat.count,
            submissions: stat.submissions,
          };
          break;

        default:
          break;
      }
    }

    if (difficulties?.all?.count) {
      kvStore
        .setex(cacheKey, 14400, JSON.stringify(difficulties))
        .catch(() => undefined);
    }

    setResponseHeader(event, 'x-redis-cache', 'miss');

    return difficulties;
  },
  {
    maxAge: 14400,
  },
);
