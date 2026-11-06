import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Environment, ContactShadows } from '@react-three/drei'
import { GameWorld } from './systems/GameWorld'
import { MobileUI } from './ui/MobileUI'
import { DifficultySelector } from './ui/DifficultySelector'

export default function App() {
  const [gameState, setGameState] = useState<'menu' | 'playing'>('menu')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'impossible'>('medium')

  return (
    <div className="w-full h-screen bg-slate-900 overflow-hidden relative">
      {gameState === 'menu' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/80">
          <h1 className="text-4xl font-bold text-white mb-8 tracking-tighter">REALITY FORGE AI</h1>
          <DifficultySelector current={difficulty} set={setDifficulty} />
          <button 
            onClick={() => setGameState('playing')}
            className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-xl text-xl font-bold shadow-lg active:scale-95 transition"
          >
            JOGAR
          </button>
        </div>
      ) : (
        <>
          <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
            <Suspense fallback={null}>
              <Sky sunPosition={[100, 20, 100]} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
              <GameWorld difficulty={difficulty} />
              <Environment preset="city" />
              <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
              <OrbitControls makeDefault enablePan={false} maxPolarAngle={Math.PI / 2.1} />
            </Suspense>
          </Canvas>
          <MobileUI onExit={() => setGameState('menu')} />
        </>
      )}
    </div>
  )
}