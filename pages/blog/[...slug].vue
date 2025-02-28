<script setup lang="ts">
const route = useRoute();

const { data: doc } = await useAsyncData(route.path, () =>
  queryCollection('content').path(route.path).first(),
);

const dates = computed(() => {
  const created = doc?.value?.date_created;
  const modified = doc?.value?.date_modified;

  return {
    created: created ? new Date(created) : null,
    modified: modified ? new Date(modified) : null,
  };
});

useHead({
  title: doc.value?.title,
});

useServerHead({
  title: doc.value?.title,
});

useSeoMeta({
  author: 'Mads Hougesen',
  description: doc.value?.description,
  ogDescription: doc.value?.description,
  ogTitle: doc.value?.title,
  ogType: 'article',
  title: doc.value?.title,
  twitterDescription: doc.value?.description,
  twitterTitle: doc.value?.title,
});

useServerSeoMeta({
  author: 'Mads Hougesen',
  description: doc.value?.description,
  ogDescription: doc.value?.description,
  ogTitle: doc.value?.title,
  ogType: 'article',
  title: doc.value?.title,
  twitterDescription: doc.value?.description,
  twitterTitle: doc.value?.title,
});
</script>

<template>
  <div class="flex size-full flex-col">
    <template v-if="doc">
      <article
        class="prose mx-auto rounded-lg p-8 lg:prose-xl dark:prose-invert"
      >
        <h1>{{ doc.title }}</h1>

        <p class="font-medium">
          By Mads Hougesen<template v-if="dates?.created"
            >, {{ dates?.created?.toDateString() }}
          </template>
        </p>

        <h3 v-if="doc?.body?.toc?.links?.length">Contents</h3>

        <TableOfContent
          v-if="doc?.body?.toc?.links?.length"
          :links="doc?.body?.toc?.links ?? []"
        />

        <ContentRenderer :value="doc" />
      </article>

      <NuxtLink
        class="mx-auto text-center font-bold text-black-secondary dark:text-white-secondary"
        to="/"
        >Back home</NuxtLink
      >
    </template>

    <template v-else>
      <NotFound />
    </template>
  </div>
</template>

<style>
img {
  border-radius: var(--radius-sm);
}
</style>
