<script setup lang="ts">
useHead({
  title: '',
});

useServerSeoMeta({
  title: '',
});

const { data: repositories } = useFetch('/api/github/repositories');

const { data: metrics } = useFetch('/api/wakatime');
</script>

<template>
  <div class="flex w-full flex-col gap-12 pb-8">
    <Hero :languages="metrics?.languages" />

    <Projects :projects="repositories || []" />

    <ContentList v-slot="{ list }" path="/blog">
      <section v-show="list?.length" class="flex flex-col gap-4">
        <SectionTitle class="mb-4"> Thoughts </SectionTitle>

        <NuxtLink
          v-for="link in list"
          :key="link._path"
          class="transition-300 text-xl underline"
          :to="link._path"
          >{{ link.title }}</NuxtLink
        >
      </section>
    </ContentList>

    <Contact />
  </div>
</template>
