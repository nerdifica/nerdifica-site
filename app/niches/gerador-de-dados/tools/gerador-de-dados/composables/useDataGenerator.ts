export type FieldId = 'cpf' | 'telefone' | 'nome'

const VALID_DDDS = [
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48,
  49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
]

const FIRST_NAMES = [
  'Ana', 'Bruno', 'Carla', 'Daniel', 'Eduarda', 'Felipe', 'Gabriela', 'Hugo', 'Isabela', 'João',
  'Larissa', 'Marcos', 'Natália', 'Otávio', 'Patrícia', 'Rafael', 'Sofia', 'Thiago', 'Vitória', 'William',
]

const LAST_NAMES = [
  'Almeida', 'Barbosa', 'Costa', 'Dias', 'Ferreira', 'Gomes', 'Henrique', 'Lima', 'Martins', 'Nascimento',
  'Oliveira', 'Pereira', 'Ribeiro', 'Santos', 'Silva', 'Souza', 'Teixeira', 'Vieira', 'Correia', 'Rocha',
]

function randomDigit() {
  return Math.floor(Math.random() * 10)
}

function randomItem<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)] as T
}

function calcCheckDigit(digits: number[], weightStart: number) {
  const sum = digits.reduce((acc, digit, index) => acc + digit * (weightStart - index), 0)
  const remainder = (sum * 10) % 11
  return remainder === 10 ? 0 : remainder
}

function generateCpf(): string {
  let base: number[]
  do {
    base = Array.from({ length: 9 }, randomDigit)
  } while (base.every((digit) => digit === base[0]))

  const d1 = calcCheckDigit(base, 10)
  const d2 = calcCheckDigit([...base, d1], 11)

  const all = [...base, d1, d2].join('')
  return `${all.slice(0, 3)}.${all.slice(3, 6)}.${all.slice(6, 9)}-${all.slice(9, 11)}`
}

function generatePhone(): string {
  const ddd = randomItem(VALID_DDDS)
  const part1 = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  const part2 = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `(${ddd}) 9${part1}-${part2}`
}

function generateNome(): string {
  return `${randomItem(FIRST_NAMES)} ${randomItem(LAST_NAMES)}`
}

export const FIELDS: { id: FieldId; label: string; generate: () => string }[] = [
  { id: 'cpf', label: 'CPF', generate: generateCpf },
  { id: 'telefone', label: 'Telefone', generate: generatePhone },
  { id: 'nome', label: 'Nome', generate: generateNome },
]

export function useDataGenerator() {
  const quantity = ref(5)
  const selectedFields = ref<FieldId[]>(['cpf', 'telefone'])
  const rows = ref<Record<FieldId, string>[]>([])

  function generate() {
    const count = Math.min(Math.max(quantity.value, 1), 50)
    const fields = FIELDS.filter((field) => selectedFields.value.includes(field.id))

    rows.value = Array.from({ length: count }, () => {
      const row = {} as Record<FieldId, string>
      for (const field of fields) row[field.id] = field.generate()
      return row
    })
  }

  return { quantity, selectedFields, rows, generate }
}