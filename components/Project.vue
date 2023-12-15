<script setup lang="ts">
import type { Project } from '~/github';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="flex flex-col gap-1 rounded bg-black p-4 dark:bg-white">
    <a
      class="text-xl font-semibold text-white dark:text-black"
      :href="project?.GithubUrl ?? project?.HomepageUrl ?? '#'"
      rel="noreferrer noopener"
      target="_blank"
      >{{ project.Name }}</a
    >

    <p
      class="text-base font-medium text-white dark:text-black"
      :class="{ 'mb-5': project?.Languages?.length }"
    >
      {{ project.Description }}
    </p>

    <div v-if="project?.Languages?.length" class="mt-auto flex gap-2">
      <div
        v-for="(language, languageIndex) of project?.Languages ?? []"
        :key="languageIndex"
        class="rounded px-2 py-1"
        :language="language"
        :style="{
          backgroundColor: language?.Color || 'deeppink',
        }"
      >
        <p
          class="text-sm font-medium brightness-50"
          :style="{
            color: language?.Color || 'deeppink',
          }"
        >
          {{ language.Name }}
        </p>
      </div>
    </div>
  </div>
</template>
