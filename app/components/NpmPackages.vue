<script setup lang="ts">
import type { NpmPackage } from '~~/npm';

defineProps<{
  packages: NpmPackage[];
}>();
</script>

<template>
  <section v-if="packages?.length" id="projects" class="flex flex-col gap-8">
    <SectionTitle>
      NPM packages <a href="https://crates.io/users/hougesen">📦</a>
    </SectionTitle>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <NpmPackagesItem
        v-for="(pkg, packageIndex) of packages"
        :key="packageIndex"
        :pkg="pkg"
      />
    </div>
  </section>
</template>
