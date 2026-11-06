import React from 'react'
import { Mic, Sword, Package, Heart, Map } from 'lucide-react'

export function MobileUI({ onExit }: { onExit: () => void }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
      {/* Top Bar: Vida e Recursos */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 bg-red-500/80 px-3 py-1 rounded-lg text-white font-bold">
            <Heart size={20} fill="currentColor" />
            <span>100/100</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/80 px-3 py-1 rounded-lg text-white font-bold">
            <Package size={20} />
            <span>Madeira: 0 | Minerais: 0</span>
          </div>
        </div>
        <button onClick={onExit} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
          <Map size={24} />
        </button>
      </div>

      {/* Bottom Controls: Analógico e Botões */}
      <div className="flex justify-between items-end pointer-events-auto">
        {/* Analógico Virtual (Esquerda) */}
        <div className="w-32 h-32 bg-white/10 rounded-full border-2 border-white/30 flex items-center justify-center relative">
          <div className="w-16 h-16 bg-white/40 rounded-full absolute cursor-move" />
        </div>

        {/* Botões de Ação (Direita) */}
        <div className="flex flex-col gap-4">
          <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20">
            <Sword size={28} />
          </button>
          
          {/* BOTÃO PRINCIPAL DE VOZ (IA) */}
          <button className="p-6 bg-blue-500 rounded-full text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-90 transition-transform border-4 border-white/50">
            <Mic size={36} fill="currentColor" />
          </button>

          <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20">
            <Package size={28} />
          </button>
        </div>
      </div>
    </div>
  )
}