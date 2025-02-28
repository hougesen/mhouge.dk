<script setup lang="ts">
const { data: list } = await useAsyncData('blog-posts', () =>
  queryCollectionNavigation('content', ['path', 'title', 'date_created'])
    .order('date_created', 'DESC')
    .then((docs) => docs?.find((d) => d.path === '/blog')?.children ?? []),
);
</script>

<template>
  <section v-if="list?.length" class="flex flex-col gap-4">
    <SectionTitle class="mb-4"> Thoughts </SectionTitle>

    <NuxtLink
      v-for="link in list"
      :key="link.path"
      class="transition-300 text-xl underline"
      :to="link.path"
      >{{ link.title }}</NuxtLink
    >
  </section>
</template>
