<script setup lang="ts">
defineProps<{
  article: {
    path: string
    title: string
    description: string
  }
}>()
</script>

<template>
  <NuxtLink
    :to="article.path"
    class="group rounded-card border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,93,254,0.10)]"
  >
    <h3 class="font-display font-semibold text-ink-950 group-hover:text-primary-600">
      {{ article.title }}
    </h3>
    <p class="mt-2 text-sm text-ink-700">{{ article.description }}</p>
  </NuxtLink>
</template>