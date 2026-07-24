type Cell = 'X' | 'O' | null
type Player = 'X' | 'O'

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function useTicTacToe() {
  const board = ref<Cell[]>(Array(9).fill(null))
  const currentPlayer = ref<Player>('X')

  const winningLine = computed(() => {
    return WINNING_LINES.find(
      ([a, b, c]) => board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]
    )
  })

  const winner = computed<Player | null>(() => {
    const line = winningLine.value
    return line ? (board.value[line[0]] as Player) : null
  })

  const isDraw = computed(() => !winner.value && board.value.every((cell) => cell !== null))

  function play(index: number) {
    if (board.value[index] || winner.value) return
    board.value[index] = currentPlayer.value
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }

  function reset() {
    board.value = Array(9).fill(null)
    currentPlayer.value = 'X'
  }

  return { board, currentPlayer, winner, winningLine, isDraw, play, reset }
}