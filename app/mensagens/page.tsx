"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Copy, Sparkles, Send, RefreshCw } from "lucide-react"
import Link from "next/link"

const messageTemplates = [
  {
    id: 1,
    type: "Primeira Mensagem",
    template:
      "Olá {nome}! Vi seu perfil e fiquei impressionado(a) com {interesse}. Gostaria muito de te conhecer melhor. Como tem sido seu dia?",
    description: "Mensagem inicial respeitosa e interessada",
  },
  {
    id: 2,
    type: "Convite para Conversar",
    template:
      "Oi {nome}! Tenho percebido que compartilhamos valores similares, especialmente sobre {valor}. Que tal conversarmos mais sobre isso?",
    description: "Para iniciar uma conversa baseada em valores",
  },
  {
    id: 3,
    type: "Convite para Encontro",
    template:
      "Olá {nome}! Que tal tomarmos um café depois do culto? Seria uma ótima oportunidade para nos conhecermos melhor em um ambiente tranquilo.",
    description: "Convite casual e apropriado",
  },
  {
    id: 4,
    type: "Mensagem de Encorajamento",
    template:
      "Oi {nome}! Lembrei de você hoje durante a oração. Espero que Deus esteja abençoando seus dias. Como posso orar por você?",
    description: "Mensagem de apoio e cuidado cristão",
  },
]

const messageTypes = [
  "Primeira Mensagem",
  "Convite para Conversar",
  "Convite para Encontro",
  "Mensagem de Encorajamento",
  "Mensagem de Bom Dia",
  "Mensagem de Boa Noite",
]

export default function MensagensPage() {
  const [formData, setFormData] = useState({
    nome: "",
    interesse: "",
    valor: "",
    tipo: "",
  })
  const [generatedMessage, setGeneratedMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateMessage = () => {
    setIsGenerating(true)

    // Simulate AI generation delay
    setTimeout(() => {
      const templates = {
        "Primeira Mensagem": [
          `Olá ${formData.nome}! Vi que você gosta de ${formData.interesse} e fiquei curioso(a) para saber mais. Como descobriu essa paixão?`,
          `Oi ${formData.nome}! Seu interesse por ${formData.interesse} me chamou atenção. Seria legal conversarmos sobre isso!`,
          `Olá! Notei que compartilhamos o interesse por ${formData.interesse}. Gostaria muito de te conhecer melhor, ${formData.nome}.`,
        ],
        "Convite para Conversar": [
          `Oi ${formData.nome}! Percebi que valorizamos ${formData.valor}. Que tal conversarmos mais sobre nossa fé e experiências?`,
          `Olá! Vi que você também valoriza ${formData.valor}. Seria interessante trocarmos ideias sobre isso, ${formData.nome}.`,
        ],
        "Convite para Encontro": [
          `${formData.nome}, que tal tomarmos um café depois do culto? Seria uma ótima oportunidade para nos conhecermos melhor.`,
          `Oi ${formData.nome}! Gostaria de te convidar para um café. Podemos conversar sobre ${formData.interesse} e nossa fé.`,
        ],
        "Mensagem de Encorajamento": [
          `Oi ${formData.nome}! Lembrei de você hoje em oração. Que Deus continue abençoando sua jornada com ${formData.interesse}.`,
          `Olá ${formData.nome}! Espero que Deus esteja te fortalecendo. Como posso orar por você hoje?`,
        ],
        "Mensagem de Bom Dia": [
          `Bom dia, ${formData.nome}! Que este dia seja repleto das bênçãos de Deus. Como está começando sua manhã?`,
          `Bom dia! Que Deus abençoe seu dia, ${formData.nome}. Espero que tenha momentos especiais hoje.`,
        ],
        "Mensagem de Boa Noite": [
          `Boa noite, ${formData.nome}! Que Deus te dê um descanso tranquilo e sonhos abençoados.`,
          `Boa noite! Que a paz de Cristo esteja contigo, ${formData.nome}. Durma bem!`,
        ],
      }

      const selectedTemplates = templates[formData.tipo as keyof typeof templates] || templates["Primeira Mensagem"]
      const randomTemplate = selectedTemplates[Math.floor(Math.random() * selectedTemplates.length)]

      setGeneratedMessage(randomTemplate)
      setIsGenerating(false)
    }, 1500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const fillTemplate = (template: string) => {
    return template
      .replace(/{nome}/g, formData.nome || "[Nome]")
      .replace(/{interesse}/g, formData.interesse || "[Interesse]")
      .replace(/{valor}/g, formData.valor || "[Valor]")
  }

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
              <Link href="/mensagens" className="text-primary font-medium">
                Mensagens
              </Link>
              <Link href="/dicas" className="text-muted-foreground hover:text-foreground transition-colors">
                Dicas
              </Link>
              <Link href="/versos" className="text-muted-foreground hover:text-foreground transition-colors">
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
          <h2 className="text-4xl font-bold text-foreground mb-4">Gerador de Mensagens</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Crie mensagens personalizadas e respeitosas para WhatsApp e outras plataformas
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Message Generator Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Gerador Personalizado
              </CardTitle>
              <CardDescription>Preencha as informações para gerar uma mensagem personalizada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da pessoa</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Maria, João..."
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interesse">Interesse ou hobby</Label>
                <Input
                  id="interesse"
                  placeholder="Ex: música, leitura, esportes..."
                  value={formData.interesse}
                  onChange={(e) => setFormData({ ...formData, interesse: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor">Valor cristão em comum</Label>
                <Input
                  id="valor"
                  placeholder="Ex: família, fé, serviço..."
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de mensagem</Label>
                <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {messageTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generateMessage}
                disabled={!formData.nome || !formData.tipo || isGenerating}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Gerar Mensagem
                  </>
                )}
              </Button>

              {generatedMessage && (
                <Card className="bg-secondary/50 border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center justify-between">
                      Mensagem Gerada
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(generatedMessage)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={generatedMessage}
                      onChange={(e) => setGeneratedMessage(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Message Templates */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Templates Prontos
                </CardTitle>
                <CardDescription>Mensagens pré-elaboradas que você pode personalizar</CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {messageTemplates.map((template) => (
                <Card key={template.id} className="bg-card border-border hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{template.type}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(fillTemplate(template.template))}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                    <blockquote className="text-foreground italic border-l-2 border-primary pl-3">
                      {fillTemplate(template.template)}
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <Card className="mt-12 bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-center">Dicas para Mensagens Respeitosas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Seja Genuíno</h4>
                <p className="text-sm text-muted-foreground">Demonstre interesse real pela pessoa e seus valores</p>
              </div>
              <div>
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Respeite Limites</h4>
                <p className="text-sm text-muted-foreground">Mantenha sempre um tom respeitoso e apropriado</p>
              </div>
              <div>
                <Send className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Seja Paciente</h4>
                <p className="text-sm text-muted-foreground">
                  Relacionamentos sólidos se constroem com tempo e paciência
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
