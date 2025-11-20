"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/lib/auth-context"

export interface FavoriteItem {
  id: string
  type: "cantada" | "verso" | "dica" | "mensagem"
  title: string
  content: string
  category?: string
  reference?: string
  dateAdded: string
}

interface FavoritesContextType {
  favorites: FavoriteItem[]
  addFavorite: (item: Omit<FavoriteItem, "id" | "dateAdded">) => Promise<void>
  removeFavorite: (id: string) => Promise<void>
  clearAllFavorites: () => Promise<void>
  isFavorite: (content: string) => boolean
  getFavoritesByType: (type: FavoriteItem["type"]) => FavoriteItem[]
  isLoading: boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const savedFavorites = localStorage.getItem("cantadas-favorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (e) {
        console.error("Failed to parse saved favorites:", e)
      }
    }
  }, [])

  const addFavorite = async (item: Omit<FavoriteItem, "id" | "dateAdded">) => {
    const newFavorite: FavoriteItem = {
      ...item,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
    }
    const updated = [newFavorite, ...favorites]
    setFavorites(updated)
    localStorage.setItem("cantadas-favorites", JSON.stringify(updated))
    window.dispatchEvent(new Event("favorites-updated"))
  }

  const removeFavorite = async (id: string) => {
    const updated = favorites.filter((fav) => fav.id !== id)
    setFavorites(updated)
    localStorage.setItem("cantadas-favorites", JSON.stringify(updated))
    window.dispatchEvent(new Event("favorites-updated"))
  }

  const clearAllFavorites = async () => {
    setFavorites([])
    localStorage.removeItem("cantadas-favorites")
    window.dispatchEvent(new Event("favorites-updated"))
  }

  const isFavorite = (content: string) => {
    return favorites.some((fav) => fav.content === content)
  }

  const getFavoritesByType = (type: FavoriteItem["type"]) => {
    return favorites.filter((fav) => fav.type === type)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        clearAllFavorites,
        isFavorite,
        getFavoritesByType,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
