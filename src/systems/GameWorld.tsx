import React from 'react'
import { Box, Plane } from '@react-three/drei'

export function GameWorld({ difficulty }: { difficulty: string }) {
  return (
    <group>
      <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial color="#4ade80" />
      </Plane>

      {/* Casas e Construções (Blocky) */}
      <Box args={[4, 4, 4]} position={[-5, 2, -5]} castShadow>
        <meshStandardMaterial color="#94a3b8" />
      </Box>
      <Box args={[3, 6, 3]} position={[5, 3, 2]} castShadow>
        <meshStandardMaterial color="#64748b" />
      </Box>

      {/* Árvores (Blocky) */}
      <group position={[-8, 1, 5]}>
        <Box args={[1, 1, 1]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#795548" />
        </Box>
        <Box args={[2, 2, 2]} position={[0, 2, 0]}>
          <meshStandardMaterial color="#22c55e" />
        </Box>
      </group>

      <Player />
    </group>
  )
}

function Player() {
  const [pos, setPos] = React.useState([0, 1, 0])
  // Lógica de movimentação será conectada ao analógico mobile no UI
  return (
    <Box args={[1, 2, 1]} position={pos} castShadow>
      <meshStandardMaterial color="#3b82f6" />
    </Box>
  )
}