<script setup lang="ts">
const props = defineProps<{
  faq: { question: string; answer: string }[]
}>()

const faqJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: props.faq.map((entry) => ({
    '@type': 'Question',
    name: entry.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: entry.answer,
    },
  })),
}))

useHead(() => ({
  script: props.faq.length
    ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(faqJsonLd.value),
        },
      ]
    : [],
}))
</script>

<template>
  <section v-if="faq.length">
    <h2 class="font-display text-xl font-semibold text-ink-950">{{ $t('tool.faq') }}</h2>
    <div class="mt-4 divide-y divide-border rounded-card border border-border bg-surface">
      <details v-for="(entry, index) in faq" :key="index" class="group p-5">
        <summary class="cursor-pointer list-none font-medium text-ink-950 marker:content-none">
          {{ entry.question }}
        </summary>
        <p class="mt-2 text-sm text-ink-700">{{ entry.answer }}</p>
      </details>
    </div>
  </section>
</template>