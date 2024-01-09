<script setup lang="ts">
const props = defineProps<{
  points: Array<{
    name: string;
    percent: number;
  }>;
  minimumPercent?: number;
}>();

const data = computed(() => {
  const points: Array<{ name: string; percent: number }> = [];

  let otherPercent = 100;

  for (const point of props?.points ?? []) {
    if (
      (!props.minimumPercent || point.percent >= props.minimumPercent) &&
      point?.name?.toLowerCase() !== 'other'
    ) {
      points.push({ name: point.name, percent: point.percent });

      otherPercent -= point.percent;
    }
  }

  if (otherPercent > 0) {
    points.push({ name: 'Other', percent: otherPercent });
  }

  return points;
});
</script>

<template>
  <table>
    <tbody>
      <tr v-for="(point, pointIndex) of data" :key="pointIndex">
        <td class="w-full md:hidden">
          <div
            class="h-[1.25rem] rounded border border-black-secondary bg-[color:var(--highlight)] duration-1000 dark:border-white-secondary"
            :style="{ width: `${point.percent}%` }"
          ></div>
        </td>

        <td
          class="whitespace-pre text-right text-lg font-medium text-black-primary md:pr-4 dark:text-white-primary"
        >
          <p class="min-w-[11.25rem] xl:min-w-fit">
            {{ point.name }} ({{ point.percent.toFixed(2) }}%)
          </p>
        </td>

        <td class="hidden w-full md:table-cell">
          <div
            class="h-[1.25rem] rounded border border-black-secondary bg-[color:var(--highlight)] duration-1000 dark:border-white-secondary"
            :style="{ width: `${point.percent}%` }"
          ></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
