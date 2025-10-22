"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface RealtimeStats {
  totalFavorites: number
  totalCantadas: number
  totalDicas: number
  totalVersos: number
  lastUpdate: number
}

interface RealtimeSyncContextType {
  stats: RealtimeStats
  updateStats: () => void
}

const RealtimeSyncContext = createContext<RealtimeSyncContextType | undefined>(undefined)

export function RealtimeSyncProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<RealtimeStats>({
    totalFavorites: 0,
    totalCantadas: 0,
    totalDicas: 0,
    totalVersos: 0,
    lastUpdate: Date.now(),
  })

  const updateStats = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    const cantadas = favorites.filter((f: any) => f.type === "cantada").length
    const dicas = favorites.filter((f: any) => f.type === "dica").length
    const versos = favorites.filter((f: any) => f.type === "verso").length

    setStats({
      totalFavorites: favorites.length,
      totalCantadas: cantadas,
      totalDicas: dicas,
      totalVersos: versos,
      lastUpdate: Date.now(),
    })
  }

  useEffect(() => {
    updateStats()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "favorites" || e.key === "user") {
        updateStats()
      }
    }

    const handleCustomUpdate = () => {
      updateStats()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("favorites-updated", handleCustomUpdate)
    window.addEventListener("user-updated", handleCustomUpdate)

    const interval = setInterval(updateStats, 5000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("favorites-updated", handleCustomUpdate)
      window.removeEventListener("user-updated", handleCustomUpdate)
      clearInterval(interval)
    }
  }, [])

  return <RealtimeSyncContext.Provider value={{ stats, updateStats }}>{children}</RealtimeSyncContext.Provider>
}

export function useRealtimeSync() {
  const context = useContext(RealtimeSyncContext)
  if (context === undefined) {
    throw new Error("useRealtimeSync must be used within a RealtimeSyncProvider")
  }
  return context
}
