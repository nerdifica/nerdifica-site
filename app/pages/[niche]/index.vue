<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const { getNicheBySlug, getToolsByNiche } = useNiches()

const niche = getNicheBySlug(locale.value, route.params.niche as string)
if (!niche) {
  throw createError({ statusCode: 404, statusMessage: 'Niche not found' })
}

const tools = getToolsByNiche(niche.id)
</script>

<template>
  <main class="mx-auto max-w-6xl px-6 py-16">
    <h1 class="font-display text-3xl font-bold text-ink-950 md:text-4xl">
      {{ niche.name[locale] }}
    </h1>
    <p class="mt-3 max-w-2xl text-ink-700">{{ niche.description[locale] }}</p>

    <h2 class="font-display mt-12 text-xl font-semibold text-ink-950">
      {{ t('niche.tools') }}
    </h2>
    <div class="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.id"
        :to="`/${locale}/${niche.slug[locale]}/tool/${tool.slug[locale]}`"
        class="group rounded-card border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,93,254,0.10)]"
      >
        <h3 class="font-display font-semibold text-ink-950 group-hover:text-primary-600">
          {{ tool.name[locale] }}
        </h3>
        <p class="mt-2 text-sm text-ink-700">{{ tool.description[locale] }}</p>
      </NuxtLink>
    </div>
  </main>
</template>