<template>
  <ContentDoc>
    <template #not-found>
      <NotFound />
    </template>

    <template #default="{ doc }">
      <article
        class="prose mx-auto rounded-lg p-8 dark:prose-invert lg:prose-xl"
      >
        <h1>{{ doc.title }}</h1>

        <p class="font-medium">
          By Mads Hougesen<template v-if="doc['date created']?.length"
            >, {{ new Date(doc['date created']).toDateString() }}
          </template>
        </p>

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
