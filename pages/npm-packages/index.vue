<script setup lang="ts">
useHead({
  title: 'NPM packages',
});

useServerSeoMeta({
  title: 'NPM packages',
});

const { data: packages } = useFetch('/api/npm/packages');
</script>

<template>
  <div class="flex w-full flex-col gap-12 pb-8">
    <NpmPackages :packages="packages ?? []" />
  </div>
</template>
