import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle, BookOpen, Star, Users, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            Relacionamentos com Propósito e Fé
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 text-balance leading-tight px-2">
            Conecte-se com <span className="text-primary">Respeito</span> e <span className="text-primary">Fé</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 text-pretty max-w-3xl mx-auto leading-relaxed px-4">
            A plataforma completa para jovens cristãos que buscam construir relacionamentos significativos baseados em
            valores bíblicos e respeito mútuo.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Link href="/registro" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all"
              >
                Começar Gratuitamente
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link href="/cantadas" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-2 bg-transparent"
              >
                Explorar Cantadas
              </Button>
            </Link>
          </div>

          <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur border-border shadow-lg">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-primary flex items-center justify-center gap-2 text-lg sm:text-xl">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                Versículo do Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-base sm:text-lg md:text-xl italic text-foreground mb-2 sm:mb-3 leading-relaxed px-2">
                "Acima de tudo, revistam-se do amor, que é o elo perfeito."
              </blockquote>
              <cite className="text-sm sm:text-base text-muted-foreground font-medium">Colossenses 3:14</cite>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-1 sm:mb-2">500+</div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Cantadas Respeitosas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-1 sm:mb-2">1000+</div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-1 sm:mb-2">100+</div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Dicas Bíblicas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-1 sm:mb-2">50+</div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Versículos Diários</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-4">
              Recursos para Relacionamentos Cristãos
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Ferramentas práticas e conteúdo inspirador para ajudá-lo a construir conexões autênticas
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-card border-border hover:shadow-lg hover:border-primary/50 transition-all group">
              <CardHeader className="text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-foreground text-xl">Cantadas Respeitosas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">
                  Uma biblioteca de cantadas que honram os valores cristãos e demonstram respeito genuíno.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg hover:border-primary/50 transition-all group">
              <CardHeader className="text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-foreground text-xl">Mensagens Prontas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">
                  Mensagens cuidadosamente elaboradas para WhatsApp e outras plataformas de comunicação.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg hover:border-primary/50 transition-all group">
              <CardHeader className="text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-foreground text-xl">Dicas Bíblicas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">
                  Conselhos fundamentados na Bíblia para relacionamentos saudáveis e duradouros.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg hover:border-primary/50 transition-all group">
              <CardHeader className="text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-foreground text-xl">Versículos Diários</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">
                  Inspiração diária através de versículos bíblicos sobre amor, relacionamentos e fé cristã.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Como Funciona</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Três passos simples para começar sua jornada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Crie sua Conta</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cadastre-se gratuitamente e tenha acesso a todos os recursos da plataforma
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Explore o Conteúdo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Navegue por cantadas, mensagens, dicas e versículos cuidadosamente selecionados
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Conecte-se com Respeito</h3>
              <p className="text-muted-foreground leading-relaxed">
                Use as ferramentas para iniciar conversas significativas baseadas em valores cristãos
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">O Que Nossos Usuários Dizem</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de pessoas que encontraram conexões significativas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Maria Silva</CardTitle>
                    <p className="text-sm text-muted-foreground">São Paulo, SP</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed italic">
                  "Finalmente encontrei uma plataforma que respeita meus valores cristãos. As cantadas são criativas e
                  respeitosas!"
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">João Santos</CardTitle>
                    <p className="text-sm text-muted-foreground">Rio de Janeiro, RJ</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed italic">
                  "As dicas bíblicas me ajudaram muito a entender como construir um relacionamento saudável baseado na
                  fé."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Ana Costa</CardTitle>
                    <p className="text-sm text-muted-foreground">Belo Horizonte, MG</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed italic">
                  "Os versículos diários são uma bênção! Sempre começo meu dia lendo e me inspirando para buscar
                  relacionamentos verdadeiros."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Pronto para Começar?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Junte-se a milhares de jovens cristãos que estão construindo relacionamentos significativos com base em
            valores bíblicos
          </p>
          <Link href="/registro">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              Criar Conta Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold text-foreground text-lg">Cantadas Cristãs</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Construindo relacionamentos com base no amor, respeito e fé cristã.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/cantadas" className="text-muted-foreground hover:text-primary transition-colors">
                    Cantadas
                  </Link>
                </li>
                <li>
                  <Link href="/mensagens" className="text-muted-foreground hover:text-primary transition-colors">
                    Mensagens
                  </Link>
                </li>
                <li>
                  <Link href="/dicas" className="text-muted-foreground hover:text-primary transition-colors">
                    Dicas
                  </Link>
                </li>
                <li>
                  <Link href="/versos" className="text-muted-foreground hover:text-primary transition-colors">
                    Versículos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Conta</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link href="/registro" className="text-muted-foreground hover:text-primary transition-colors">
                    Criar Conta
                  </Link>
                </li>
                <li>
                  <Link href="/favoritos" className="text-muted-foreground hover:text-primary transition-colors">
                    Favoritos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Sobre</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Nossa Missão
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Valores
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 Cantadas Cristãs. Todos os direitos reservados. Feito com{" "}
              <Heart className="inline h-4 w-4 text-primary" /> para a comunidade cristã.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
