<script setup lang="ts">
defineProps<{
  label: string;
  value: number | string;
}>();
</script>

<template>
  <Tile>
    <p
      class="text-primary-base mb-auto text-4xl font-semibold transition-all duration-200"
    >
      {{ value }}
    </p>

    <p class="mt-4">
      {{ label }}
    </p>
  </Tile>
</template>
