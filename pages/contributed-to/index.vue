<script setup lang="ts">
useHead({
  title: 'Open Source contributions',
});

useServerSeoMeta({
  title: 'Open Source contributions',
});

const { data: repositories } = useFetch('/api/github/contributions');
</script>

<template>
  <div>
    <Projects
      :projects="repositories ?? []"
      title="Open Source contributions"
    />
  </div>
</template>
