<script setup lang="ts">
const { locale } = useI18n()
const appConfig = useAppConfig()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-16 border-t border-border bg-surface">
    <div class="mx-auto max-w-6xl px-6 py-10">
      <img src="/brand/logo-full.png" alt="Nerdifica" class="h-16 w-auto" />
      <p class="mt-3 max-w-md text-sm text-ink-700">
        {{ appConfig.site.tagline[locale] }}
      </p>
      <p class="mt-6 text-xs text-ink-400">
        &copy; {{ year }} {{ appConfig.site.name }} &mdash; {{ appConfig.site.domain }}
      </p>
    </div>
  </footer>
</template>