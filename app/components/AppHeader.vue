<script setup lang="ts">
const { locale } = useI18n()
const { getAllNiches } = useNiches()

const niches = getAllNiches()
</script>

<template>
  <header class="border-b border-border bg-surface">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <NuxtLink :to="`/${locale}`" class="flex items-center gap-2">
        <img src="/brand/logo-mark.png" alt="Nerdifica" class="h-9 w-auto" />
        <span class="font-display text-xl font-bold">
          <span class="text-primary-500">nerdi</span><span class="text-ink-950">fica</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-6 font-medium text-ink-700 md:flex">
        <NuxtLink
          v-for="niche in niches"
          :key="niche.id"
          :to="`/${locale}/${niche.slug[locale]}`"
          class="transition-colors hover:text-primary-600"
        >
          {{ niche.name[locale] }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>