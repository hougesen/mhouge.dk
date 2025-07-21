import { Redis } from '@upstash/redis/cloudflare';
import { REDIS_CACHE_DURATION, REQUEST_CACHE_DURATION } from '~~/caching';
import type { WakatimeStatResponse } from '~~/wakatime';

export default defineCachedEventHandler(
  async (event): Promise<WakatimeStatResponse['data']> => {
    const config = useRuntimeConfig(event);

    const kvStore = new Redis({
      url: config.upstashRedisRestUrl,
      token: config.upstashRedisRestToken,
    });

    const cacheKey = 'wakatime:stats';

    const cached = await kvStore.get<string>(cacheKey).catch(() => undefined);

    if (cached) {
      setResponseHeader(event, 'content-type', 'application/json');
      setResponseHeader(event, 'x-redis-cache', 'hit');

      return cached as unknown as WakatimeStatResponse['data'];
    }

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

    const stats = response?.data;

    if (stats) {
      kvStore
        .setex(cacheKey, REDIS_CACHE_DURATION, JSON.stringify(stats))
        .catch(() => undefined);
    }

    setResponseHeader(event, 'x-redis-cache', 'miss');

    return stats;
  },
  {
    maxAge: REQUEST_CACHE_DURATION,
  },
);
