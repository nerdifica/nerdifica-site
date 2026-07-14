export function useCompoundInterest() {
  const principal = ref(1000)
  const rate = ref(1)
  const periods = ref(12)

  const result = computed(() => {
    const i = rate.value / 100
    return principal.value * Math.pow(1 + i, periods.value)
  })

  const interestEarned = computed(() => result.value - principal.value)

  return { principal, rate, periods, result, interestEarned }
}