<script setup lang="ts">
const title = 'NPM packages';

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

const { data: packages } = useFetch('/api/npm/packages');
</script>

<template>
  <div class="flex w-full flex-col gap-12 pb-8">
    <NpmPackages :packages="packages ?? []" />
  </div>
</template>
