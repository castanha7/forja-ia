import React from 'react'

export function DifficultySelector({ current, set }: { current: string, set: (v: string) => void }) {
  const levels = [
    { id: 'easy', label: 'FÁCIL', color: 'bg-green-500' },
    { id: 'medium', label: 'MÉDIO', color: 'bg-yellow-500' },
    { id: 'hard', label: 'DIFÍCIL', color: 'bg-orange-500' },
    { id: 'impossible', label: 'IMPOSSÍVEL', color: 'bg-red-600' },
  ]

  return (
    <div className="flex gap-2 mb-6">
      {levels.map(l => (
        <button
          key={l.id}
          onClick={() => set(l.id)}
          className={`px-4 py-2 rounded-lg font-bold transition ${
            current === l.id ? `${l.color} text-white scale-105` : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}