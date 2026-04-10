<script setup lang="ts">
import type { Language } from '~~/github';

defineProps<{
  language: Language;
}>();
</script>

<template>
  <div class="flex gap-1" :language="language">
    <div
      class="w-2 rounded-full h-2 self-center"
      :style="{
        backgroundColor: language?.color ?? 'deeppink',
      }"
    ></div>

    <p class="text-sm">
      {{ language.name }}
    </p>
  </div>
</template>
