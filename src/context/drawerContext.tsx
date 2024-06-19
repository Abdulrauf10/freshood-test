"use client"
import React, { createContext, useState, useContext } from "react"

interface DrawerContextProps {
  activeDrawer: string
  setActiveDrawer: (value: string) => void
  selectedEditStoreInfo: string
  setSelectedEditStoreInfo: (value: string) => void
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined)

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [activeDrawer, setActiveDrawer] = useState<string>("setting")
  const [selectedEditStoreInfo, setSelectedEditStoreInfo] = useState<string>("")

  return (
    <DrawerContext.Provider
      value={{
        activeDrawer,
        setActiveDrawer,
        selectedEditStoreInfo,
        setSelectedEditStoreInfo
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider")
  }
  return context
}
