import React from 'react'
import { Mic, Sword, Package, Heart, Map, Camera } from 'lucide-react'
import { useStore } from '../systems/store'
import { VoiceSystem } from '../ai/VoiceSystem'

export function MobileUI({ onExit }: { onExit: () => void }) {
  const { inventory, cameraMode, setCameraMode, setHeldItem } = useStore()
  const voiceSystem = React.useRef<VoiceSystem | null>(null)

  React.useEffect(() => {
    voiceSystem.current = new VoiceSystem()
  }, [])

  const handleVoiceClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const vs = voiceSystem.current
    if (!vs) return

    vs.startListening(
      (text) => {
        console.log("IA Interpretando:", text)
        setHeldItem(text.substring(0, 15) + "...")
      },
      (err) => console.error(err)
    )
    
    setTimeout(() => vs.stopListening(), 3000)
    alert("Segurando o microfone... Diga algo (ex: 'Espada de fogo')")
  }

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 bg-red-500/80 px-3 py-1 rounded-lg text-white font-bold">
            <Heart size={20} fill="currentColor" />
            <span>100/100</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/80 px-3 py-1 rounded-lg text-white font-bold">
            <Package size={20} />
            <span>M: {inventory.wood} | Min: {inventory.mineral} | Mat: {inventory.material}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCameraMode(cameraMode === 'third' ? 'first' : 'third')} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
            <Camera size={24} />
          </button>
          <button onClick={onExit} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
            <Map size={24} />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-end pointer-events-auto">
        <div className="w-32 h-32 bg-white/10 rounded-full border-2 border-white/30 flex items-center justify-center relative">
          <div className="w-16 h-16 bg-white/40 rounded-full absolute cursor-move" />
        </div>

        <div className="flex flex-col gap-4">
          <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20">
            <Sword size={28} />
          </button>
          
          <button 
            onMouseDown={handleVoiceClick}
            onTouchStart={handleVoiceClick}
            className="p-6 bg-blue-500 rounded-full text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-90 transition-transform border-4 border-white/50"
          >
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