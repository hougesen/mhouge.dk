<template>
  <section id="contact" class="flex flex-col gap-2">
    <SectionTitle> Wanna get in touch? </SectionTitle>

    <p class="text-xl text-black dark:text-white">
      I am always available for exciting discussions
    </p>

    <div>
      <div class="my-2 flex items-center gap-2">
        <IconsEmail height="20" width="20" />

        <a
          class="text-xl text-black underline dark:text-white"
          href="mailto:mads@mhouge.dk"
          >mads@mhouge.dk</a
        >
      </div>

      <div class="mb-4 flex items-center gap-2">
        <IconsPin height="20" width="20" />

        <p class="text-xl text-black dark:text-white">Odense, Danmark</p>
      </div>
    </div>

    <div class="flex gap-4">
      <GithubLink />

      <LinkedInLink />
    </div>
  </section>
</template>
