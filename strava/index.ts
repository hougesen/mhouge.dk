export function pascalCaseToSpaces(name: string) {
  const letters: string[] = [];

  for (const ch of name) {
    if (letters.length && ch === ch.toUpperCase()) {
      letters.push(' ');
    }

    letters.push(ch);
  }

  const joined = letters.join('').trim();

  return joined;
}

export function secondsToHHMMSS(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);

  const remainingSeconds = totalSeconds % 3600;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return `${hours}h:${minutes}m:${seconds}s`;
}

export type SportActivity = {
  date: Date;
  distance: number;
  moving_time: number;
  elapsed_time: number;
};

export type Sport = {
  name: string;

  total_moving_time: number;
  total_elapsed_time: number;
  total_distance: number;

  this_year_moving_time: number;
  this_year_elapsed_time: number;
  this_year_distance: number;

  this_month_moving_time: number;
  this_month_elapsed_time: number;
  this_month_distance: number;

  this_week_moving_time: number;
  this_week_elapsed_time: number;
  this_week_distance: number;

  activities: Array<SportActivity>;
};

export type StravaActivity = {
  achievement_count: number;
  athlete: { id: number; resource_state: number };
  athlete_count: number;
  average_cadence: number;
  average_heartrate: number;
  average_speed: number;
  average_watts: number;
  comment_count: number;
  commute: boolean;
  device_watts: boolean;
  distance: number;
  elapsed_time: number;
  end_latlng: null;
  external_id: string;
  flagged: boolean;
  from_accepted_tag: boolean;
  gear_id: string;
  has_heartrate: boolean;
  has_kudoed: boolean;
  id: number;
  kilojoules: number;
  kudos_count: number;
  location_city: null;
  location_country: string;
  location_state: null;
  manual: boolean;
  map: { id: string; resource_state: number; summary_polyline: null };
  max_heartrate: number;
  max_speed: number;
  max_watts: number;
  moving_time: number;
  name: string;
  photo_count: number;
  pr_count: number;
  private: boolean;
  resource_state: number;
  sport_type: string;
  start_date: string;
  start_date_local: string;
  start_latlng: null;
  suffer_score: number;
  timezone: string;
  total_elevation_gain: number;
  total_photo_count: number;
  trainer: boolean;
  type: string;
  upload_id: number;
  utc_offset: number;
  weighted_average_watts: number;
  workout_type: null;
};
