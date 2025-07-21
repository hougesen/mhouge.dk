<script setup lang="ts">
const baseTitle = 'Mads Hougesen | Software Developer';
const baseDescription =
  'Software developer from Denmark. Lover of all things programming - but  always learning new stuff.';
const baseOgImage = '/og-image.png';
const ogType = 'website';
const author = 'Mads Hougesen';
const ogSiteName = 'Mads Hougesen';
const twitterCard = 'summary_large_image';
const twitterCreator = 'mads_hougesen';
const twitterSite = '@mads_hougesen';

function titleTemplate(title?: string) {
  if (title?.length && title !== baseTitle) {
    return `${title} | Mads Hougesen`;
  }
  return baseTitle;
}

useHead({
  title: baseTitle,
  titleTemplate,
});

useServerHead({
  title: baseTitle,
  titleTemplate,
});

useSeoMeta({
  author,
  description: baseDescription,
  ogDescription: baseDescription,
  ogImage: baseOgImage,
  ogSiteName,
  ogTitle: baseTitle,
  ogType,
  title: baseTitle,
  titleTemplate,
  twitterCard,
  twitterCreator,
  twitterSite,
});

useServerSeoMeta({
  author,
  description: baseDescription,
  ogDescription: baseDescription,
  ogImage: baseOgImage,
  ogSiteName,
  ogTitle: baseTitle,
  ogType,
  title: baseTitle,
  titleTemplate,
  twitterCard,
  twitterCreator,
  twitterSite,
});
</script>

<template>
  <div class="container mx-auto flex h-full min-h-screen flex-col px-8 py-4">
    <Navigation />

    <NuxtPage />
  </div>
</template>
