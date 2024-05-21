export default defineEventHandler(async (event) => {
  const inputUrl = getRequestURL(event);

  const config = useRuntimeConfig(event);

  const code = inputUrl.searchParams.get('code');

  if (typeof code !== 'string') {
    throw new TypeError('Code is not set');
  }

  const tokenUrl = new URL('https://www.strava.com/oauth/token');

  tokenUrl.searchParams.set('code', code);
  tokenUrl.searchParams.set('grant_type', 'authorization_code');
  tokenUrl.searchParams.set('client_id', config.stravaClientId);
  tokenUrl.searchParams.set('client_secret', config.stravaClientSecret);

  const response = await $fetch(tokenUrl.href, { method: 'POST' });

  return response;
});
