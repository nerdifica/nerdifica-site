<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const collectionByLocale: Record<string, 'blog_ptbr' | 'blog_es' | 'blog_en'> = {
  'pt-br': 'blog_ptbr',
  es: 'blog_es',
  en: 'blog_en',
}

const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
const path = `/${locale.value}/${route.params.niche}/blog/${slug}`
const collection = collectionByLocale[locale.value] ?? 'blog_ptbr'

const { data: article } = await useAsyncData(path, () =>
  queryCollection(collection).path(path).first()
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useSeoMeta({
  title: article.value.title,
  description: article.value.description,
})
</script>

<template>
  <article v-if="article" class="mx-auto max-w-3xl px-6 py-16">
    <h1 class="font-display text-3xl font-bold text-ink-950 md:text-4xl">{{ article.title }}</h1>
    <ContentRenderer
      :value="article"
      class="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-primary-700 prose-a:no-underline hover:prose-a:underline dark:prose-invert dark:prose-a:text-primary-300"
    />

    <ToolFaq class="mt-12" :faq="article.faq ?? []" />

    <AdSlot ad-slot="blog-bottom" class="mt-12" />
  </article>
</template>