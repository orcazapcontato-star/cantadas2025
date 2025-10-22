"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Copy, Search, Filter } from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { useFavorites } from "@/lib/favorites-context"
import { useAuth } from "@/lib/auth-context"

const verses = [
  {
    id: 1,
    text: "Acima de tudo, revistam-se do amor, que é o elo perfeito.",
    reference: "Colossenses 3:14",
    category: "Amor",
    theme: "União",
  },
  {
    id: 2,
    text: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.",
    reference: "1 Coríntios 13:4",
    category: "Amor",
    theme: "Caráter",
  },
  {
    id: 3,
    text: "Aquele que encontra uma esposa encontra algo excelente; recebeu uma bênção do Senhor.",
    reference: "Provérbios 18:22",
    category: "Casamento",
    theme: "Bênção",
  },
  {
    id: 4,
    text: "Sejam bondosos e compassivos uns para com os outros, perdoando-se mutuamente, assim como Deus os perdoou em Cristo.",
    reference: "Efésios 4:32",
    category: "Perdão",
    theme: "Compaixão",
  },
  {
    id: 5,
    text: "Como o ferro afia o ferro, assim um homem afia o outro.",
    reference: "Provérbios 27:17",
    category: "Crescimento",
    theme: "Mútuo Apoio",
  },
  {
    id: 6,
    text: "Novamente lhes digo: se dois de vocês concordarem na terra em qualquer assunto sobre o qual pedirem, isso lhes será feito por meu Pai que está nos céus.",
    reference: "Mateus 18:19",
    category: "Oração",
    theme: "União Espiritual",
  },
  {
    id: 7,
    text: "Portanto, o que Deus uniu, ninguém separe.",
    reference: "Mateus 19:6",
    category: "Casamento",
    theme: "Compromisso",
  },
  {
    id: 8,
    text: "O amigo ama em todos os momentos; é um irmão na adversidade.",
    reference: "Provérbios 17:17",
    category: "Amizade",
    theme: "Fidelidade",
  },
  {
    id: 9,
    text: "Maridos, amem suas mulheres, assim como Cristo amou a igreja e entregou-se a si mesmo por ela.",
    reference: "Efésios 5:25",
    category: "Casamento",
    theme: "Sacrifício",
  },
  {
    id: 10,
    text: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento.",
    reference: "Provérbios 3:5",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 11,
    text: "Deitem-se em paz e durmam tranquilos, pois só tu, Senhor, me fazes viver em segurança.",
    reference: "Salmos 4:8",
    category: "Paz",
    theme: "Segurança",
  },
  {
    id: 12,
    text: "Tudo tem o seu tempo determinado, e há tempo para todo propósito debaixo do céu.",
    reference: "Eclesiastes 3:1",
    category: "Tempo",
    theme: "Paciência",
  },
  {
    id: 13,
    text: "Que o Senhor faça resplandecer o seu rosto sobre você e lhe conceda paz.",
    reference: "Números 6:26",
    category: "Paz",
    theme: "Bênção",
  },
  {
    id: 14,
    text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",
    reference: "João 3:16",
    category: "Amor",
    theme: "Sacrifício Divino",
  },
  {
    id: 15,
    text: "Não há medo no amor; antes, o amor perfeito expele o medo.",
    reference: "1 João 4:18",
    category: "Amor",
    theme: "Confiança",
  },
  {
    id: 16,
    text: "Que a graça do Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo estejam com todos vocês.",
    reference: "2 Coríntios 13:14",
    category: "Graça",
    theme: "Comunhão",
  },
  {
    id: 17,
    text: "Honra teu pai e tua mãe, para que tenhas vida longa na terra que o Senhor, teu Deus, te dá.",
    reference: "Êxodo 20:12",
    category: "Família",
    theme: "Respeito",
  },
  {
    id: 18,
    text: "Que cada um de vocês saiba controlar o seu próprio corpo de forma santa e honrosa.",
    reference: "1 Tessalonicenses 4:4",
    category: "Pureza",
    theme: "Autocontrole",
  },
  {
    id: 19,
    text: "Amai-vos uns aos outros com amor fraternal; prefiram-se mutuamente em honra.",
    reference: "Romanos 12:10",
    category: "Amor",
    theme: "Fraternidade",
  },
  {
    id: 20,
    text: "Porque o amor cobre multidão de pecados.",
    reference: "1 Pedro 4:8",
    category: "Perdão",
    theme: "Redenção",
  },
  {
    id: 21,
    text: "Que a paz de Cristo controle seus corações, pois para isso vocês foram chamados como membros de um só corpo.",
    reference: "Colossenses 3:15",
    category: "Paz",
    theme: "Unidade",
  },
  {
    id: 22,
    text: "Portanto, como escolhidos de Deus, santos e amados, revistam-se de compaixão, bondade, humildade, mansidão e paciência.",
    reference: "Colossenses 3:12",
    category: "Caráter",
    theme: "Virtudes",
  },
  {
    id: 23,
    text: "Que o Senhor abençoe você e o guarde; que o Senhor faça resplandecer o seu rosto sobre você.",
    reference: "Números 6:24-25",
    category: "Bênção",
    theme: "Proteção",
  },
  {
    id: 24,
    text: "Porque nós andamos por fé, não por vista.",
    reference: "2 Coríntios 5:7",
    category: "Fé",
    theme: "Confiança",
  },
  {
    id: 25,
    text: "Que o Senhor responda quando você clamar; que o Deus de Jacó o proteja.",
    reference: "Salmos 20:1",
    category: "Oração",
    theme: "Proteção",
  },
  {
    id: 26,
    text: "Porque somos feitura de Deus, criados em Cristo Jesus para fazer boas obras.",
    reference: "Efésios 2:10",
    category: "Propósito",
    theme: "Chamado",
  },
  {
    id: 27,
    text: "Que o Senhor dirija seu coração para o amor de Deus e para a perseverança de Cristo.",
    reference: "2 Tessalonicenses 3:5",
    category: "Amor",
    theme: "Perseverança",
  },
  {
    id: 28,
    text: "Porque o Senhor é bom; a sua misericórdia dura para sempre.",
    reference: "Salmos 100:5",
    category: "Misericórdia",
    theme: "Eternidade",
  },
  {
    id: 29,
    text: "Que a graça e a paz de Deus, nosso Pai, e do Senhor Jesus Cristo estejam com você.",
    reference: "Filipenses 1:2",
    category: "Graça",
    theme: "Paz",
  },
  {
    id: 30,
    text: "Porque Deus não nos deu espírito de medo, mas de poder, de amor e de bom senso.",
    reference: "2 Timóteo 1:7",
    category: "Coragem",
    theme: "Força",
  },
]

