<script setup lang="ts">
const title = 'Open Source contributions';

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
