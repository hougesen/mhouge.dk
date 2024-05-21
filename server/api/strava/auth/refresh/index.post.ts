import { Redis } from '@upstash/redis/cloudflare';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const kvStore = new Redis({
    url: config.upstashRedisRestUrl,
    token: config.upstashRedisRestToken,
  });

  const refreshToken = await kvStore.get<string>('strava:refresh_token');
  if (!refreshToken) {
    throw new Error('Refresh token is undefined');
  }

  const url = new URL('https://www.strava.com/oauth/token');

  url.searchParams.set('client_id', config.stravaClientId);
  url.searchParams.set('client_secret', config.stravaClientSecret);
  url.searchParams.set('grant_type', 'refresh_token');
  url.searchParams.set('refresh_token', refreshToken);

  const response = await $fetch<{
    access_token: string;
    refresh_token: string;
  }>(url.href, { method: 'POST' });

  await kvStore.mset({
    'strava:access_token': response.access_token,
    'strava:refresh_token': response.refresh_token,
  });

  return {
    access_token: response.access_token,
  };
});
