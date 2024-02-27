<script setup lang="ts">
import type { TocLink } from '@nuxt/content/types';

defineProps<{
  links?: TocLink[];
}>();
</script>

<template>
  <ul class="!m-auto">
    <li
      v-for="(link, linkIndex) in links ?? []"
      :key="link?.text ?? `${link?.depth}-${linkIndex}-${link?.text}`"
      class="!m-auto"
    >
      <a class="!text-base" :href="`#${link.id}`">
        {{ link.text }}
      </a>

      <TableOfContent v-if="link?.children" :links="link?.children ?? []" />
    </li>
  </ul>
</template>
