<script setup lang="ts">
import type { Language } from '~/github';

defineProps<{
  language: Language;
}>();

const customLanguageColors: Record<string, string> = {
  '': 'deeppink',
  lua: '#fff',
};
</script>

<template>
  <div
    class="rounded px-2 py-1"
    :language="language"
    :style="{
      backgroundColor: language?.color || 'deeppink',
    }"
  >
    <p
      class="text-sm font-medium brightness-50"
      :style="{
        color:
          customLanguageColors[language?.name?.toLowerCase() || ''] ||
          language?.color ||
          'deeppink',
      }"
    >
      {{ language.name }}
    </p>
  </div>
</template>
