<script setup lang="ts">
import type { NpmPackage } from '~/npm';

defineProps<{
  pkg: NpmPackage;
}>();
</script>

<template>
  <div
    v-if="pkg?.package?.name"
    class="flex flex-col gap-1 rounded-sm bg-white-secondary p-4 dark:bg-white-primary"
  >
    <a
      class="text-dark-primary text-xl font-semibold dark:text-black-primary"
      :href="pkg.package.links.npm"
      rel="noreferrer noopener"
      target="_blank"
      >{{ pkg?.package?.name }}</a
    >

    <p class="text-dark-secondary mb-5 dark:text-black-primary">
      {{ pkg?.package?.description ?? '' }}
    </p>

    <div class="mt-auto flex w-full items-center gap-4">
      <a
        v-if="pkg?.package.links?.repository"
        :aria-label="`${pkg.package.name} repository`"
        :href="pkg?.package?.links?.repository"
      >
        <IconsGithub
          class="ml-auto aspect-square size-6 rounded-sm bg-black-primary text-white-primary duration-300 hover:text-[color:var(--highlight)] dark:bg-white-primary dark:text-black-primary"
        />
      </a>
    </div>
  </div>
</template>
