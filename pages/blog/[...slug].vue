<template>
  <ContentDoc>
    <template #not-found>
      <NotFound />
    </template>

    <template #default="{ doc }">
      <article
        class="prose mx-auto rounded-lg p-8 lg:prose-xl dark:prose-invert"
      >
        <h1>{{ doc.title }}</h1>

        <p class="font-medium">
          By Mads Hougesen<template v-if="doc['date created']?.length"
            >, {{ new Date(doc['date created']).toDateString() }}
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
  </ContentDoc>
</template>

<style>
img {
  @apply rounded;
}
</style>
