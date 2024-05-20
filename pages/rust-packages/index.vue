<script setup lang="ts">
useHead({
  title: 'Rust packages',
});

useServerSeoMeta({
  title: 'Rust packages',
});

const { data: crates } = useFetch('/api/cargo/packages');
</script>

<template>
  <div>
    <CargoCrates :crates="crates ?? []" />
  </div>
</template>
