"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Heart, User, LogOut, Star, Menu } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRealtimeSync } from "@/lib/realtime-sync"
import { useState } from "react"

interface NavigationProps {
  currentPage?: string
}

export function Navigation({ currentPage }: NavigationProps) {
  const { user, logout } = useAuth()
  const { stats } = useRealtimeSync()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/cantadas", label: "Cantadas", page: "cantadas" },
    { href: "/mensagens", label: "Mensagens", page: "mensagens" },
    { href: "/dicas", label: "Dicas", page: "dicas" },
    { href: "/versos", label: "Versículos", page: "versos" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-lg sm:text-xl font-bold text-foreground">Cantadas Cristãs</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors text-sm font-medium ${
                  currentPage === link.page ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">{user.name}</div>
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">{user.email}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Meu Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favoritos" className="flex items-center gap-2 cursor-pointer">
                      <Star className="h-4 w-4" />
                      Favoritos
                      {stats.totalFavorites > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {stats.totalFavorites}
                        </Badge>
                      )}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-600 cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Criar Conta
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="lg:hidden flex items-center gap-2">
            {user && (
              <Link href="/favoritos">
                <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                  <Star className="h-5 w-5" />
                  {stats.totalFavorites > 0 && (
                    <Badge
                      variant="secondary"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {stats.totalFavorites}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <Heart className="h-6 w-6 text-primary" />
                      <span className="font-bold text-foreground">Menu</span>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-4 mb-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-lg font-medium transition-colors py-2 ${
                          currentPage === link.page ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto border-t border-border pt-6">
                    {user ? (
                      <div className="space-y-4">
                        <div className="px-2">
                          <div className="text-sm font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={() => {
                            setMobileMenuOpen(false)
                            window.location.href = "/perfil"
                          }}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Meu Perfil
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={() => {
                            setMobileMenuOpen(false)
                            window.location.href = "/favoritos"
                          }}
                        >
                          <Star className="h-4 w-4 mr-2" />
                          Favoritos
                          {stats.totalFavorites > 0 && (
                            <Badge variant="secondary" className="ml-auto">
                              {stats.totalFavorites}
                            </Badge>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => {
                            logout()
                            setMobileMenuOpen(false)
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sair
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block">
                          <Button variant="outline" className="w-full bg-transparent">
                            Entrar
                          </Button>
                        </Link>
                        <Link href="/registro" onClick={() => setMobileMenuOpen(false)} className="block">
                          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            Criar Conta
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
