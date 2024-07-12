"use client"

import { StateCreator, create } from "zustand"
import { persist, PersistOptions } from "zustand/middleware"

interface DataState {
  isEdit: boolean
  payload: any
  setIsEdit: (data: boolean) => void
  setPayload: (data: any) => void
}

type MyPersist = (
  config: StateCreator<DataState>,
  options: PersistOptions<DataState>
) => StateCreator<DataState>

export const useDataEdit = create<DataState>()(
  (persist as MyPersist)(
    (set) => ({
      isEdit: false,
      payload: null,
      setIsEdit: (data) => set({ isEdit: data }),
      setPayload: (data) => set({ payload: data })
    }),

    {
      name: "data-storage"
    }
  )
)
