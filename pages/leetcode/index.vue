<script setup lang="ts">
const { data } = useFetch('/api/leetcode/stats');

useHead({
  title: 'Leetcode',
});
</script>

<template>
  <div class="flex w-full flex-col gap-12 pb-8">
    <section class="flex flex-col gap-8">
      <SectionTitle> Leetcode Metrics </SectionTitle>

      <a
        class="text-dark-primary text-xl underline dark:text-white-primary"
        href="https://leetcode.com/u/hougesen"
        rel="noreferrer noopener"
        target="_blank"
        >Account</a
      >

      <KPIGrid>
        <KPI
          label="Total"
          :value="
            data?.all?.count ||
            (data?.easy?.count ?? 0) +
              (data?.medium?.count ?? 0) +
              (data?.hard?.count ?? 0)
          "
        />

        <KPI label="Easy" :value="data?.easy?.count ?? 0" />

        <KPI label="Medium" :value="data?.medium?.count ?? 0" />

        <KPI label="Hard" :value="data?.hard?.count ?? 0" />
      </KPIGrid>
    </section>
  </div>
</template>
