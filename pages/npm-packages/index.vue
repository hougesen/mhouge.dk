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
  <div>
    <NpmPackages :packages="packages ?? []" />
  </div>
</template>
