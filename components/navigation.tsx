"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, User, LogOut, Star } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

interface NavigationProps {
  currentPage?: string
}

export function Navigation({ currentPage }: NavigationProps) {
  const { user, logout } = useAuth()

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Cantadas Cristãs</h1>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/cantadas"
              className={`transition-colors ${
                currentPage === "cantadas" ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Cantadas
            </Link>
            <Link
              href="/mensagens"
              className={`transition-colors ${
                currentPage === "mensagens" ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mensagens
            </Link>
            <Link
              href="/dicas"
              className={`transition-colors ${
                currentPage === "dicas" ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dicas
            </Link>
            <Link
              href="/versos"
              className={`transition-colors ${
                currentPage === "versos" ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Versículos
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm font-medium">{user.name}</div>
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">{user.email}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/favoritos" className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Favoritos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link href="/registro">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Criar Conta</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
