<script setup lang="ts">
import type { WakatimeStatResponse } from '~/wakatime';

defineProps<{
  metrics: WakatimeStatResponse['data'];
}>();
</script>

<template>
  <section v-if="metrics?.languages?.length" class="flex flex-col gap-8">
    <SectionTitle>What am I up to?</SectionTitle>

    <p class="text-xl text-black-primary dark:text-white-primary">
      This week I have been writing a lot of
      {{ metrics?.languages?.[0]?.name ?? 'Rust' }} using
      {{ metrics?.editors?.[0]?.name ?? 'Neovim' }} on my machine running
      {{ metrics?.operating_systems?.[0]?.name ?? 'Linux' }}.
    </p>

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <Tile v-if="metrics?.languages?.length" class="mx-auto w-full">
        <ChartsBar :minimum-percent="0.5" :points="metrics?.languages ?? []" />
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
</template>
