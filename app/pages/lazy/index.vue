<script setup lang="ts">
import { secondsToHHMMSS } from '~~/strava';

const title = 'Has Mads been lazy this week?';

useHead({
  title,
});

useServerHead({
  title,
});

useSeoMeta({
  title,
});

useServerSeoMeta({
  title,
});

const { data: sports } = useFetch('/api/strava/activities');

const totalMinutes = computed(() => {
  let m = 0;

  for (const sport of Object.values(sports ?? {})) {
    m += sport?.this_week_elapsed_time || 0;
  }

  return m / 60;
});
</script>

<template>
  <div class="flex w-full flex-col gap-12 pb-8">
    <SectionTitle>
      Has Mads been lazy this week? {{ totalMinutes < 60 * 7 ? 'Yes!' : 'No!' }}
    </SectionTitle>

    <section
      v-for="(sport, sportIndex) of sports"
      :key="sportIndex"
      class="flex flex-col gap-4"
    >
      <SectionTitle class="capitalize">{{ sport.name }}</SectionTitle>

      <KPIGrid>
        <KPI
          label="Total time"
          :value="secondsToHHMMSS(sport.total_elapsed_time)"
        />

        <KPI
          label="Time this year"
          :value="secondsToHHMMSS(sport.this_year_elapsed_time)"
        />

        <KPI
          label="Time this month"
          :value="secondsToHHMMSS(sport.this_month_elapsed_time)"
        />

        <KPI
          label="Time this week"
          :value="secondsToHHMMSS(sport.this_week_elapsed_time)"
        />

        <KPI
          v-if="sport?.total_distance"
          label="Total distance"
          :value="`${
            sport?.total_distance ? Math.floor(sport?.total_distance / 1000) : 0
          }km`"
        />

        <KPI
          v-if="sport?.total_distance"
          label="Distance this year"
          :value="`${
            sport?.this_year_distance
              ? Math.floor(sport?.this_year_distance / 1000)
              : 0
          }km`"
        />

        <KPI
          v-if="sport?.total_distance"
          label="Distance this month"
          :value="`${
            sport?.this_month_distance
              ? Math.floor(sport?.this_month_distance / 1000)
              : 0
          }km`"
        />

        <KPI
          v-if="sport?.total_distance"
          label="Distance this week"
          :value="`${
            sport?.this_week_distance
              ? Math.floor(sport?.this_week_distance / 1000)
              : 0
          }km`"
        />
      </KPIGrid>
    </section>
  </div>
</template>
