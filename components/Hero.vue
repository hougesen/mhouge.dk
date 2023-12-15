<script setup lang="ts">
import { switchHighlightColor } from '~/colors';
</script>

<template>
  <section class="grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
    <div class="flex flex-col gap-4">
      <h1 class="text-5xl font-bold text-black dark:text-white lg:text-6xl">
        <span
          class="text-[color:var(--highlight)]"
          @focus="switchHighlightColor"
          @mouseenter="switchHighlightColor"
          >Hi,</span
        >
        I'm Mads
      </h1>

      <p class="text-xl text-black dark:text-white">
        I am a software developer from Denmark. Lover of all things programming.
        Currently into Rust, Python and TypeScript.
      </p>

      <p class="text-xl text-white dark:text-white">
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

      <ul class="mb-4 ml-8 list-disc text-xl text-black dark:text-white">
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
      img-attrs="mr-auto lg:mr-0 ml-auto lg:text-right"
      src="/mads-hougesen-image.png"
    />
  </section>
</template>
