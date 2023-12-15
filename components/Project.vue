<script setup lang="ts">
import type { Project } from '~/types';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="rounded dark:bg-white bg-black p-4 flex flex-col gap-1">
    <a
      target="_blank"
      rel="noreferrer noopener"
      :href="project?.GithubUrl ?? project?.HomepageUrl ?? '#'"
      class="text-white dark:text-black font-medium text-xl font-semibold"
      >{{ project.Name }}</a
    >

    <p
      class="text-white dark:text-black font-medium text-base"
      :class="{ 'mb-5': project?.Languages?.length }"
    >
      {{ project.Description }}
    </p>

    <div class="flex gap-2 mt-auto" v-if="project?.Languages?.length">
      <ProjectLanguage
        v-for="(language, languageIndex) of project.Languages"
        :key="languageIndex"
        :language="language"
      />
    </div>
  </div>
</template>
