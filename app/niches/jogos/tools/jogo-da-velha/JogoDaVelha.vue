<script setup lang="ts">
import { useTicTacToe } from './composables/useTicTacToe'

const { board, currentPlayer, winner, winningLine, isDraw, play, reset } = useTicTacToe()
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <p class="text-sm font-medium text-ink-700">
      <template v-if="winner">
        Vitória de <strong class="text-primary-700 dark:text-primary-400">{{ winner }}</strong>!
      </template>
      <template v-else-if="isDraw"> Empate! </template>
      <template v-else>
        Vez de <strong class="text-primary-700 dark:text-primary-400">{{ currentPlayer }}</strong>
      </template>
    </p>

    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="(cell, index) in board"
        :key="index"
        type="button"
        class="flex h-20 w-20 items-center justify-center rounded-control border border-border bg-surface font-display text-3xl font-bold text-ink-950 transition-colors hover:bg-primary-50 dark:hover:bg-white/5 disabled:hover:bg-surface"
        :class="{ 'bg-primary-50 text-primary-700 dark:bg-white/5 dark:text-primary-400': winningLine?.includes(index) }"
        :disabled="!!cell || !!winner"
        @click="play(index)"
      >
        {{ cell }}
      </button>
    </div>

    <button
      type="button"
      class="rounded-control bg-primary-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
      @click="reset"
    >
      Reiniciar
    </button>
  </div>
</template>