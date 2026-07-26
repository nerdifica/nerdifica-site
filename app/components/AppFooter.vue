<script setup lang="ts">
const { locale, t } = useI18n()
const appConfig = useAppConfig()
const { getAllNiches } = useNiches()

const niches = getAllNiches()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-16 border-t border-border bg-surface">
    <div class="mx-auto max-w-6xl px-6 py-10">
      <div class="flex flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <img src="/brand/logo-full.png" alt="Nerdifica" class="h-16 w-auto" />
          <p class="mt-3 max-w-md text-sm text-ink-700">
            {{ appConfig.site.tagline[locale] }}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 class="font-display text-sm font-semibold text-ink-950">
            {{ t('footer.explore') }}
          </h2>
          <ul class="mt-3 space-y-2 text-sm text-ink-700">
            <li>
              <NuxtLink :to="`/${locale}`" class="hover:text-primary-600">
                {{ t('nav.home') }}
              </NuxtLink>
            </li>
            <li v-for="niche in niches" :key="niche.id">
              <NuxtLink :to="`/${locale}/${niche.slug[locale]}`" class="hover:text-primary-600">
                {{ niche.name[locale] }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <p class="mt-6 text-xs text-ink-400">
        &copy; {{ year }} {{ appConfig.site.name }} &mdash; {{ appConfig.site.domain }}
      </p>
    </div>
  </footer>
</template>