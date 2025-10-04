"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Copy, RefreshCw } from "lucide-react"
import Link from "next/link"

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
]

const categories = [
  { name: "Todos", count: verses.length },
  { name: "Amor", count: verses.filter((v) => v.category === "Amor").length },
  { name: "Casamento", count: verses.filter((v) => v.category === "Casamento").length },
  { name: "Amizade", count: verses.filter((v) => v.category === "Amizade").length },
  { name: "Perdão", count: verses.filter((v) => v.category === "Perdão").length },
  { name: "Crescimento", count: verses.filter((v) => v.category === "Crescimento").length },
]

export default function VersosPage() {
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
              <Link href="/versos" className="text-primary font-medium">
                Versículos
              </Link>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Favoritos</Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card/30">
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
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 shadow-lg">
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
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">{todaysVerse.category}</Badge>
                <Badge variant="outline">{todaysVerse.theme}</Badge>
              </div>
              <Button
                variant="outline"
                onClick={() => copyToClipboard(todaysVerse.text, todaysVerse.reference)}
                className="mt-4"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copiar Versículo
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant={category.name === "Todos" ? "default" : "secondary"}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/10 transition-colors"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Verses Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verses.map((verse) => (
              <Card key={verse.id} className="bg-card border-border hover:shadow-md transition-all duration-200 group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-2">
                      <Badge variant="secondary">{verse.category}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {verse.theme}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(verse.text, verse.reference)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
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
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              Carregar Mais Versículos
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">Aplique a Palavra em seus Relacionamentos</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Descubra dicas práticas baseadas nos ensinamentos bíblicos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dicas">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Ver Dicas Bíblicas
              </Button>
            </Link>
            <Link href="/mensagens">
              <Button variant="outline" size="lg">
                Gerar Mensagens
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
