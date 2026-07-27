<script setup lang="ts">
import { FIELDS, useDataGenerator } from './composables/useDataGenerator'

const { quantity, selectedFields, rows, generate } = useDataGenerator()

const clampedQuantity = computed({
  get: () => quantity.value,
  set: (value: number) => {
    quantity.value = Math.min(Math.max(value || 1, 1), 10)
  },
})

const activeFields = computed(() => FIELDS.filter((field) => selectedFields.value.includes(field.id)))

const copied = ref(false)

function copyAll() {
  if (!rows.value.length) return
  const header = activeFields.value.map((field) => field.label).join('\t')
  const lines = rows.value.map((row) => activeFields.value.map((field) => row[field.id]).join('\t'))
  navigator.clipboard.writeText([header, ...lines].join('\n'))
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1500)
}

generate()
</script>

<template>
  <div>
    <div class="flex flex-wrap items-end gap-6">
      <fieldset class="flex flex-wrap gap-4">
        <legend class="mb-1 text-sm font-medium text-ink-700">Campos</legend>
        <label v-for="field in FIELDS" :key="field.id" class="flex items-center gap-2 text-sm text-ink-700">
          <input
            v-model="selectedFields"
            type="checkbox"
            :value="field.id"
            :disabled="selectedFields.length === 1 && selectedFields.includes(field.id)"
            class="rounded border-border text-primary-600 focus:ring-primary-100"
          />
          {{ field.label }}
        </label>
      </fieldset>

      <label class="text-sm font-medium text-ink-700">
        Quantidade
        <input
          v-model.number="clampedQuantity"
          type="number"
          min="1"
          max="10"
          class="mt-1 block w-28 rounded-control border border-border px-3 py-2 text-ink-950 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      </label>

      <button
        type="button"
        class="rounded-control bg-primary-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        @click="generate"
      >
        Gerar
      </button>
    </div>

    <div class="mt-8">
      <div class="flex items-center justify-between">
        <h3 class="font-display font-semibold text-ink-950">Resultado</h3>
        <button
          type="button"
          class="text-sm text-primary-600 hover:underline dark:text-primary-400"
          @click="copyAll"
        >
          {{ copied ? 'Copiado!' : 'Copiar tudo' }}
        </button>
      </div>
      <div class="mt-3 overflow-x-auto rounded-control border border-border bg-surface">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="divide-x divide-border border-b border-border">
              <th v-for="field in activeFields" :key="field.id" class="px-4 py-2 font-medium text-ink-700">
                {{ field.label }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="(row, index) in rows" :key="index" class="divide-x divide-border">
              <td v-for="field in activeFields" :key="field.id" class="px-4 py-2 font-mono text-ink-950">
                {{ row[field.id] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>