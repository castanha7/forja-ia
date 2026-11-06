import React from 'react'
import { Box, Plane, Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../systems/store'

export function GameWorld({ difficulty }: { difficulty: string }) {
  const { inventory, setHeldItem, addToInventory } = useStore()
  const [resources, setResources] = React.useState<any[]>([
    { id: 'r1', type: 'wood', position: [-8, 1.5, 5], color: '#22c55e' },
    { id: 'r2', type: 'mineral', position: [5, 4, 2], color: '#94a3b8' },
    { id: 'r3', type: 'material', position: [-5, 3, -5], color: '#64748b' },
  ])
  
  const [orbitActive, setOrbitActive] = React.useState(false)
  const playerRef = React.useRef<THREE.Group>(null)
  const orbitRef = React.useRef<THREE.Mesh>(null)

  const handleCollect = (id: string, type: 'wood' | 'mineral' | 'material', color: string) => {
    setOrbitActive(true)
    setTimeout(() => {
      addToInventory(type, 1)
      setResources(prev => prev.filter(r => r.id !== id))
      setOrbitActive(false)
    }, 800)
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playerRef.current) return
      const speed = 0.1
      if (e.key === 'w') playerRef.current.position.z -= speed
      if (e.key === 's') playerRef.current.position.z += speed
      if (e.key === 'a') playerRef.current.position.x -= speed
      if (e.key === 'd') playerRef.current.position.x += speed
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <group>
      <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial color="#4ade80" />
      </Plane>

      <Box args={[4, 4, 4]} position={[-5, 2, -5]} castShadow>
        <meshStandardMaterial color="#94a3b8" />
      </Box>
      <Box args={[3, 6, 3]} position={[5, 3, 2]} castShadow>
        <meshStandardMaterial color="#64748b" />
      </Box>

      {resources.map((res) => (
        <Box 
          key={res.id} 
          args={[1.5, 1.5, 1.5]} 
          position={res.position} 
          onClick={() => handleCollect(res.id, res.type, res.color)}
        >
          <meshStandardMaterial color={res.color} emissive={orbitActive ? res.color : 'black'} emissiveIntensity={0.5} />
        </Box>
      ))}

      <group ref={playerRef} position={[0, 1, 0]}>
        <Box args={[1, 2, 1]} position={[0, 0, 0]} castShadow>
          <meshStandardMaterial color="#3b82f6" />
        </Box>
        
        <Sphere ref={orbitRef} args={[0.4, 16, 16]} position={[-0.6, 1, 0]}>
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={orbitActive ? 2 : 0.5} transparent opacity={0.8} />
        </Sphere>

        {inventory.wood > 0 || inventory.mineral > 0 || inventory.material > 0 || heldItem ? (
           <Box args={[0.5, 0.5, 0.5]} position={[0.6, 1, 0]}>
            <meshStandardMaterial color="#f59e0b" />
            <Html distanceFactor={2} position={[0, 0.5, 0]}>
              <div className="bg-black/80 text-white px-1 rounded text-[8px]">{heldItem || 'Item'}</div>
            </Html>
          </Box>
        ) : null}
      </group>
    </group>
  )
}