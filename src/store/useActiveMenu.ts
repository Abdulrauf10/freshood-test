"use client"

import { StateCreator, create } from "zustand"
import { persist, PersistOptions } from "zustand/middleware"

interface SidebarState {
  activeMenu: number | null
  setActiveMenu: (menu: number | null) => void
  removeActiveMenu: () => void
}

type MyPersist = (
  config: StateCreator<SidebarState>,
  options: PersistOptions<SidebarState>
) => StateCreator<SidebarState>

export const useActiveMenu = create<SidebarState>()(
  (persist as MyPersist)(
    (set) => ({
      activeMenu: null,
      setActiveMenu: (menu) => set({ activeMenu: menu }),
      removeActiveMenu: () => {
        set({ activeMenu: null })
      }
    }),

    {
      name: "sidebar-storage"
    }
  )
)
