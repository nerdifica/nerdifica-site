<script setup lang="ts">
defineProps<{
  error: NuxtError
}>()

const { locale, t } = useI18n()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main
      class="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center"
    >
      <h1 class="font-display text-3xl font-bold text-ink-950 md:text-4xl">
        {{ t('error.title') }}
      </h1>
      <p class="mt-3 text-ink-700">{{ t('error.description') }}</p>
      <NuxtLink
        :to="`/${locale}`"
        class="mt-8 rounded-control bg-primary-500 px-5 py-2.5 font-medium text-white transition-colors hover:bg-primary-600"
      >
        {{ t('error.backHome') }}
      </NuxtLink>
    </main>
    <AppFooter />
  </div>
</template>