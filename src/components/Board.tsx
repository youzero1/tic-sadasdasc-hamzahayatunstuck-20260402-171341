'use client'

import Square from './Square'
import { type SquareValue } from '@/lib/gameUtils'

type BoardProps = {
  squares: SquareValue[]
  onSquareClick: (index: number) => void
  winningLine: number[] | null
}

export default function Board({ squares, onSquareClick, winningLine }: BoardProps) {
  return (
    <div className="relative">
      {/* Glow effect behind board */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-pink-500/20 rounded-3xl blur-xl scale-110" />

      {/* Board */}
      <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20 shadow-2xl">
        <div className="grid grid-cols-3 gap-3">
          {squares.map((value, index) => (
            <Square
              key={index}
              value={value}
              onClick={() => onSquareClick(index)}
              isWinning={winningLine?.includes(index) ?? false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
