<script setup lang="ts">
const { locale, t } = useI18n()
const { getAllNiches } = useNiches()
const route = useRoute()
const colorMode = useColorMode()

const niches = getAllNiches()
const isMenuOpen = ref(false)
const isDark = computed(() => colorMode.value === 'dark')

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  }
)

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
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
          class="transition-colors hover:text-primary-600 dark:hover:text-primary-400"
        >
          {{ niche.name[locale] }}
        </NuxtLink>

        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-control text-ink-950 hover:bg-primary-50 dark:hover:bg-white/5"
          :aria-label="t('nav.themeToggle')"
          @click="toggleTheme"
        >
          <Icon :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'" class="h-6 w-6" />
        </button>
      </nav>

      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-control text-ink-950 md:hidden"
        :aria-expanded="isMenuOpen"
        :aria-label="t('nav.menuLabel')"
        aria-controls="mobile-nav"
        @click="isMenuOpen = !isMenuOpen"
      >
        <Icon :name="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="h-6 w-6" />
      </button>
    </div>

    <nav
      v-if="isMenuOpen"
      id="mobile-nav"
      class="flex flex-col gap-1 border-t border-border px-6 py-4 font-medium text-ink-700 md:hidden"
    >
      <NuxtLink
        v-for="niche in niches"
        :key="niche.id"
        :to="`/${locale}/${niche.slug[locale]}`"
        class="rounded-control px-2 py-2 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:hover:text-primary-400"
      >
        {{ niche.name[locale] }}
      </NuxtLink>

      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-control text-ink-700 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:hover:text-primary-400"
        :aria-label="t('nav.themeToggle')"
        @click="toggleTheme"
      >
        <Icon :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'" class="h-5 w-5" />
      </button>
    </nav>
  </header>
</template>