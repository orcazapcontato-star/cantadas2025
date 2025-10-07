import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle, BookOpen, Star } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Conecte-se com <span className="text-primary">Respeito</span> e <span className="text-primary">Fé</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Descubra cantadas respeitosas, mensagens prontas e conselhos baseados na fé cristã para construir
            relacionamentos significativos.
          </p>

          {/* Daily Verse Card */}
          <Card className="mb-12 bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-primary flex items-center justify-center gap-2">
                <BookOpen className="h-5 w-5" />
                Versículo do Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-lg italic text-foreground mb-2">
                "Acima de tudo, revistam-se do amor, que é o elo perfeito."
              </blockquote>
              <cite className="text-muted-foreground">Colossenses 3:14</cite>
            </CardContent>
          </Card>

          <Link href="/cantadas">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3">
              Explorar Cantadas
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Recursos para Relacionamentos Cristãos
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-foreground">Cantadas Respeitosas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Uma biblioteca de cantadas que honram os valores cristãos e demonstram respeito genuíno.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-foreground">Mensagens Prontas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Mensagens cuidadosamente elaboradas para WhatsApp e outras plataformas de comunicação.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-foreground">Dicas Bíblicas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Conselhos fundamentados na Bíblia para relacionamentos saudáveis e duradouros.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-foreground">Versículos Diários</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Inspiração diária através de versículos bíblicos sobre amor, relacionamentos e fé cristã.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Cantadas Cristãs</span>
          </div>
          <p className="text-muted-foreground">Construindo relacionamentos com base no amor, respeito e fé cristã.</p>
        </div>
      </footer>
    </div>
  )
}
