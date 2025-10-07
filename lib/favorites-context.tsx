"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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
  addFavorite: (item: Omit<FavoriteItem, "id" | "dateAdded">) => void
  removeFavorite: (id: string) => void
  isFavorite: (content: string) => boolean
  getFavoritesByType: (type: FavoriteItem["type"]) => FavoriteItem[]
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("cantadas-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("cantadas-favorites", JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (item: Omit<FavoriteItem, "id" | "dateAdded">) => {
    const newFavorite: FavoriteItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      dateAdded: new Date().toISOString(),
    }
    setFavorites((prev) => [newFavorite, ...prev])
  }

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id))
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
        isFavorite,
        getFavoritesByType,
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
