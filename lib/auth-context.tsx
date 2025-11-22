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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem("auth_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simple validation - in production, this would verify against a backend
      if (!email || !password) {
        console.error("Email and password required")
        setIsLoading(false)
        return false
      }

      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password)

      if (!foundUser) {
        console.error("Invalid email or password")
        setIsLoading(false)
        return false
      }

      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        bio: foundUser.bio,
        avatar_url: foundUser.avatar_url,
        created_at: foundUser.created_at,
        preferences: foundUser.preferences,
      }

      setUser(userData)
      localStorage.setItem("auth_user", JSON.stringify(userData))
      localStorage.setItem("auth_token", `token_${foundUser.id}`)
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
      if (!name || !email || !password) {
        console.error("All fields required")
        setIsLoading(false)
        return false
      }

      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")

      if (storedUsers.some((u: any) => u.email === email)) {
        console.error("Email already registered")
        setIsLoading(false)
        return false
      }

      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password,
        bio: "",
        avatar_url: "",
        created_at: new Date().toISOString(),
        preferences: {
          notifications: true,
          newsletter: true,
          darkMode: false,
        },
      }

      storedUsers.push(newUser)
      localStorage.setItem("users", JSON.stringify(storedUsers))

      const userData: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        bio: newUser.bio,
        avatar_url: newUser.avatar_url,
        created_at: newUser.created_at,
        preferences: newUser.preferences,
      }

      setUser(userData)
      localStorage.setItem("auth_user", JSON.stringify(userData))
      localStorage.setItem("auth_token", `token_${newUser.id}`)
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
    localStorage.removeItem("auth_user")
    localStorage.removeItem("auth_token")
  }

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false

    try {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("auth_user", JSON.stringify(updatedUser))

      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const userIndex = storedUsers.findIndex((u: any) => u.id === user.id)

      if (userIndex !== -1) {
        storedUsers[userIndex] = { ...storedUsers[userIndex], ...updates }
        localStorage.setItem("users", JSON.stringify(storedUsers))
      }

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
