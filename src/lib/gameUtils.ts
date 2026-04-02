export type SquareValue = 'X' | 'O' | null

type WinnerResult = {
  winner: SquareValue
  line: number[]
}

const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
]

export function calculateWinner(squares: SquareValue[]): WinnerResult {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }
    }
  }
  return { winner: null, line: [] }
}

export function getBestMove(squares: SquareValue[], player: SquareValue): number {
  const opponent: SquareValue = player === 'X' ? 'O' : 'X'

  // Check if player can win
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const newSquares = squares.slice()
      newSquares[i] = player
      if (calculateWinner(newSquares).winner === player) {
        return i
      }
    }
  }

  // Block opponent from winning
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const newSquares = squares.slice()
      newSquares[i] = opponent
      if (calculateWinner(newSquares).winner === opponent) {
        return i
      }
    }
  }

  // Take center
  if (!squares[4]) return 4

  // Take corners
  const corners = [0, 2, 6, 8]
  const availableCorners = corners.filter((c) => !squares[c])
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)]
  }

  // Take any available
  const available = squares.map((s, i) => (s ? null : i)).filter((i) => i !== null) as number[]
  return available[Math.floor(Math.random() * available.length)]
}
