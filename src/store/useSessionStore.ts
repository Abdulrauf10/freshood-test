"use client"
import { StateCreator, create } from "zustand"
import { persist, PersistOptions } from "zustand/middleware"
import Cookies from "js-cookie"

type SessionStoreInterface = {
  sessionId: string | null
  setSessionId: (id: string) => void
  removeSessionId: () => void
}

type MyPersist = (
  config: StateCreator<SessionStoreInterface>,
  options: PersistOptions<SessionStoreInterface>
) => StateCreator<SessionStoreInterface>

const useSessionStore = create<SessionStoreInterface>(
  (persist as MyPersist)(
    (set: any) => ({
      sessionId: null,
      setSessionId: (id: string) => {
        Cookies.set("sessionid", id)
        set({ sessionId: id })
      },
      removeSessionId: () => {
        Cookies.remove("sessionid")
        set({ sessionId: null })
      }
    }),
    {
      name: "session-store"
    }
  )
)

export default useSessionStore
