"use client"
import create from "zustand"

interface SidebarState {
  isExpanded: boolean
  toggleSidebar: () => void
}

const useSidebarStore = create<SidebarState>((set) => ({
  isExpanded: true,
  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded }))
}))

export default useSidebarStore
