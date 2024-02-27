<script setup lang="ts">
import type { TocLink } from '@nuxt/content/types';

defineProps<{
  links?: TocLink[];
}>();
</script>

<template>
  <ul class="!m-auto">
    <li v-for="link in links ?? []" :key="link.text" class="!m-auto">
      <a :href="`#${link.id}`" class="!text-base">
        {{ link.text }}
      </a>

      <TableOfContent v-if="link?.children" :links="link?.children ?? []" />
    </li>
  </ul>
</template>
