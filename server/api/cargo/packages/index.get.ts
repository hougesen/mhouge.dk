import { Redis } from '@upstash/redis/cloudflare';
import { REDIS_CACHE_DURATION, REQUEST_CACHE_DURATION } from '~/caching';
import type { CargoPackage } from '~/cargo';

type CargoResponse = {
  crates: Array<CargoPackage> | null;
  meta: {
    next_page: string | null;
    prev_page: null;
    total: number;
  };
};

export default defineCachedEventHandler(
  async (event): Promise<CargoPackage[]> => {
    const config = useRuntimeConfig(event);

    const kvStore = new Redis({
      url: config.upstashRedisRestUrl,
      token: config.upstashRedisRestToken,
    });

    const cacheKey = 'cargo:packages';

    const cached = await kvStore.get<string>(cacheKey).catch(() => undefined);

    if (cached) {
      setResponseHeader(event, 'content-type', 'application/json');
      setResponseHeader(event, 'x-redis-cache', 'hit');

      return cached as unknown as CargoPackage[];
    }

    const packages: CargoPackage[] = [];

    let url: string | null =
      'https://crates.io/api/v1/crates?page=1&per_page=10&sort=alpha&user_id=178342';

    do {
      const response: CargoResponse = await $fetch<CargoResponse>(url, {
        method: 'GET',
        headers: {
          'user-agent': 'MadsHougesen +http://mhouge.dk',
        },
      });

      if (response?.crates && Array.isArray(response.crates)) {
        packages.push(...(response.crates ?? []));
      }

      url = response?.meta?.next_page;
    } while (url);

    packages.sort((a, b) => b.downloads - a.downloads);

    if (packages?.length) {
      kvStore
        .setex(cacheKey, REDIS_CACHE_DURATION, JSON.stringify(packages))
        .catch(() => undefined);
    }

    setResponseHeader(event, 'x-redis-cache', 'miss');

    return packages;
  },
  {
    maxAge: REQUEST_CACHE_DURATION,
  },
);
