<script setup lang="ts">
import type { GithubUser } from '~/types';

const { data: user } = useFetch<GithubUser>(
  'https://gcjx2rjj1j.execute-api.eu-central-1.amazonaws.com/default/fetchGithubUser',
);
</script>

<template>
  <div class="w-full">
    <section v-if="user?.Repositories?.length">
      <h2>Projects</h2>

      <ProjectList :projects="user?.Repositories ?? []" />
    </section>
  </div>
</template>
