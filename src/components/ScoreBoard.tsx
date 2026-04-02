'use client'

type Scores = {
  X: number
  O: number
  draws: number
}

type ScoreBoardProps = {
  scores: Scores
}

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  return (
    <div className="flex gap-3 w-full">
      {/* Player X Score */}
      <div className="flex-1 bg-blue-500/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-400/30 text-center">
        <div className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1">
          Player X
        </div>
        <div className="text-white text-3xl font-black">{scores.X}</div>
      </div>

      {/* Draws */}
      <div className="flex-1 bg-yellow-500/20 backdrop-blur-sm rounded-2xl p-4 border border-yellow-400/30 text-center">
        <div className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-1">
          Draws
        </div>
        <div className="text-white text-3xl font-black">{scores.draws}</div>
      </div>

      {/* Player O Score */}
      <div className="flex-1 bg-pink-500/20 backdrop-blur-sm rounded-2xl p-4 border border-pink-400/30 text-center">
        <div className="text-pink-300 text-xs font-bold uppercase tracking-widest mb-1">
          Player O
        </div>
        <div className="text-white text-3xl font-black">{scores.O}</div>
      </div>
    </div>
  )
}
