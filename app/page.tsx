"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, BookOpen, Star, Users, ArrowRight, Sparkles, Check, Mail } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HomePage() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas atualizações em breve.",
      })
      setEmail("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="h-4 w-4" />
            Relacionamentos com Propósito e Fé
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Conecte-se com{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Respeito
            </span>{" "}
            e{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Fé
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 text-pretty max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            A plataforma completa para jovens cristãos que buscam construir relacionamentos significativos baseados em
            valores bíblicos e respeito mútuo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href="/cantadas" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 py-6 border-2 hover:bg-accent/10 transition-all hover:scale-105 bg-transparent"
              >
                Explorar Cantadas
              </Button>
            </Link>
          </div>

          <Card className="max-w-2xl mx-auto bg-card/90 backdrop-blur-sm border-border shadow-xl animate-in fade-in zoom-in-95 duration-700 delay-500">
            <CardHeader className="pb-4">
              <CardTitle className="text-primary flex items-center justify-center gap-2 text-xl">
                <BookOpen className="h-5 w-5" />
                Versículo do Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-lg md:text-xl italic text-foreground mb-3 leading-relaxed">
                "Acima de tudo, revistam-se do amor, que é o elo perfeito."
              </blockquote>
              <cite className="text-base text-muted-foreground font-medium">Colossenses 3:14</cite>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card/30 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                19K+
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Cantadas Respeitosas</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">1K+</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Usuários Ativos</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                500+
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Dicas Bíblicas</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">365</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Versículos Diários</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Recursos para Relacionamentos Cristãos
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Ferramentas práticas e conteúdo inspirador para ajudá-lo a construir conexões autênticas
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card border-border hover:shadow-xl hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
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

            <Card className="bg-card border-border hover:shadow-xl hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
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

            <Card className="bg-card border-border hover:shadow-xl hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
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

            <Card className="bg-card border-border hover:shadow-xl hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="h-16 w-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
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

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Por Que Escolher Nossa Plataforma?</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Recursos exclusivos para uma experiência completa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg">100% Gratuito</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Acesso completo a todos os recursos sem custos ou taxas ocultas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg">Conteúdo Verificado</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Todo conteúdo é revisado para garantir alinhamento com valores cristãos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg">Atualizações Constantes</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Novos conteúdos adicionados regularmente para manter a plataforma sempre fresca
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg">Comunidade Ativa</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Junte-se a milhares de jovens cristãos em busca de relacionamentos significativos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Perguntas Frequentes</h2>
            <p className="text-lg md:text-xl text-muted-foreground">Respostas para as dúvidas mais comuns</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">A plataforma é realmente gratuita?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Sim! Todos os recursos da plataforma são 100% gratuitos. Acreditamos que relacionamentos saudáveis
                baseados em valores cristãos devem ser acessíveis a todos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Como vocês garantem que o conteúdo é apropriado?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Todo conteúdo passa por uma revisão cuidadosa para garantir que está alinhado com valores cristãos e
                princípios bíblicos. Priorizamos respeito, pureza e honra em todas as interações.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">Posso usar as cantadas em qualquer situação?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                As cantadas são projetadas para serem respeitosas e apropriadas, mas sempre use seu discernimento.
                Considere o contexto, o relacionamento com a pessoa e ore por sabedoria antes de iniciar uma conversa.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">Com que frequência o conteúdo é atualizado?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Adicionamos novos conteúdos regularmente, incluindo cantadas, dicas, mensagens e versículos. Nosso
                objetivo é manter a plataforma sempre fresca e relevante para nossa comunidade.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">Preciso ser cristão para usar a plataforma?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                A plataforma é projetada com valores cristãos em mente, mas todos são bem-vindos. Se você busca
                relacionamentos baseados em respeito, honra e valores sólidos, você encontrará recursos valiosos aqui.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card/30 to-background">
        <div className="max-w-2xl mx-auto text-center">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Receba Inspiração Diária</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Inscreva-se para receber versículos, dicas e novos conteúdos diretamente no seu e-mail
          </p>
          <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" size="lg" className="sm:w-auto">
              Inscrever-se
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">
            Sem spam. Apenas conteúdo de qualidade. Cancele quando quiser.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Pronto para Começar?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Junte-se a milhares de jovens cristãos que estão construindo relacionamentos significativos com base em
            valores bíblicos
          </p>
          <Link href="/registro">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Criar Conta Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
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
