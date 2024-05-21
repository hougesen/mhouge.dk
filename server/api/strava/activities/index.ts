import {
  type Sport,
  type SportActivity,
  type StravaActivity,
  pascalCaseToSpaces,
} from '~/strava';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const sports: Record<string, Sport> = {};

  const url = new URL('https://www.strava.com/api/v3/athlete/activities');

  url.searchParams.set('per_page', '100');

  let page = 1;

  const seenIds = new Set<StravaActivity['id']>();

  const currentTime = new Date();

  const weekStartDate = new Date(currentTime);

  weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay());

  weekStartDate.setHours(0, 0, 0, 0);

  while (page.toString() !== url.searchParams.get('page')) {
    url.searchParams.set('page', page.toString());

    const r = await $fetch<StravaActivity[]>(url.href, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.stravaBearerToken}`,
      },
    });

    if (r?.length) {
      page += 1;

      for (const activity of r) {
        if (seenIds.has(activity.id)) {
          continue;
        }
        seenIds.add(activity.id);

        const existingEntry = sports?.[activity.sport_type];

        const startTime = new Date(activity.start_date);

        const p: SportActivity = {
          date: startTime,
          distance: activity.distance,
          moving_time: activity?.moving_time,
          elapsed_time: activity?.elapsed_time,
        };

        const isThisYear =
          currentTime.getUTCFullYear() === startTime.getUTCFullYear();

        const isThisMonth =
          isThisYear && currentTime.getUTCMonth() === startTime.getUTCMonth();

        const isThisWeek = weekStartDate <= startTime;

        if (existingEntry) {
          existingEntry.total_moving_time += activity?.moving_time || 0;
          existingEntry.total_elapsed_time += activity?.elapsed_time || 0;
          existingEntry.total_distance += activity.distance || 0;

          if (isThisYear) {
            existingEntry.this_year_moving_time += activity?.moving_time || 0;
            existingEntry.this_year_elapsed_time += activity?.elapsed_time || 0;
            existingEntry.this_year_distance += activity.distance || 0;

            if (isThisMonth) {
              existingEntry.this_month_moving_time +=
                activity?.moving_time || 0;
              existingEntry.this_month_elapsed_time +=
                activity?.elapsed_time || 0;
              existingEntry.this_month_distance += activity.distance || 0;
            }
          }

          if (isThisWeek) {
            existingEntry.this_week_moving_time += activity?.moving_time || 0;
            existingEntry.this_week_elapsed_time += activity?.elapsed_time || 0;
            existingEntry.this_week_distance += activity.distance || 0;
          }

          existingEntry.activities.push(p);
        } else {
          sports[activity.sport_type] = {
            name: pascalCaseToSpaces(activity.sport_type),

            total_moving_time: activity?.moving_time || 0,
            total_elapsed_time: activity?.elapsed_time || 0,
            total_distance: activity.distance || 0,

            this_year_moving_time: isThisYear ? activity?.moving_time : 0,
            this_year_elapsed_time: isThisYear ? activity?.elapsed_time : 0,
            this_year_distance: isThisYear ? activity.distance : 0,

            this_month_moving_time: isThisMonth ? activity?.moving_time : 0,
            this_month_elapsed_time: isThisMonth ? activity?.elapsed_time : 0,
            this_month_distance: isThisMonth ? activity.distance : 0,

            this_week_moving_time: isThisWeek ? activity?.moving_time : 0,
            this_week_elapsed_time: isThisWeek ? activity?.elapsed_time : 0,
            this_week_distance: isThisWeek ? activity.distance : 0,

            activities: [p],
          };
        }
      }
    }
  }

  const s = Object.values(sports);

  s.sort((a, b) => b.total_elapsed_time - a.total_elapsed_time);

  for (const k of s) {
    k.activities.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  return s;
});
