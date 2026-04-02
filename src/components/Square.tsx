'use client'

import { type SquareValue } from '@/lib/gameUtils'

type SquareProps = {
  value: SquareValue
  onClick: () => void
  isWinning: boolean
}

export default function Square({ value, onClick, isWinning }: SquareProps) {
  const baseClasses =
    'w-24 h-24 flex items-center justify-center text-4xl font-black rounded-2xl transition-all duration-200 cursor-pointer select-none border-2'

  const getClasses = () => {
    if (isWinning) {
      return `${baseClasses} bg-yellow-400/30 border-yellow-400 shadow-lg shadow-yellow-400/50 scale-105`
    }
    if (value === 'X') {
      return `${baseClasses} bg-blue-500/20 border-blue-400/50 hover:bg-blue-500/30 hover:border-blue-400 hover:scale-105`
    }
    if (value === 'O') {
      return `${baseClasses} bg-pink-500/20 border-pink-400/50 hover:bg-pink-500/30 hover:border-pink-400 hover:scale-105`
    }
    return `${baseClasses} bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/30 hover:scale-105 active:scale-95`
  }

  const getTextColor = () => {
    if (value === 'X') return 'text-blue-300 drop-shadow-md'
    if (value === 'O') return 'text-pink-300 drop-shadow-md'
    return ''
  }

  return (
    <button onClick={onClick} className={getClasses()} aria-label={`Square ${value ?? 'empty'}`}>
      <span className={`${getTextColor()} transition-all duration-150`}>
        {value}
      </span>
    </button>
  )
}