const allCategories = [
  "Todos",
  "Amor",
  "Casamento",
  "Amizade",
  "Perdão",
  "Crescimento",
  "Oração",
  "Confiança",
  "Paz",
  "Fé",
  "Família",
  "Pureza",
  "Caráter",
  "Bênção",
  "Graça",
  "Misericórdia",
  "Coragem",
  "Propósito",
]

export default function VersosPage() {
  const { user } = useAuth()
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [displayCount, setDisplayCount] = useState(12)

  const filteredVerses = useMemo(() => {
    let result = verses

    if (selectedCategory !== "Todos") {
      result = result.filter((v) => v.category === selectedCategory)
    }

    if (searchTerm) {
      result = result.filter(
        (v) =>
          v.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.theme.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (sortBy === "alphabetical") {
      result = [...result].sort((a, b) => a.text.localeCompare(b.text))
    } else if (sortBy === "reference") {
      result = [...result].sort((a, b) => a.reference.localeCompare(b.reference))
    }

    return result
  }, [selectedCategory, searchTerm, sortBy])

  const displayedVerses = filteredVerses.slice(0, displayCount)
  const hasMore = displayCount < filteredVerses.length

  const copyToClipboard = (text: string, reference: string) => {
    const fullText = `"${text}" - ${reference}`
    navigator.clipboard.writeText(fullText)
  }

  const getTodaysVerse = () => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    return verses[dayOfYear % verses.length]
  }

  const todaysVerse = getTodaysVerse()

  const getCategoryCount = (category: string) => {
    if (category === "Todos") return verses.length
    return verses.filter((v) => v.category === category).length
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Versículos sobre Amor e Relacionamentos</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Encontre inspiração e sabedoria na Palavra de Deus para seus relacionamentos
          </p>
        </div>
      </section>

      {/* Today's Verse */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-primary flex items-center justify-center gap-2 text-2xl">
                <Star className="h-6 w-6" />
                Versículo do Dia
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <blockquote className="text-2xl font-medium text-foreground italic leading-relaxed">
                "{todaysVerse.text}"
              </blockquote>
              <cite className="text-lg text-muted-foreground font-medium">{todaysVerse.reference}</cite>
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge variant="secondary">{todaysVerse.category}</Badge>
                <Badge variant="outline">{todaysVerse.theme}</Badge>
              </div>
              <div className="flex justify-center gap-2">
                <Button variant="outline" onClick={() => copyToClipboard(todaysVerse.text, todaysVerse.reference)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar Versículo
                </Button>
                {user && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (isFavorite("verso", todaysVerse.id)) {
                        removeFavorite("verso", todaysVerse.id)
                      } else {
                        addFavorite("verso", todaysVerse.id, todaysVerse.text, todaysVerse.reference)
                      }
                    }}
                  >
                    <Heart
                      className={`h-4 w-4 mr-2 ${
                        isFavorite("verso", todaysVerse.id) ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                    {isFavorite("verso", todaysVerse.id) ? "Favoritado" : "Favoritar"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar versículos..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setDisplayCount(12)
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Sort Options */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Ordenar por:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["default", "alphabetical", "reference"].map((option) => (
                <Button
                  key={option}
                  variant={sortBy === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(option)}
                >
                  {option === "default" && "Padrão"}
                  {option === "alphabetical" && "Alfabético"}
                  {option === "reference" && "Referência"}
                </Button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => {
                  setSelectedCategory(category)
                  setDisplayCount(12)
                }}
              >
                {category} ({getCategoryCount(category)})
              </Badge>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Mostrando {displayedVerses.length} de {filteredVerses.length} versículos
          </div>
        </div>
      </section>

      {/* Verses Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {displayedVerses.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedVerses.map((verse) => (
                  <Card
                    key={verse.id}
                    className="bg-card border-border hover:shadow-md transition-all duration-200 group"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {verse.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {verse.theme}
                          </Badge>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(verse.text, verse.reference)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          {user && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (isFavorite("verso", verse.id)) {
                                  removeFavorite("verso", verse.id)
                                } else {
                                  addFavorite("verso", verse.id, verse.text, verse.reference)
                                }
                              }}
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  isFavorite("verso", verse.id) ? "fill-red-500 text-red-500" : ""
                                }`}
                              />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <blockquote className="text-foreground leading-relaxed italic">"{verse.text}"</blockquote>
                      <cite className="text-muted-foreground font-medium text-sm">{verse.reference}</cite>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setDisplayCount((prev) => prev + 12)}
                    className="px-8"
                  >
                    Carregar Mais Versículos ({filteredVerses.length - displayCount} restantes)
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Nenhum versículo encontrado com esses critérios.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">Aplique a Palavra em seus Relacionamentos</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Descubra dicas práticas baseadas nos ensinamentos bíblicos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dicas">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                Ver Dicas Bíblicas
              </Button>
            </Link>
            <Link href="/mensagens">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Gerar Mensagens
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
