<script setup lang="ts">
const title = '';

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

const { data: repositories } = useFetch('/api/github/repositories');

const { data: metrics } = useFetch('/api/wakatime');
</script>

<template>
  <div class="flex w-full flex-col gap-12 pb-8">
    <Hero :languages="metrics?.languages" />

    <Projects :projects="repositories || []" />

    <BlogPosts />

    <Contact />
  </div>
</template>
