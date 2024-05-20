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

export default defineCachedEventHandler(
  async (_event) => {
    const difficulties = {
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

    return difficulties;
  },
  {
    maxAge: 14400,
  },
);
