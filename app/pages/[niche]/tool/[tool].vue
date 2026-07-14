<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const { getNicheBySlug, getToolBySlug } = useNiches()

const niche = getNicheBySlug(locale.value, route.params.niche as string)
if (!niche) {
  throw createError({ statusCode: 404, statusMessage: 'Niche not found' })
}

const tool = getToolBySlug(locale.value, niche.id, route.params.tool as string)
if (!tool) {
  throw createError({ statusCode: 404, statusMessage: 'Tool not found' })
}

const ToolComponent = defineAsyncComponent(tool.component as never)

useSeoMeta({
  title: tool.name[locale.value],
  description: tool.description[locale.value],
})
</script>

<template>
  <main class="mx-auto max-w-3xl px-6 py-16">
    <h1 class="font-display text-3xl font-bold text-ink-950 md:text-4xl">
      {{ tool.name[locale] }}
    </h1>
    <p class="mt-3 text-ink-700">{{ tool.description[locale] }}</p>

    <div class="mt-8 rounded-card border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <ClientOnly>
        <component :is="ToolComponent" />
      </ClientOnly>
    </div>

    <ToolFaq
      class="mt-12"
      :faq="tool.faq.map((f) => ({ question: f.question[locale], answer: f.answer[locale] }))"
    />

    <AdSlot ad-slot="tool-bottom" class="mt-12" />
  </main>
</template>