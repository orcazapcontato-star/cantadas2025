"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useFavorites } from "@/lib/favorites-context"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Heart, MessageSquare, BookOpen, Calendar, Settings, User, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRealtimeSync } from "@/lib/realtime-sync"

export default function PerfilPage() {
  const { user, updateProfile, logout } = useAuth()
  const { favorites } = useFavorites()
  const { stats: realtimeStats } = useRealtimeSync()
  const { toast } = useToast()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
  })

  const [preferences, setPreferences] = useState({
    notifications: user?.preferences?.notifications ?? true,
    newsletter: user?.preferences?.newsletter ?? true,
    darkMode: user?.preferences?.darkMode ?? false,
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleSaveProfile = async () => {
    const success = await updateProfile({
      ...formData,
      preferences,
    })

    if (success) {
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      })
      setIsEditing(false)
    } else {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      })
    }
  }

  const stats = [
    {
      label: "Cantadas Favoritas",
      value: realtimeStats.totalCantadas,
      icon: Heart,
      color: "text-pink-600",
    },
    {
      label: "Mensagens Salvas",
      value: favorites.filter((f) => f.type === "mensagem").length,
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      label: "Dicas Salvas",
      value: realtimeStats.totalDicas,
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      label: "Dias Conosco",
      value: user.createdAt ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0,
      icon: Calendar,
      color: "text-amber-600",
    },
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />

      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Header com Avatar e Info Básica */}
        <div className="mb-8">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <p className="text-muted-foreground mb-4">{user.email}</p>
                  {user.bio && <p className="text-sm text-muted-foreground max-w-2xl">{user.bio}</p>}
                  <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                    <Badge variant="secondary">
                      <Heart className="h-3 w-3 mr-1" />
                      Membro desde {user.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear()}
                    </Badge>
                    <Badge variant="secondary">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {favorites.length} Favoritos
                    </Badge>
                  </div>
                </div>

                <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Cancelar" : "Editar Perfil"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <stat.icon className={`h-8 w-8 mb-2 ${stat.color}`} />
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs de Conteúdo */}
        <Tabs defaultValue="perfil" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="perfil">
              <User className="h-4 w-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="configuracoes">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </TabsTrigger>
            <TabsTrigger value="privacidade">
              <Shield className="h-4 w-4 mr-2" />
              Privacidade
            </TabsTrigger>
          </TabsList>

          {/* Tab: Perfil */}
          <TabsContent value="perfil">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>Atualize suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea
                      id="bio"
                      placeholder="Conte um pouco sobre você..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatar">URL da Foto de Perfil</Label>
                    <Input
                      id="avatar"
                      placeholder="https://exemplo.com/foto.jpg"
                      value={formData.avatar}
                      onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3">
                    <Button onClick={handleSaveProfile} className="flex-1">
                      Salvar Alterações
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                      Cancelar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Configurações */}
          <TabsContent value="configuracoes">
            <Card>
              <CardHeader>
                <CardTitle>Preferências</CardTitle>
                <CardDescription>Personalize sua experiência no app</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications" className="text-base">
                      Notificações
                    </Label>
                    <p className="text-sm text-muted-foreground">Receba notificações sobre novidades</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={preferences.notifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, notifications: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newsletter" className="text-base">
                      Newsletter
                    </Label>
                    <p className="text-sm text-muted-foreground">Receba dicas e conteúdos por email</p>
                  </div>
                  <Switch
                    id="newsletter"
                    checked={preferences.newsletter}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, newsletter: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="darkMode" className="text-base">
                      Modo Escuro
                    </Label>
                    <p className="text-sm text-muted-foreground">Ativar tema escuro (em breve)</p>
                  </div>
                  <Switch
                    id="darkMode"
                    checked={preferences.darkMode}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, darkMode: checked })}
                    disabled
                  />
                </div>

                <Button onClick={handleSaveProfile} className="w-full">
                  Salvar Preferências
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Privacidade */}
          <TabsContent value="privacidade">
            <Card>
              <CardHeader>
                <CardTitle>Privacidade e Segurança</CardTitle>
                <CardDescription>Gerencie suas configurações de privacidade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Alterar Senha</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Mantenha sua conta segura alterando sua senha regularmente
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Alterar Senha
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Dados da Conta</h3>
                    <p className="text-sm text-muted-foreground mb-4">Baixe uma cópia de todos os seus dados salvos</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Exportar Dados
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg border-destructive/50">
                    <h3 className="font-semibold mb-2 text-destructive">Zona de Perigo</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ações irreversíveis que afetam permanentemente sua conta
                    </p>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        if (confirm("Tem certeza que deseja sair?")) {
                          logout()
                          router.push("/")
                        }
                      }}
                    >
                      Sair da Conta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
