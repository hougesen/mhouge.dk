<script setup lang="ts">
import type { CargoPackage } from '~/cargo';

defineProps<{
  crates: CargoPackage[];
}>();
</script>

<template>
  <section v-if="crates?.length" id="projects" class="flex flex-col gap-8">
    <SectionTitle>Rust packages</SectionTitle>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <CargoCrate
        v-for="(crate, packageIndex) of crates"
        :key="packageIndex"
        :crate="crate"
      />
    </div>
  </section>
</template>
