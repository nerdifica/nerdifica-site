<script setup lang="ts">
import { useCompoundInterest } from './composables/useCompoundInterest'

const { principal, rate, periods, result, interestEarned } = useCompoundInterest()
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-3">
    <label class="text-sm font-medium text-ink-700">
      Capital inicial
      <input
        v-model.number="principal"
        type="number"
        min="0"
        class="mt-1 w-full rounded-control border border-border px-3 py-2 text-ink-950 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
      />
    </label>
    <label class="text-sm font-medium text-ink-700">
      Taxa de juros (% ao período)
      <input
        v-model.number="rate"
        type="number"
        min="0"
        step="0.01"
        class="mt-1 w-full rounded-control border border-border px-3 py-2 text-ink-950 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
      />
    </label>
    <label class="text-sm font-medium text-ink-700">
      Número de períodos
      <input
        v-model.number="periods"
        type="number"
        min="0"
        class="mt-1 w-full rounded-control border border-border px-3 py-2 text-ink-950 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
      />
    </label>

    <div class="col-span-full mt-2 rounded-control bg-primary-50 p-5">
      <p class="text-sm text-ink-700">
        Montante final:
        <strong class="font-mono text-lg text-primary-700">{{ result.toFixed(2) }}</strong>
      </p>
      <p class="mt-1 text-sm text-ink-700">
        Juros acumulados:
        <strong class="font-mono text-lg text-primary-700">{{ interestEarned.toFixed(2) }}</strong>
      </p>
    </div>
  </div>
</template>