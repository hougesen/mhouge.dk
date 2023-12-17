<script setup lang="ts">
const { data: repositories } = useFetch('/api/github/repositories');

const { data: metrics } = useFetch('/api/wakatime');
</script>

<template>
  <div class="flex w-full flex-col gap-12 pb-8 lowercase">
    <Hero :languages="metrics?.languages" />

    <Projects :projects="repositories || []" />

    <section class="flex flex-col gap-8">
      <SectionTitle> Me as a Developer </SectionTitle>

      <div v-if="metrics?.languages?.length" class="flex w-full flex-col gap-4">
        <p class="text-xl text-black-primary dark:text-white-primary">
          Lately I have been writing a lot of
          {{ metrics?.languages?.[0]?.name ?? 'Rust' }}.
        </p>

        <Tile class="mx-auto w-full">
          <ChartsBar
            :minimum-percent="0.5"
            :points="metrics?.languages ?? []"
          />
        </Tile>
      </div>

      <div v-if="metrics?.editors?.length" class="flex w-full flex-col gap-4">
        <p class="text-xl text-black-primary dark:text-white-primary">
          Primarily using {{ metrics?.editors?.[0]?.name ?? 'neovim' }}.
        </p>

        <Tile class="mx-auto w-full">
          <ChartsBar :minimum-percent="0.5" :points="metrics?.editors ?? []" />
        </Tile>
      </div>

      <div
        v-if="metrics?.operating_systems?.length"
        class="flex w-full flex-col gap-4"
      >
        <p class="text-xl text-black-primary dark:text-white-primary">
          I pretty much only use {{ metrics?.operating_systems?.[0]?.name }}.
        </p>

        <Tile class="mx-auto w-full">
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
