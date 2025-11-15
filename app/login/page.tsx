"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetSuccess, setResetSuccess] = useState("")
  const [resetLoading, setResetLoading] = useState(false)

  const { login, isLoading } = useAuth()
  const router = useRouter()

  // Login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido")
      return
    }

    const success = await login(email, password)
    if (success) {
      router.push("/")
    } else {
      setError("Email ou senha incorretos")
      setPassword("")
    }
  }

  // Redefinir senha
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetSuccess("")
    setError("")

    if (!resetEmail) {
      setError("Por favor, insira seu email")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(resetEmail)) {
      setError("Por favor, insira um email válido")
      return
    }

    setResetLoading(true)
    try {
      // Substitua pela chamada real da API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setResetSuccess(
        "Se o email estiver cadastrado, enviaremos um link para redefinir sua senha."
      )
      setResetEmail("")
    } catch (err) {
      setError("Ocorreu um erro. Tente novamente mais tarde.")
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Cantadas Cristãs</h1>
          </Link>
          <p className="text-muted-foreground">Entre na sua conta</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="text-center">
            <CardTitle>Fazer Login</CardTitle>
            <CardDescription>Entre com suas credenciais para acessar sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="flex justify-end text-sm mt-1">
                  <button
                    type="button"
                    onClick={() => setShowResetModal(true)}
                    className="text-primary hover:underline font-medium"
                  >
                    Esqueceu sua senha?
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Não tem uma conta?{" "}
                <Link href="/registro" className="text-primary hover:underline font-medium">
                  Criar conta
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="text-muted-foreground hover:text-foreground text-sm">
            ← Voltar ao início
          </Link>
        </div>
      </div>

      {/* Modal de redefinição de senha */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">Redefinir senha</h2>
            <p className="text-muted-foreground mb-4 text-sm">
              Digite o endereço de e-mail associado à sua conta e enviaremos um link para redefinir sua senha.
            </p>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <Input
                type="email"
                placeholder="seu@email.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                disabled={resetLoading}
              />
              {resetSuccess && (
                <Alert variant="default">
                  <AlertDescription>{resetSuccess}</AlertDescription>
                </Alert>
              )}
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowResetModal(false)}
                  disabled={resetLoading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={resetLoading}>
                  {resetLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    "Enviar link"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
