"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps {
  message: string
  type?: "success" | "error" | "info"
  onClose: () => void
}

export function Toast({ message, type = "success", onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom-5",
        type === "success" && "bg-green-500 text-white",
        type === "error" && "bg-red-500 text-white",
        type === "info" && "bg-blue-500 text-white",
      )}
    >
      <span>{message}</span>
      <button onClick={onClose} className="hover:opacity-80">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
