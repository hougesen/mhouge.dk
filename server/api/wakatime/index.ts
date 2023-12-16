import type { WakatimeStatResponse } from '~/wakatime';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const response = await $fetch<WakatimeStatResponse>(
    'https://wakatime.com/api/v1/users/current/stats',
    {
      headers: {
        authorization: `Basic ${Buffer.from(config.wakatimeApiKey).toString(
          'base64',
        )}`,
      },
    },
  );

  return response?.data;
});
