<script setup lang="ts">
const baseTitle = 'Mads Hougesen | Software Developer';
const baseDescription =
  'Software developer from Denmark. Lover of all things programming - but  always learning new stuff.';
const baseOgImage = '/og-image.png';

const titleTemplate = (title?: string) => {
  if (title?.length) {
    return `${title} | Mads Hougesen`;
  }
  return baseTitle;
};

useServerSeoMeta({
  title: baseTitle,
  titleTemplate,
  author: 'Mads Hougesen',
  description: baseDescription,
  ogTitle: baseTitle,
  ogDescription: baseDescription,
  ogImage: baseOgImage,
  twitterCard: 'summary_large_image',
  twitterCreator: 'mads_hougesen',
  ogSiteName: 'Mads Hougesen',
});
</script>

<template>
  <div class="container mx-auto flex h-full min-h-screen flex-col px-8 py-4">
    <Navigation />

    <NuxtPage />
  </div>
</template>
