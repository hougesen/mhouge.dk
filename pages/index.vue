<script setup lang="ts">
useHead({
  title: '',
});

useServerSeoMeta({
  title: '',
});

const { data: repositories } = useFetch('/api/github/repositories');

const { data: metrics } = useFetch('/api/wakatime');

const { data: navigation } = useAsyncData('navigation', () =>
  fetchContentNavigation().then(
    (dirs) =>
      dirs
        ?.find((dir) => dir?._path === '/blog')
        ?.children?.filter((post) => !post?._draft) || [],
  ),
);
</script>

<template>
  <div class="flex w-full flex-col gap-12 pb-8">
    <Hero :languages="metrics?.languages" />

    <Projects :projects="repositories || []" />

    <section v-if="navigation?.length" class="flex flex-col gap-4">
      <SectionTitle class="mb-4"> Thoughts </SectionTitle>

      <NuxtLink
        v-for="link of navigation"
        :key="link._path"
        class="transition-300 text-xl underline"
        :to="link._path"
        >{{ link.title }}</NuxtLink
      >
    </section>

    <Contact />
  </div>
</template>
