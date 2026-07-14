<script setup lang="ts">
defineProps<{
  adSlot: string
}>()

const config = useRuntimeConfig()
const hasAdsense = computed(() => Boolean(config.public.adsensePublisherId))
</script>

<template>
  <div :data-slot="adSlot">
    <ins
      v-if="hasAdsense"
      class="adsbygoogle block"
      :data-ad-client="config.public.adsensePublisherId"
      :data-ad-slot="adSlot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
    <div
      v-else
      class="flex h-24 items-center justify-center rounded-control border border-dashed border-border text-xs text-ink-400"
    >
      Ad slot: {{ adSlot }}
    </div>
  </div>
</template>