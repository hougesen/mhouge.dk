export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const kvStore = event?.context?.cloudflare?.env?.KV_STORE;
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

  await kvStore.put('strava_access_token', response.access_token);

  await kvStore.put('strava_refresh_token', response.refresh_token);

  return {
    access_token: response.access_token,
  };
});
