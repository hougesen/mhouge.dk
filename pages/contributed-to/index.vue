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
  <div class="flex w-full flex-col gap-12 pb-8">
    <Projects
      :projects="repositories ?? []"
      title="Open Source contributions"
    />
  </div>
</template>
