<script setup lang="ts">
import { useDataGenerator } from './composables/useDataGenerator'

const { quantity, cpfList, phoneList, generate } = useDataGenerator()

const clampedQuantity = computed({
  get: () => quantity.value,
  set: (value: number) => {
    quantity.value = Math.min(Math.max(value || 1, 1), 50)
  },
})

const copiedList = ref<'cpf' | 'phone' | null>(null)

function copyAll(list: string[], kind: 'cpf' | 'phone') {
  if (!list.length) return
  navigator.clipboard.writeText(list.join('\n'))
  copiedList.value = kind
  setTimeout(() => {
    if (copiedList.value === kind) copiedList.value = null
  }, 1500)
}

generate()
</script>

<template>
  <div>
    <div class="flex flex-wrap items-end gap-4">
      <label class="text-sm font-medium text-ink-700">
        Quantidade
        <input
          v-model.number="clampedQuantity"
          type="number"
          min="1"
          max="50"
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

    <div class="mt-8 grid gap-6 sm:grid-cols-2">
      <div>
        <div class="flex items-center justify-between">
          <h3 class="font-display font-semibold text-ink-950">CPF</h3>
          <button type="button" class="text-sm text-primary-600 hover:underline" @click="copyAll(cpfList, 'cpf')">
            {{ copiedList === 'cpf' ? 'Copiado!' : 'Copiar tudo' }}
          </button>
        </div>
        <ul class="mt-3 divide-y divide-border rounded-control border border-border bg-surface">
          <li
            v-for="(cpf, index) in cpfList"
            :key="index"
            class="flex items-center justify-between px-4 py-2 font-mono text-sm text-ink-950"
          >
            {{ cpf }}
          </li>
        </ul>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <h3 class="font-display font-semibold text-ink-950">Telefone</h3>
          <button type="button" class="text-sm text-primary-600 hover:underline" @click="copyAll(phoneList, 'phone')">
            {{ copiedList === 'phone' ? 'Copiado!' : 'Copiar tudo' }}
          </button>
        </div>
        <ul class="mt-3 divide-y divide-border rounded-control border border-border bg-surface">
          <li
            v-for="(phone, index) in phoneList"
            :key="index"
            class="flex items-center justify-between px-4 py-2 font-mono text-sm text-ink-950"
          >
            {{ phone }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
