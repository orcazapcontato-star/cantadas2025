"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Heart,
  MessageCircle,
  BookOpen,
  Lightbulb,
  Copy,
  Trash2,
  Search,
  Download,
  Grid3x3,
  List,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { useFavorites } from "@/lib/favorites-context"
import { useToast } from "@/hooks/use-toast"
import Navigation from "@/components/navigation"

type ViewMode = "grid" | "list"
type SortOption = "recent" | "oldest" | "alphabetical"

export default function FavoritosPage() {
  const { favorites, removeFavorite, getFavoritesByType, clearAllFavorites } = useFavorites()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("recent")
  const [showClearDialog, setShowClearDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  const cantadas = getFavoritesByType("cantada")
  const versos = getFavoritesByType("verso")
  const dicas = getFavoritesByType("dica")
  const mensagens = getFavoritesByType("mensagem")

  const filteredAndSortedFavorites = useMemo(() => {
    const filtered = favorites.filter(
      (item) =>
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    switch (sortBy) {
      case "recent":
        return filtered.reverse()
      case "oldest":
        return filtered
      case "alphabetical":
        return filtered.sort((a, b) => a.content.localeCompare(b.content))
      default:
        return filtered
    }
  }, [favorites, searchQuery, sortBy])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado!",
      description: "Conteúdo copiado para a área de transferência",
    })
  }

  const handleRemove = (id: string) => {
    removeFavorite(id)
    setItemToDelete(null)
    toast({
      title: "Removido!",
      description: "Item removido dos favoritos",
    })
  }

  const handleClearAll = () => {
    clearAllFavorites()
    setShowClearDialog(false)
    toast({
      title: "Favoritos limpos!",
      description: "Todos os favoritos foram removidos",
    })
  }

  const exportFavorites = () => {
    const content = favorites
      .map((item) => {
        return `${getTypeLabel(item.type).toUpperCase()}\n${item.title ? item.title + "\n" : ""}${item.content}\n${item.reference ? item.reference : ""}\n${item.category ? "Categoria: " + item.category : ""}\n\n---\n\n`
      })
      .join("")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "meus-favoritos-cristãos.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Exportado!",
      description: "Seus favoritos foram exportados com sucesso",
    })
  }

  const shareAll = () => {
    const content = favorites.map((item) => item.content).join("\n\n")
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(content)}`
    window.open(whatsappUrl, "_blank")
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Meus Favoritos</h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Seus conteúdos salvos para fácil acesso e compartilhamento
          </p>

          {favorites.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto">
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{favorites.length}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">{cantadas.length}</div>
                  <div className="text-sm text-muted-foreground">Cantadas</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-1">{versos.length}</div>
                  <div className="text-sm text-muted-foreground">Versículos</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{dicas.length + mensagens.length}</div>
                  <div className="text-sm text-muted-foreground">Dicas & Msgs</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Favorites Content */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {favorites.length === 0 ? (
            <Card className="bg-card border-border text-center py-16">
              <CardContent>
                <Heart className="h-20 w-20 text-muted-foreground mx-auto mb-6 opacity-50" />
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">Nenhum favorito ainda</h3>
                <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto">
                  Comece explorando nosso conteúdo e salvando seus itens favoritos
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/cantadas">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                      <Heart className="h-4 w-4 mr-2" />
                      Explorar Cantadas
                    </Button>
                  </Link>
                  <Link href="/versos">
                    <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Ver Versículos
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-8 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar nos favoritos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Mais recentes</SelectItem>
                        <SelectItem value="oldest">Mais antigos</SelectItem>
                        <SelectItem value="alphabetical">Alfabético</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex border border-border rounded-md">
                      <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid3x3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={exportFavorites}>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                  <Button variant="outline" size="sm" onClick={shareAll}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar Todos
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowClearDialog(true)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Limpar Todos
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="todos" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
                  <TabsTrigger value="todos">
                    Todos{" "}
                    <Badge variant="secondary" className="ml-2">
                      {filteredAndSortedFavorites.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="cantadas">
                    Cantadas{" "}
                    <Badge variant="secondary" className="ml-2">
                      {cantadas.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="versos">
                    Versículos{" "}
                    <Badge variant="secondary" className="ml-2">
                      {versos.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="dicas">
                    Dicas{" "}
                    <Badge variant="secondary" className="ml-2">
                      {dicas.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="mensagens">
                    Mensagens{" "}
                    <Badge variant="secondary" className="ml-2">
                      {mensagens.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="todos">
                  {filteredAndSortedFavorites.length === 0 ? (
                    <Card className="bg-card border-border text-center py-12">
                      <CardContent>
                        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <p className="text-muted-foreground">Nenhum resultado encontrado</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                      {filteredAndSortedFavorites.map((item) => (
                        <FavoriteCard
                          key={item.id}
                          item={item}
                          onRemove={(id) => setItemToDelete(id)}
                          onCopy={copyToClipboard}
                          viewMode={viewMode}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="cantadas">
                  <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                    {cantadas.map((item) => (
                      <FavoriteCard
                        key={item.id}
                        item={item}
                        onRemove={(id) => setItemToDelete(id)}
                        onCopy={copyToClipboard}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="versos">
                  <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                    {versos.map((item) => (
                      <FavoriteCard
                        key={item.id}
                        item={item}
                        onRemove={(id) => setItemToDelete(id)}
                        onCopy={copyToClipboard}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="dicas">
                  <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                    {dicas.map((item) => (
                      <FavoriteCard
                        key={item.id}
                        item={item}
                        onRemove={(id) => setItemToDelete(id)}
                        onCopy={copyToClipboard}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="mensagens">
                  <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                    {mensagens.map((item) => (
                      <FavoriteCard
                        key={item.id}
                        item={item}
                        onRemove={(id) => setItemToDelete(id)}
                        onCopy={copyToClipboard}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </section>

      <AlertDialog open={!!itemToDelete} onOpenChange={() => setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover favorito?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O item será removido permanentemente dos seus favoritos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => itemToDelete && handleRemove(itemToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limpar todos os favoritos?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todos os {favorites.length} itens favoritos serão removidos
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearAll}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Limpar Todos
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function FavoriteCard({
  item,
  onRemove,
  onCopy,
  viewMode,
}: {
  item: any
  onRemove: (id: string) => void
  onCopy: (text: string) => void
  viewMode: ViewMode
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

  const shareItem = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(item.content)}`
    window.open(whatsappUrl, "_blank")
  }

  const IconComponent = getIcon(item.type)

  if (viewMode === "list") {
    return (
      <Card className="bg-card border-border hover:shadow-md transition-all group">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <IconComponent className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {getTypeLabel(item.type)}
                </Badge>
                {item.category && (
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                )}
              </div>
              {item.title && <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>}
              <blockquote className="text-foreground italic text-sm leading-relaxed mb-1">"{item.content}"</blockquote>
              {item.reference && <cite className="text-muted-foreground text-xs">{item.reference}</cite>}
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button variant="ghost" size="sm" onClick={() => onCopy(item.content)}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={shareItem}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border hover:shadow-lg transition-all group hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">
            <IconComponent className="h-3 w-3 mr-1" />
            {getTypeLabel(item.type)}
          </Badge>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" onClick={() => onCopy(item.content)}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={shareItem}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {item.title && <CardTitle className="text-base">{item.title}</CardTitle>}
      </CardHeader>
      <CardContent className="space-y-2">
        <blockquote className="text-foreground italic text-sm leading-relaxed">"{item.content}"</blockquote>
        {item.reference && <cite className="text-muted-foreground text-xs block">{item.reference}</cite>}
        {item.category && (
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
