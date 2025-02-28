<script setup lang="ts">
const title = 'Rust packages';

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

const { data: crates } = useFetch('/api/cargo/packages');
</script>

<template>
  <div class="flex w-full flex-col gap-12 pb-8">
    <CargoCrates :crates="crates ?? []" />
  </div>
</template>
