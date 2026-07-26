<script setup lang="ts">
const config = useRuntimeConfig()

if (config.public.adsensePublisherId) {
  useHead({
    script: [
      {
        src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.public.adsensePublisherId}`,
        async: true,
        crossorigin: 'anonymous',
      },
    ],
  })
}

useSeoMeta({
  ogImage: 'https://nerdifica.com/brand/logo-full.png',
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <div class="flex-1">
      <NuxtPage />
    </div>
    <AppFooter />
  </div>
</template>
