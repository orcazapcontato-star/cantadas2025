"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Copy, Sparkles, Send, RefreshCw, Check } from "lucide-react"
import Navigation from "@/components/navigation"
import { useFavorites } from "@/lib/favorites-context"

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
  const [copied, setCopied] = useState<string | null>(null)
  const { addFavorite, isFavorite } = useFavorites()

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

  const copyToClipboard = (text: string, id?: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id || "generated")
    setTimeout(() => setCopied(null), 2000)
  }

  const shareToWhatsApp = (text: string) => {
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  const fillTemplate = (template: string) => {
    return template
      .replace(/{nome}/g, formData.nome || "[Nome]")
      .replace(/{interesse}/g, formData.interesse || "[Interesse]")
      .replace(/{valor}/g, formData.valor || "[Valor]")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Mensagens Personalizadas</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Gerador de Mensagens Cristãs
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Crie mensagens personalizadas e respeitosas para WhatsApp e outras plataformas
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-primary" />
                Gerador Personalizado
              </CardTitle>
              <CardDescription className="text-base">
                Preencha as informações para gerar uma mensagem personalizada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
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
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Gerando sua mensagem...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Gerar Mensagem Personalizada
                  </>
                )}
              </Button>

              {generatedMessage && (
                <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/30 shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        Mensagem Gerada
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedMessage, "generated")}
                        >
                          {copied === "generated" ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => shareToWhatsApp(generatedMessage)}
                          className="text-green-600"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={generatedMessage}
                      onChange={(e) => setGeneratedMessage(e.target.value)}
                      className="min-h-[120px] resize-none text-base"
                    />
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-secondary/20 to-accent/10 border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  Templates Prontos
                </CardTitle>
                <CardDescription className="text-base">
                  Mensagens pré-elaboradas que você pode personalizar e usar
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {messageTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="bg-card border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-sm">
                        {template.type}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(fillTemplate(template.template), template.id.toString())}
                        >
                          {copied === template.id.toString() ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => shareToWhatsApp(fillTemplate(template.template))}
                          className="text-green-600"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                    <blockquote className="text-foreground border-l-3 border-primary pl-4 py-2 bg-secondary/20 rounded-r">
                      {fillTemplate(template.template)}
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Card className="mt-16 bg-gradient-to-br from-card to-secondary/10 border-border shadow-lg">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl">Dicas para Mensagens Respeitosas</CardTitle>
            <CardDescription className="text-base">
              Princípios fundamentais para uma comunicação cristã autêntica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">Seja Genuíno</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Demonstre interesse real pela pessoa e seus valores. Autenticidade constrói confiança.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">Respeite Limites</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mantenha sempre um tom respeitoso e apropriado. O respeito é a base de todo relacionamento.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-lg">Seja Paciente</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Relacionamentos sólidos se constroem com tempo e paciência. Não tenha pressa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
