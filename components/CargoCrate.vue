<script setup lang="ts">
import type { CargoPackage } from '~/cargo';

defineProps<{
  crate: CargoPackage;
}>();
</script>

<template>
  <div
    class="flex flex-col gap-1 rounded-sm bg-white-secondary p-4 dark:bg-white-primary"
  >
    <a
      class="text-dark-primary text-xl font-semibold dark:text-black-primary"
      :href="`https://crates.io/crates/${crate.name}`"
      rel="noreferrer noopener"
      target="_blank"
      >{{ crate.name }}</a
    >

    <p class="text-dark-secondary mb-5 dark:text-black-primary">
      {{ crate?.description ?? '' }}
    </p>

    <div class="mt-auto flex w-full items-center gap-4">
      <p
        v-if="crate?.downloads"
        class="mr-auto w-fit border p-1 text-sm font-medium dark:text-black-primary"
      >
        {{ crate?.downloads || 0 }} downloads
      </p>

      <a
        v-if="crate?.repository"
        :aria-label="`${crate.name} repository`"
        :href="crate?.repository"
      >
        <IconsGithub
          class="aspect-square size-6 rounded-sm bg-black-primary text-white-primary duration-300 hover:text-[color:var(--highlight)] dark:bg-white-primary dark:text-black-primary"
        />
      </a>
    </div>
  </div>
</template>
