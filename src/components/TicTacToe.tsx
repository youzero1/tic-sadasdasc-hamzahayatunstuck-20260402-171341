'use client'

import { useState, useCallback } from 'react'
import Board from './Board'
import ScoreBoard from './ScoreBoard'
import { calculateWinner, type SquareValue } from '@/lib/gameUtils'

type Scores = {
  X: number
  O: number
  draws: number
}

export default function TicTacToe() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draws: 0 })
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)

  const { winner, line } = calculateWinner(squares)
  const isDraw = !winner && squares.every(Boolean)
  const currentPlayer = isXNext ? 'X' : 'O'

  const handleClick = useCallback(
    (index: number) => {
      if (squares[index] || gameOver || winner) return

      const newSquares = squares.slice()
      newSquares[index] = currentPlayer
      setSquares(newSquares)

      const result = calculateWinner(newSquares)
      if (result.winner) {
        setGameOver(true)
        setWinningLine(result.line)
        setScores((prev) => ({
          ...prev,
          [result.winner as string]: prev[result.winner as keyof Scores] + 1,
        }))
      } else if (newSquares.every(Boolean)) {
        setGameOver(true)
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
      } else {
        setIsXNext(!isXNext)
      }
    },
    [squares, gameOver, winner, currentPlayer, isXNext]
  )

  const resetGame = useCallback(() => {
    setSquares(Array(9).fill(null))
    setIsXNext(true)
    setGameOver(false)
    setWinningLine(null)
  }, [])

  const resetAll = useCallback(() => {
    resetGame()
    setScores({ X: 0, O: 0, draws: 0 })
  }, [resetGame])

  const getStatusMessage = () => {
    if (winner) {
      return (
        <span>
          Player{' '}
          <span className={winner === 'X' ? 'text-blue-300' : 'text-pink-300'}>
            {winner}
          </span>{' '}
          wins! 🎉
        </span>
      )
    }
    if (isDraw) {
      return <span>It&apos;s a draw! 🤝</span>
    }
    return (
      <span>
        Player{' '}
        <span
          className={currentPlayer === 'X' ? 'text-blue-300' : 'text-pink-300'}
        >
          {currentPlayer}
        </span>
        &apos;s turn
      </span>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-5xl font-black text-white tracking-tight drop-shadow-lg">
          Tic{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
            Tac
          </span>{' '}
          Toe
        </h1>
        <p className="text-purple-200 mt-1 text-sm font-medium tracking-widest uppercase">
          Classic Game
        </p>
      </div>

      {/* Score Board */}
      <ScoreBoard scores={scores} />

      {/* Status */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
        <p className="text-white text-lg font-semibold text-center">
          {getStatusMessage()}
        </p>
      </div>

      {/* Board */}
      <Board
        squares={squares}
        onSquareClick={handleClick}
        winningLine={winningLine}
      />

      {/* Buttons */}
      <div className="flex gap-3 w-full">
        <button
          onClick={resetGame}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          New Game
        </button>
        <button
          onClick={resetAll}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-2xl border border-white/30 transition-all duration-200 transform hover:scale-105 active:scale-95 backdrop-blur-sm"
        >
          Reset All
        </button>
      </div>
    </div>
  )
}
