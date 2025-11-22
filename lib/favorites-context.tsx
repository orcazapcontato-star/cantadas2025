"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/lib/auth-context"
import { createClient } from "@/lib/supabase/client"

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
  const supabase = createClient()

  useEffect(() => {
    if (user && supabase) {
      loadFavoritesFromSupabase()
    } else {
      loadFavoritesFromLocalStorage()
    }
  }, [user, supabase])

  const loadFavoritesFromLocalStorage = () => {
    const savedFavorites = localStorage.getItem("cantadas-favorites")
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites)
        setFavorites(
          parsed.map((fav: any) => ({
            ...fav,
            dateAdded: fav.dateAdded || fav.date_added,
          })),
        )
      } catch (e) {
        console.error("Failed to parse saved favorites:", e)
      }
    }
  }

  const loadFavoritesFromSupabase = async () => {
    if (!user || !supabase) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("date_added", { ascending: false })

      if (error) {
        console.error("Error loading favorites:", error)
        loadFavoritesFromLocalStorage()
        return
      }

      setFavorites(
        (data || []).map((fav: any) => ({
          id: fav.id,
          type: fav.type,
          title: fav.title,
          content: fav.content,
          category: fav.category,
          reference: fav.reference,
          dateAdded: fav.date_added,
        })),
      )
    } catch (error) {
      console.error("Failed to load favorites:", error)
      loadFavoritesFromLocalStorage()
    } finally {
      setIsLoading(false)
    }
  }

  const addFavorite = async (item: Omit<FavoriteItem, "id" | "dateAdded">) => {
    if (user && supabase) {
      try {
        const { data, error } = await supabase
          .from("favorites")
          .insert({
            user_id: user.id,
            type: item.type,
            title: item.title,
            content: item.content,
            category: item.category,
            reference: item.reference,
          })
          .select()

        if (error) {
          console.error("Error adding favorite:", error)
          return
        }

        if (data && data[0]) {
          const newFavorite: FavoriteItem = {
            id: data[0].id,
            type: data[0].type,
            title: data[0].title,
            content: data[0].content,
            category: data[0].category,
            reference: data[0].reference,
            dateAdded: data[0].date_added,
          }
          setFavorites([newFavorite, ...favorites])
        }
      } catch (error) {
        console.error("Failed to add favorite:", error)
      }
    } else {
      const newFavorite: FavoriteItem = {
        ...item,
        id: Date.now().toString(),
        dateAdded: new Date().toISOString(),
      }
      const updated = [newFavorite, ...favorites]
      setFavorites(updated)
      localStorage.setItem("cantadas-favorites", JSON.stringify(updated))
    }

    window.dispatchEvent(new Event("favorites-updated"))
  }

  const removeFavorite = async (id: string) => {
    if (user && supabase) {
      try {
        const { error } = await supabase.from("favorites").delete().eq("id", id)

        if (error) {
          console.error("Error removing favorite:", error)
          return
        }

        const updated = favorites.filter((fav) => fav.id !== id)
        setFavorites(updated)
      } catch (error) {
        console.error("Failed to remove favorite:", error)
      }
    } else {
      const updated = favorites.filter((fav) => fav.id !== id)
      setFavorites(updated)
      localStorage.setItem("cantadas-favorites", JSON.stringify(updated))
    }

    window.dispatchEvent(new Event("favorites-updated"))
  }

  const clearAllFavorites = async () => {
    if (user && supabase) {
      try {
        const { error } = await supabase.from("favorites").delete().eq("user_id", user.id)

        if (error) {
          console.error("Error clearing favorites:", error)
          return
        }

        setFavorites([])
      } catch (error) {
        console.error("Failed to clear favorites:", error)
      }
    } else {
      setFavorites([])
      localStorage.removeItem("cantadas-favorites")
    }

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
