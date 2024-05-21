<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
  error: NuxtError;
}>();

useHead({
  meta: [{ name: 'robots', content: 'noindex' }],
});
</script>

<template>
  <div class="container mx-auto flex h-full min-h-screen flex-col px-8 py-4">
    <Navigation />

    <NotFound />

    <p class="mt-8 text-center">
      {{ error?.statusCode }} - {{ error?.message || error?.statusMessage }}
    </p>
  </div>
</template>
