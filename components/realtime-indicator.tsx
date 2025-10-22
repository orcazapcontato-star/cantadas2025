"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff } from "lucide-react"

export function RealtimeIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [lastSync, setLastSync] = useState<Date>(new Date())

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Update sync time on storage changes
    const handleStorageChange = () => {
      setLastSync(new Date())
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("favorites-updated", handleStorageChange)
    window.addEventListener("profile-updated", handleStorageChange)

    // Sync every 5 seconds
    const interval = setInterval(() => {
      setLastSync(new Date())
    }, 5000)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("favorites-updated", handleStorageChange)
      window.removeEventListener("profile-updated", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const getTimeAgo = () => {
    const seconds = Math.floor((new Date().getTime() - lastSync.getTime()) / 1000)
    if (seconds < 5) return "agora"
    if (seconds < 60) return `${seconds}s atrás`
    return "há 1m"
  }

  return (
    <Badge variant={isOnline ? "default" : "destructive"} className="gap-1.5 animate-in fade-in">
      {isOnline ? (
        <>
          <Wifi className="h-3 w-3 animate-pulse" />
          <span className="text-xs">Sincronizado {getTimeAgo()}</span>
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3" />
          <span className="text-xs">Offline</span>
        </>
      )}
    </Badge>
  )
}

export default RealtimeIndicator
