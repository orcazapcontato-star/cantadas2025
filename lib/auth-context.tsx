"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  bio?: string
  avatar_url?: string
  created_at?: string
  preferences?: {
    notifications: boolean
    newsletter: boolean
    darkMode: boolean
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("auth-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Failed to parse saved user:", e)
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const mockUser: User = {
        id: `user-${Date.now()}`,
        name: email.split("@")[0],
        email,
        created_at: new Date().toISOString(),
        preferences: {
          notifications: true,
          newsletter: true,
          darkMode: false,
        },
      }
      setUser(mockUser)
      localStorage.setItem("auth-user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const mockUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        created_at: new Date().toISOString(),
        preferences: {
          notifications: true,
          newsletter: true,
          darkMode: false,
        },
      }
      setUser(mockUser)
      localStorage.setItem("auth-user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Registration error:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem("auth-user")
  }

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false

    try {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("auth-user", JSON.stringify(updatedUser))
      window.dispatchEvent(new Event("user-updated"))
      return true
    } catch (error) {
      console.error("Update profile error:", error)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
