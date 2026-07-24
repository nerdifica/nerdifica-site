const VALID_DDDS = [
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48,
  49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
]

function randomDigit() {
  return Math.floor(Math.random() * 10)
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
  const ddd = VALID_DDDS[Math.floor(Math.random() * VALID_DDDS.length)]
  const part1 = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  const part2 = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `(${ddd}) 9${part1}-${part2}`
}

export function useDataGenerator() {
  const quantity = ref(5)
  const cpfList = ref<string[]>([])
  const phoneList = ref<string[]>([])

  function generate() {
    const count = Math.min(Math.max(quantity.value, 1), 50)
    cpfList.value = Array.from({ length: count }, generateCpf)
    phoneList.value = Array.from({ length: count }, generatePhone)
  }

  return { quantity, cpfList, phoneList, generate }
}