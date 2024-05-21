import { Redis } from 'ioredis';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const kvStore = new Redis(config.redisUrl);
  if (!kvStore) {
    throw new Error('Kv store is undefined');
  }

  const refreshToken = await kvStore.get('strava_refresh_token');
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

  await kvStore.set('strava_access_token', response.access_token);

  await kvStore.set('strava_refresh_token', response.refresh_token);

  return {
    access_token: response.access_token,
  };
});
