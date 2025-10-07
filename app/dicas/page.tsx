import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, BookOpen, Users, Shield, Clock } from "lucide-react"
import Link from "next/link"

const relationshipTips = [
  {
    id: 1,
    title: "Construa uma Base de Amizade",
    content:
      "Antes de qualquer romance, desenvolva uma amizade sólida. Conheça verdadeiramente a pessoa, seus valores, sonhos e caráter. A amizade é a fundação de relacionamentos duradouros.",
    category: "Fundamentos",
    icon: Users,
    verse: "O amigo ama em todos os momentos; é um irmão na adversidade. - Provérbios 17:17",
  },
  {
    id: 2,
    title: "Mantenha a Pureza",
    content:
      "Honre a Deus com seu corpo e relacionamento. Estabeleça limites claros e respeite-os mutuamente. A pureza não é apenas física, mas também emocional e espiritual.",
    category: "Pureza",
    icon: Shield,
    verse:
      "Fujam da imoralidade sexual. Todos os outros pecados que alguém comete, fora do corpo os comete; mas quem se entrega à imoralidade sexual peca contra o próprio corpo. - 1 Coríntios 6:18",
  },
  {
    id: 3,
    title: "Ore Juntos",
    content:
      "A oração em conjunto fortalece o relacionamento e convida Deus para o centro da relação. Compartilhem suas orações, pedidos e gratidões regularmente.",
    category: "Espiritualidade",
    icon: Heart,
    verse:
      "Novamente lhes digo: se dois de vocês concordarem na terra em qualquer assunto sobre o qual pedirem, isso lhes será feito por meu Pai que está nos céus. - Mateus 18:19",
  },
  {
    id: 4,
    title: "Comunique-se com Amor",
    content:
      "Pratique a comunicação honesta, gentil e respeitosa. Ouça ativamente e fale com amor, mesmo durante conflitos. A comunicação saudável é essencial para relacionamentos prósperos.",
    category: "Comunicação",
    icon: Heart,
    verse: "Portanto, falem a verdade, cada um com o seu próximo, pois somos membros uns dos outros. - Efésios 4:25",
  },
  {
    id: 5,
    title: "Busquem Crescimento Juntos",
    content:
      "Incentivem o crescimento pessoal e espiritual um do outro. Leiam a Bíblia juntos, participem de estudos bíblicos e apoiem os sonhos e objetivos mútuos.",
    category: "Crescimento",
    icon: BookOpen,
    verse: "Como o ferro afia o ferro, assim um homem afia o outro. - Provérbios 27:17",
  },
  {
    id: 6,
    title: "Pratiquem o Perdão",
    content:
      "Ninguém é perfeito. Aprendam a perdoar rapidamente e completamente. O perdão liberta o relacionamento do peso das ofensas e permite que o amor floresça.",
    category: "Perdão",
    icon: Heart,
    verse:
      "Sejam bondosos e compassivos uns para com os outros, perdoando-se mutuamente, assim como Deus os perdoou em Cristo. - Efésios 4:32",
  },
  {
    id: 7,
    title: "Honrem os Pais",
    content:
      "Respeitem e honrem as famílias de ambos. Busquem a bênção dos pais e incluam as famílias no relacionamento de forma saudável e equilibrada.",
    category: "Família",
    icon: Users,
    verse:
      "Honra teu pai e tua mãe, para que se prolonguem os teus dias na terra que o Senhor, o teu Deus, te dá. - Êxodo 20:12",
  },
  {
    id: 8,
    title: "Sejam Pacientes",
    content:
      "O amor verdadeiro é paciente. Não tenham pressa em decisões importantes. Permitam que Deus guie o tempo e o ritmo do relacionamento.",
    category: "Paciência",
    icon: Clock,
    verse: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. - 1 Coríntios 13:4",
  },
]

const categories = [
  { name: "Todas", count: relationshipTips.length },
  { name: "Fundamentos", count: relationshipTips.filter((tip) => tip.category === "Fundamentos").length },
  { name: "Pureza", count: relationshipTips.filter((tip) => tip.category === "Pureza").length },
  { name: "Espiritualidade", count: relationshipTips.filter((tip) => tip.category === "Espiritualidade").length },
  { name: "Comunicação", count: relationshipTips.filter((tip) => tip.category === "Comunicação").length },
  { name: "Crescimento", count: relationshipTips.filter((tip) => tip.category === "Crescimento").length },
]

export default function DicasPage() {
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
              <Link href="/dicas" className="text-primary font-medium">
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
          <h2 className="text-4xl font-bold text-foreground mb-4">Dicas para Relacionamentos Cristãos</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Conselhos bíblicos e práticos para construir relacionamentos saudáveis e duradouros
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant={category.name === "Todas" ? "default" : "secondary"}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/10 transition-colors"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {relationshipTips.map((tip) => {
              const IconComponent = tip.icon
              return (
                <Card key={tip.id} className="bg-card border-border hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="mb-2">
                        <IconComponent className="h-3 w-3 mr-1" />
                        {tip.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-foreground">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{tip.content}</p>

                    <Card className="bg-secondary/30 border-primary/20">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-2">
                          <BookOpen className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <blockquote className="text-sm italic text-foreground">{tip.verse}</blockquote>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">Busque Sabedoria na Palavra</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Explore versículos bíblicos sobre amor e relacionamentos para fortalecer sua fé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/versos">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Ver Versículos
              </Button>
            </Link>
            <Link href="/cantadas">
              <Button variant="outline" size="lg">
                Explorar Cantadas
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
