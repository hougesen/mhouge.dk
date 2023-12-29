<script setup lang="ts">
import type { Project } from '~/github';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <div
    class="flex flex-col gap-1 rounded bg-white-secondary p-4 dark:bg-white-primary"
  >
    <a
      class="text-dark-primary text-xl font-semibold dark:text-black-primary"
      :href="project?.url ?? project?.homepageUrl ?? '#'"
      rel="noreferrer noopener"
      target="_blank"
      >{{ project.name }}</a
    >

    <p
      class="text-dark-secondary dark:text-black-primary"
      :class="{ 'mb-5': project?.languages?.length }"
    >
      {{ project.description }}
    </p>

    <div v-if="project?.languages?.length" class="mt-auto flex gap-2">
      <ProjectLanguage
        v-for="(language, languageIndex) of project?.languages ?? []"
        :key="languageIndex"
        :language="language"
      />
    </div>
  </div>
</template>
