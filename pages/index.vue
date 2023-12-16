<script setup lang="ts">
const { data: repositories } = useFetch('/api/github/repositories');
</script>

<template>
  <div class="flex w-full flex-col gap-12 lowercase">
    <Hero />

    <Projects :projects="repositories || []" />

    <Contact />
  </div>
</template>
