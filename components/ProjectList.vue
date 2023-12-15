<script setup lang="ts">
import type { Project } from '~/types';

defineProps<{
  projects: Project[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <Project
      v-for="(project, projectIndex) of projects"
      :key="projectIndex"
      :project="project"
    />
  </div>
</template>
