<script setup lang="ts">
import type { GithubUser } from '~/github';

const { data: user } = useFetch<GithubUser>(
  'https://gcjx2rjj1j.execute-api.eu-central-1.amazonaws.com/default/fetchGithubUser',
);
</script>

<template>
  <div class="flex w-full flex-col gap-12 lowercase">
    <Hero />

    <Projects :projects="user?.Repositories ?? []" />

    <Contact />
  </div>
</template>
