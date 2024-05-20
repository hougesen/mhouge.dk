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
  <div class="flex w-full flex-col gap-12 pb-8">
    <CargoCrates :crates="crates ?? []" />
  </div>
</template>
