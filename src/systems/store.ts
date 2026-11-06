import { create } from 'zustand'

interface GameState {
  cameraMode: 'third' | 'first'
  inventory: { wood: number; mineral: number; material: number }
  heldItem: string | null
  difficulty: 'easy' | 'medium' | 'hard' | 'impossible'
  setCameraMode: (mode: 'third' | 'first') => void
  addToInventory: (type: 'wood' | 'mineral' | 'material', amount: number) => void
  setHeldItem: (item: string | null) => void
  setDifficulty: (diff: 'easy' | 'medium' | 'hard' | 'impossible') => void
}

export const useStore = create<GameState>((set) => ({
  cameraMode: 'third',
  inventory: { wood: 0, mineral: 0, material: 0 },
  heldItem: null,
  difficulty: 'medium',
  setCameraMode: (mode) => set({ cameraMode: mode }),
  addToInventory: (type, amount) => set((state) => ({
    inventory: { ...state.inventory, [type]: state.inventory[type] + amount }
  })),
  setHeldItem: (item) => set({ heldItem: item }),
  setDifficulty: (diff) => set({ difficulty: diff }),
}))