import { Redis } from '@upstash/redis/cloudflare';
import type { NpmPackage } from '~/npm';

type NpmResponse = {
  objects: Array<NpmPackage>;
  time: string;
  total: number;
};

export default defineCachedEventHandler(
  async (event): Promise<NpmPackage[]> => {
    const config = useRuntimeConfig(event);

    const kvStore = new Redis({
      url: config.upstashRedisRestUrl,
      token: config.upstashRedisRestToken,
    });

    const cacheKey = 'npm:packages';

    const cached = await kvStore.get<string>(cacheKey).catch(() => undefined);

    if (cached) {
      setResponseHeader(event, 'content-type', 'application/json');
      setResponseHeader(event, 'x-redis-cache', 'hit');

      return cached as unknown as NpmPackage[];
    }

    const packages: NpmPackage[] = [];

    const url =
      'https://registry.npmjs.org/-/v1/search?text=maintainer:hougesen&size=20';

    const response = await $fetch<NpmResponse>(url, {
      method: 'GET',
      headers: {
        'user-agent': 'MadsHougesen +http://mhouge.dk',
      },
    });

    if (response?.objects && Array.isArray(response.objects)) {
      packages.push(
        ...(response.objects ?? []).filter(
          (pkg) => pkg?.package?.publisher?.username === 'hougesen',
        ),
      );
    }

    if (packages.length) {
      kvStore
        .setex(cacheKey, 14400, JSON.stringify(packages))
        .catch(() => undefined);
    }

    setResponseHeader(event, 'x-redis-cache', 'miss');

    return packages;
  },
  {
    maxAge: 14400,
  },
);
