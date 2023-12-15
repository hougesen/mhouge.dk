<script setup lang="ts">
import type { Language } from '~/types';

defineProps<{
  language: Language;
}>();
</script>

<template>
  <div
    class="px-2 py-1 rounded"
    :style="{
      backgroundColor: language?.Color || 'deeppink',
    }"
  >
    <p
      class="brightness-50 font-medium text-sm"
      :style="{
        color: language?.Color || 'deeppink',
      }"
    >
      {{ language.Name }}
    </p>
  </div>
</template>
