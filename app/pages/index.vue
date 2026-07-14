<script setup lang="ts">
const { locale } = useI18n()
const { getAllNiches } = useNiches()
const appConfig = useAppConfig()

const niches = getAllNiches()
</script>

<template>
  <main class="mx-auto max-w-6xl px-6 py-16">
    <h1 class="font-display max-w-2xl text-4xl font-bold text-ink-950 md:text-5xl">
      {{ appConfig.site.tagline[locale] }}
    </h1>

    <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="niche in niches"
        :key="niche.id"
        :to="`/${locale}/${niche.slug[locale]}`"
        class="group rounded-card border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,93,254,0.10)]"
      >
        <h2 class="font-display text-lg font-semibold text-ink-950 group-hover:text-primary-600">
          {{ niche.name[locale] }}
        </h2>
        <p class="mt-2 text-sm text-ink-700">{{ niche.description[locale] }}</p>
      </NuxtLink>
    </div>
  </main>
</template>