<script setup lang="ts">
import type { Project } from '~~/github';

defineProps<{
  title?: string;
  projects: Project[];
}>();
</script>

<template>
  <section v-if="projects?.length" id="projects" class="flex flex-col gap-8">
    <SectionTitle>{{ title || 'Projects' }}</SectionTitle>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <Project
        v-for="(project, projectIndex) of projects"
        :key="projectIndex"
        :project="project"
      />
    </div>
  </section>
</template>
