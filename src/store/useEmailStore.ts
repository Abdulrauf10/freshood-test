"use client"

import { StateCreator, create } from "zustand"
import { persist, PersistOptions } from "zustand/middleware"

interface EmailState {
  emailStore: string | null
  setEmailStore: (menu: string | null) => void
}

type MyPersist = (
  config: StateCreator<EmailState>,
  options: PersistOptions<EmailState>
) => StateCreator<EmailState>

export const useEmailStore = create<EmailState>()(
  (persist as MyPersist)(
    (set) => ({
      emailStore: null,
      setEmailStore: (menu) => set({ emailStore: menu })
    }),

    {
      name: "email-storage"
    }
  )
)
