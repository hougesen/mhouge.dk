<script setup lang="ts">
import { switchHighlightColor } from '~/colors';
import type { WakatimeStatResponse } from '~/wakatime';

defineProps<{
  languages?: WakatimeStatResponse['data']['languages'];
}>();

const defaultLanguages = ['Rust', 'Python', 'TypeScript'];

function formatLanguageText(inputLanguages?: string[]) {
  const l =
    inputLanguages &&
    typeof inputLanguages === 'object' &&
    Array.isArray(inputLanguages) &&
    inputLanguages?.length
      ? inputLanguages
      : defaultLanguages;

  let formatted = '';

  const maxLanguages = Math.min(l?.length ?? 0, 3);

  for (let i = 0; i < maxLanguages; i += 1) {
    if (i === 0) {
      formatted += l[0];
    } else if (i === maxLanguages - 1) {
      if (formatted.length) {
        formatted += ' and ';
      }
      formatted += l[i];
    } else {
      if (formatted.length) {
        formatted += ', ';
      }
      formatted += l[i];
    }
  }

  if (formatted?.length) {
    return `Lately I have been writing a lot of ${formatted}.`;
  }

  return '';
}
</script>

<template>
  <section
    id="about"
    class="grid grid-cols-1 items-center gap-4 lg:grid-cols-2"
  >
    <div class="flex flex-col gap-4">
      <h1
        class="text-5xl font-bold text-black-primary dark:text-white-primary lg:text-6xl"
      >
        <span
          class="text-[color:var(--highlight)] duration-300"
          @focus="switchHighlightColor"
          @mouseenter="switchHighlightColor"
          >Hi,</span
        >
        I'm Mads
      </h1>

      <p class="text-xl text-black-primary dark:text-white-primary">
        I am a software developer from Denmark. Lover of all things programming.
        {{
          formatLanguageText(languages?.map((l) => l.name) || defaultLanguages)
        }}
      </p>

      <p class="text-dark-primary text-xl dark:text-white-primary">
        I work @
        <a
          class="underline"
          href="https://cavea.io?utm_source=mhouge.dk"
          rel="noreferrer noopener"
          target="_blank"
          >cavea.io</a
        >
        where I spend most of my time building tools for live streamers. Some
        projects I've worked on include:
      </p>

      <ul
        class="mb-4 ml-8 list-disc text-xl text-black-primary dark:text-white-primary"
      >
        <li>
          A tool for automatically
          <a
            class="underline"
            href="https://capturelab.gg?utm_source=mhouge.dk"
            rel="noreferrer noopener"
            target="_blank"
            >capturing highlights in livestreams</a
          >
        </li>

        <li>
          A platform for running
          <a
            class="underline"
            href="https://adlab.gg?utm_source=mhouge.dk"
            rel="noreferrer noopener"
            target="_blank"
            >influencer campaigns</a
          >
          on Twitch
        </li>

        <li>Dozens of systems for tracking social media performance</li>
      </ul>

      <div class="flex gap-4">
        <GithubLink />

        <LinkedInLink />
      </div>
    </div>

    <NuxtPicture
      alt="Image of Mads Hougesen"
      class="order-first mx-auto w-9/12 lg:order-1 lg:mr-0 lg:w-fit lg:text-right"
      format="avif,webp"
      :img-attrs="{ class: 'mr-auto lg:mr-0 ml-auto lg:text-right' }"
      src="/mads-hougesen-image.png"
    />
  </section>
</template>
