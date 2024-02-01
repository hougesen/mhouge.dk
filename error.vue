<script setup lang="ts">
useHead({
  meta: [{ name: 'robots', content: 'noindex' }],
});
</script>

<template>
  <div class="container mx-auto flex h-full min-h-screen flex-col px-8 py-4">
    <Navigation />

    <NotFound />
  </div>
</template>
