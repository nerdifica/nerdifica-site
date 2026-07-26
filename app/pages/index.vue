<script setup lang="ts">
const { locale, t } = useI18n()
const { getAllNiches, getAllTools, getNicheById } = useNiches()
const appConfig = useAppConfig()

const niches = getAllNiches()

// Today this equals "all tools" (only 3 exist); revisit curation/slicing
// once the catalog grows past what fits nicely in one grid.
const featuredTools = computed(() =>
  getAllTools().map((tool) => ({
    tool,
    niche: getNicheById(tool.nicheId)!,
  }))
)

const collectionByLocale: Record<string, 'blog_ptbr' | 'blog_es' | 'blog_en'> = {
  'pt-br': 'blog_ptbr',
  es: 'blog_es',
  en: 'blog_en',
}

const { data: latestArticles } = await useAsyncData(
  () => `home-latest-articles-${locale.value}`,
  () =>
    queryCollection(collectionByLocale[locale.value] ?? 'blog_ptbr')
      .order('publishedAt', 'DESC')
      .limit(3)
      .all(),
  { watch: [locale] }
)

const pageTitle = `${appConfig.site.name} — ${appConfig.site.tagline[locale.value]}`

useSeoMeta({
  title: pageTitle,
  description: t('home.subheadline'),
  ogTitle: pageTitle,
  ogDescription: t('home.subheadline'),
})

useSchemaOrg([
  defineWebSite({
    name: appConfig.site.name,
    url: `https://${appConfig.site.domain}`,
  }),
  defineOrganization({
    name: appConfig.site.name,
    logo: '/brand/logo-full.png',
  }),
])
</script>

<template>
  <main class="mx-auto max-w-6xl px-6 py-16">
    <h1 class="font-display max-w-2xl text-4xl font-bold text-ink-950 md:text-5xl">
      {{ appConfig.site.tagline[locale] }}
    </h1>
    <p class="mt-4 max-w-xl text-lg text-ink-700">
      {{ t('home.subheadline') }}
    </p>

    <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="niche in niches"
        :key="niche.id"
        :to="`/${locale}/${niche.slug[locale]}`"
        class="group rounded-card border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,93,254,0.10)]"
      >
        <Icon :name="niche.icon" class="h-6 w-6 text-primary-500" />
        <h2 class="font-display mt-3 text-lg font-semibold text-ink-950 group-hover:text-primary-600">
          {{ niche.name[locale] }}
        </h2>
        <p class="mt-2 text-sm text-ink-700">{{ niche.description[locale] }}</p>
      </NuxtLink>
    </div>

    <section class="mt-16">
      <h2 class="font-display text-xl font-semibold text-ink-950">
        {{ t('home.popularTools') }}
      </h2>
      <div class="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="{ tool, niche } in featuredTools"
          :key="tool.id"
          :to="`/${locale}/${niche.slug[locale]}/tool/${tool.slug[locale]}`"
          class="group rounded-card border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,93,254,0.10)]"
        >
          <Icon :name="niche.icon" class="h-6 w-6 text-primary-500" />
          <h3 class="font-display mt-3 font-semibold text-ink-950 group-hover:text-primary-600">
            {{ tool.name[locale] }}
          </h3>
          <p class="mt-2 text-sm text-ink-700">{{ tool.description[locale] }}</p>
        </NuxtLink>
      </div>
    </section>

    <section v-if="latestArticles && latestArticles.length > 0" class="mt-16">
      <h2 class="font-display text-xl font-semibold text-ink-950">
        {{ t('home.latestArticles') }}
      </h2>
      <div class="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <BlogArticleCard v-for="article in latestArticles" :key="article.path" :article="article" />
      </div>
    </section>

    <AdSlot ad-slot="home-bottom" class="mt-16" />
  </main>
</template>