<script setup lang="ts">
const { data: repositories } = useFetch('/api/github/repositories');

const { data: metrics } = useFetch('/api/wakatime');
</script>

<template>
  <div class="flex w-full flex-col gap-12 lowercase">
    <Hero :languages="metrics?.languages" />

    <Projects :projects="repositories || []" />

    <Contact />
  </div>
</template>
