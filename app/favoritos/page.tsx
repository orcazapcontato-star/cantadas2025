"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, BookOpen, Lightbulb, Copy, Trash2 } from "lucide-react"
import Link from "next/link"
import { useFavorites } from "@/lib/favorites-context"

export default function FavoritosPage() {
  const { favorites, removeFavorite, getFavoritesByType } = useFavorites()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const cantadas = getFavoritesByType("cantada")
  const versos = getFavoritesByType("verso")
  const dicas = getFavoritesByType("dica")
  const mensagens = getFavoritesByType("mensagem")

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Cantadas Cristãs</h1>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/cantadas" className="text-muted-foreground hover:text-foreground transition-colors">
                Cantadas
              </Link>
              <Link href="/mensagens" className="text-muted-foreground hover:text-foreground transition-colors">
                Mensagens
              </Link>
              <Link href="/dicas" className="text-muted-foreground hover:text-foreground transition-colors">
                Dicas
              </Link>
              <Link href="/versos" className="text-muted-foreground hover:text-foreground transition-colors">
                Versículos
              </Link>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Heart className="h-4 w-4 mr-2" />
              Favoritos ({favorites.length})
            </Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Meus Favoritos</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Seus conteúdos salvos para fácil acesso e compartilhamento
          </p>
        </div>
      </section>

      {/* Favorites Content */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {favorites.length === 0 ? (
            <Card className="bg-card border-border text-center py-12">
              <CardContent>
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">Nenhum favorito ainda</h3>
                <p className="text-muted-foreground mb-6">
                  Comece explorando nosso conteúdo e salvando seus itens favoritos
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/cantadas">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Explorar Cantadas
                    </Button>
                  </Link>
                  <Link href="/versos">
                    <Button variant="outline">Ver Versículos</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="todos" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="todos">Todos ({favorites.length})</TabsTrigger>
                <TabsTrigger value="cantadas">Cantadas ({cantadas.length})</TabsTrigger>
                <TabsTrigger value="versos">Versículos ({versos.length})</TabsTrigger>
                <TabsTrigger value="dicas">Dicas ({dicas.length})</TabsTrigger>
                <TabsTrigger value="mensagens">Mensagens ({mensagens.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="todos">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((item) => (
                    <FavoriteCard key={item.id} item={item} onRemove={removeFavorite} onCopy={copyToClipboard} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="cantadas">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cantadas.map((item) => (
                    <FavoriteCard key={item.id} item={item} onRemove={removeFavorite} onCopy={copyToClipboard} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="versos">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {versos.map((item) => (
                    <FavoriteCard key={item.id} item={item} onRemove={removeFavorite} onCopy={copyToClipboard} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="dicas">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dicas.map((item) => (
                    <FavoriteCard key={item.id} item={item} onRemove={removeFavorite} onCopy={copyToClipboard} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mensagens">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mensagens.map((item) => (
                    <FavoriteCard key={item.id} item={item} onRemove={removeFavorite} onCopy={copyToClipboard} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </div>
  )
}

function FavoriteCard({
  item,
  onRemove,
  onCopy,
}: {
  item: any
  onRemove: (id: string) => void
  onCopy: (text: string) => void
}) {
  const getIcon = (type: string) => {
    switch (type) {
      case "cantada":
        return Heart
      case "verso":
        return BookOpen
      case "dica":
        return Lightbulb
      case "mensagem":
        return MessageCircle
      default:
        return Heart
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "cantada":
        return "Cantada"
      case "verso":
        return "Versículo"
      case "dica":
        return "Dica"
      case "mensagem":
        return "Mensagem"
      default:
        return type
    }
  }

  const IconComponent = getIcon(item.type)

  return (
    <Card className="bg-card border-border hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">
            <IconComponent className="h-3 w-3 mr-1" />
            {getTypeLabel(item.type)}
          </Badge>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" onClick={() => onCopy(item.content)}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onRemove(item.id)} className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {item.title && <CardTitle className="text-sm">{item.title}</CardTitle>}
      </CardHeader>
      <CardContent className="space-y-2">
        <blockquote className="text-foreground italic text-sm leading-relaxed">"{item.content}"</blockquote>
        {item.reference && <cite className="text-muted-foreground text-xs">{item.reference}</cite>}
        {item.category && (
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
