<script setup lang="ts">
useHead({
  title: 'Open Source contributions this year',
});

useServerSeoMeta({
  title: 'Open Source contributions this year',
});

const { data: repositories } = useFetch('/api/github/contributions');
</script>

<template>
  <div>
    <Projects
      :projects="repositories ?? []"
      title="Open Source contributions this year"
    />
  </div>
</template>
