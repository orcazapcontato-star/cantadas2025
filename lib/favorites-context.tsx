"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface FavoriteItem {
  content: string
  type: string
}

interface FavoritesContextType {
  favorites: FavoriteItem[]
  addFavorite: (item: FavoriteItem) => void
  removeFavorite: (content: string) => void
  clearAllFavorites: () => void
  isFavorite: (content: string) => boolean
  getFavoritesByType: (type: FavoriteItem["type"]) => FavoriteItem[]
  isLoading: boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const addFavorite = (item: FavoriteItem) => {
    setFavorites([...favorites, item])
  }

  const removeFavorite = (content: string) => {
    setFavorites(favorites.filter((fav) => fav.content !== content))
  }

  const clearAllFavorites = () => {
    setFavorites([])
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
