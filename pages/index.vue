<script setup lang="ts">
const { data: repositories } = useFetch('/api/github/repositories');

const { data: metrics } = useFetch('/api/wakatime');

const { data: navigation } = await useAsyncData('navigation', () =>
  fetchContentNavigation().then(
    (dirs) =>
      dirs
        ?.find((dir) => dir._path === '/blog')
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

    <section v-if="metrics?.languages?.length" class="flex flex-col gap-8">
      <SectionTitle> What am I up to? </SectionTitle>

      <p class="text-xl text-black-primary dark:text-white-primary">
        This week I have been writing a lot of
        {{ metrics?.languages?.[0]?.name ?? 'Rust' }} using
        {{ metrics?.editors?.[0]?.name ?? 'Neovim' }} on my machine running
        {{ metrics?.operating_systems?.[0]?.name ?? 'Linux' }}.
      </p>

      <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Tile v-if="metrics?.languages?.length" class="mx-auto w-full">
          <ChartsBar
            :minimum-percent="0.5"
            :points="metrics?.languages ?? []"
          />
        </Tile>

        <Tile v-if="metrics?.editors?.length" class="mx-auto w-full">
          <ChartsBar :minimum-percent="0.5" :points="metrics?.editors ?? []" />
        </Tile>

        <Tile v-if="metrics?.operating_systems?.length" class="mx-auto w-full">
          <ChartsBar
            :minimum-percent="0.5"
            :points="metrics?.operating_systems ?? []"
          />
        </Tile>
      </div>
    </section>

    <Contact />
  </div>
</template>
