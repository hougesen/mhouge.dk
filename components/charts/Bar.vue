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

  let len = 0;

  for (const point of props?.points ?? []) {
    if (!props.minimumPercent || point.percent >= props.minimumPercent) {
      const name = `${point.name?.trim()} (${point.percent.toFixed(2)}%)`;

      points.push({ name, percent: point.percent });

      otherPercent -= point.percent;

      if (len < name.length) {
        len = name.length;
      }
    }
  }

  if (otherPercent > 0) {
    const name = `Other (${otherPercent.toFixed(2)}%)`;

    if (len < 5) len = 5;

    points.push({ name, percent: otherPercent });
  }

  return { points, len };
});
</script>

<template>
  <table>
    <tbody>
      <tr v-for="(point, pointIndex) of data.points" :key="pointIndex">
        <td
          class="whitespace-pre pr-4 text-right text-lg font-medium text-black dark:text-white"
        >
          <p class="min-w-[12.5rem]">
            {{ point.name }}
          </p>
        </td>

        <td class="w-full">
          <div
            class="h-[1.25rem] rounded border border-black bg-[color:var(--highlight)] duration-1000 dark:border-white"
            :style="{ width: `${point.percent}%` }"
          ></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
