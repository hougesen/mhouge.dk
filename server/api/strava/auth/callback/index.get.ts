import { Redis } from '@upstash/redis/cloudflare';

type StravaAuthResponse = {
  access_token: string;
  athlete: {
    badge_type_id: number;
    bio: null;
    city: string;
    country: string;
    created_at: string;
    firstname: string;
    follower: null;
    friend: null;
    id: number;
    lastname: string;
    premium: boolean;
    profile: string;
    profile_medium: string;
    resource_state: number;
    sex: string;
    state: string;
    summit: boolean;
    updated_at: string;
    username: string;
    weight: number;
  };
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};

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

  const response = await $fetch<StravaAuthResponse>(tokenUrl.href, {
    method: 'POST',
  });

  if (response?.athlete?.id === 48254750) {
    const kvStore = new Redis({
      url: config.upstashRedisRestUrl,
      token: config.upstashRedisRestToken,
    });

    await kvStore.mset({
      'strava:access_token': response.access_token,
      'strava:refresh_token': response.refresh_token,
    });
  }
});
