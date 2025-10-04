"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Heart,
  BookOpen,
  Users,
  Shield,
  Clock,
  TrendingUp,
  UserCheck,
  Smile,
  Search,
  Grid3x3,
  List,
  ArrowUpDown,
  MessageCircle,
  Sparkles,
  Target,
  Lightbulb,
  Star,
  Gift,
  Calendar,
  Phone,
  Home,
  Compass,
  Award,
} from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"

const relationshipTips = [
  {
    id: 1,
    title: "Construa uma Base de Amizade",
    content:
      "Antes de qualquer romance, desenvolva uma amizade sólida. Conheça verdadeiramente a pessoa, seus valores, sonhos e caráter. A amizade é a fundação de relacionamentos duradouros. Invista tempo em conversas profundas, compartilhe experiências e construa memórias juntos. Um relacionamento que começa com amizade tem raízes mais fortes para enfrentar os desafios da vida.",
    category: "Fundamentos",
    icon: Users,
    verse: "O amigo ama em todos os momentos; é um irmão na adversidade. - Provérbios 17:17",
    popularity: 95,
  },
  {
    id: 2,
    title: "Mantenha a Pureza",
    content:
      "Honre a Deus com seu corpo e relacionamento. Estabeleça limites claros e respeite-os mutuamente. A pureza não é apenas física, mas também emocional e espiritual. Proteja seu coração e mente, evitando situações que possam comprometer seus valores. Lembre-se que a pureza é um presente que você guarda para o casamento.",
    category: "Pureza",
    icon: Shield,
    verse:
      "Fujam da imoralidade sexual. Todos os outros pecados que alguém comete, fora do corpo os comete; mas quem se entrega à imoralidade sexual peca contra o próprio corpo. - 1 Coríntios 6:18",
    popularity: 92,
  },
  {
    id: 3,
    title: "Ore Juntos Diariamente",
    content:
      "A oração em conjunto fortalece o relacionamento e convida Deus para o centro da relação. Compartilhem suas orações, pedidos e gratidões regularmente. Estabeleçam um momento diário para orar juntos, seja pessoalmente ou por telefone. A oração cria intimidade espiritual e alinha seus corações com a vontade de Deus.",
    category: "Espiritualidade",
    icon: Heart,
    verse:
      "Novamente lhes digo: se dois de vocês concordarem na terra em qualquer assunto sobre o qual pedirem, isso lhes será feito por meu Pai que está nos céus. - Mateus 18:19",
    popularity: 98,
  },
  {
    id: 4,
    title: "Comunique-se com Amor e Verdade",
    content:
      "Pratique a comunicação honesta, gentil e respeitosa. Ouça ativamente e fale com amor, mesmo durante conflitos. A comunicação saudável é essencial para relacionamentos prósperos. Aprenda a expressar seus sentimentos sem acusar, e a ouvir sem interromper. Use palavras que edificam e evite críticas destrutivas.",
    category: "Comunicação",
    icon: MessageCircle,
    verse: "Portanto, falem a verdade, cada um com o seu próximo, pois somos membros uns dos outros. - Efésios 4:25",
    popularity: 90,
  },
  {
    id: 5,
    title: "Busquem Crescimento Espiritual Juntos",
    content:
      "Incentivem o crescimento pessoal e espiritual um do outro. Leiam a Bíblia juntos, participem de estudos bíblicos e apoiem os sonhos e objetivos mútuos. Frequentem a igreja regularmente e sirvam juntos no ministério. O crescimento espiritual conjunto fortalece o vínculo e prepara vocês para um futuro abençoado.",
    category: "Crescimento",
    icon: TrendingUp,
    verse: "Como o ferro afia o ferro, assim um homem afia o outro. - Provérbios 27:17",
    popularity: 88,
  },
  {
    id: 6,
    title: "Pratiquem o Perdão Rápido",
    content:
      "Ninguém é perfeito. Aprendam a perdoar rapidamente e completamente. O perdão liberta o relacionamento do peso das ofensas e permite que o amor floresça. Não guardem mágoas ou ressentimentos. Conversem sobre os problemas e resolvam os conflitos antes que o sol se ponha. O perdão é uma escolha diária que mantém o amor vivo.",
    category: "Perdão",
    icon: Heart,
    verse:
      "Sejam bondosos e compassivos uns para com os outros, perdoando-se mutuamente, assim como Deus os perdoou em Cristo. - Efésios 4:32",
    popularity: 85,
  },
  {
    id: 7,
    title: "Honrem e Respeitem as Famílias",
    content:
      "Respeitem e honrem as famílias de ambos. Busquem a bênção dos pais e incluam as famílias no relacionamento de forma saudável e equilibrada. Construam pontes, não muros. Invistam tempo conhecendo os familiares e criando laços. A família é um presente de Deus e deve ser valorizada.",
    category: "Família",
    icon: Home,
    verse:
      "Honra teu pai e tua mãe, para que se prolonguem os teus dias na terra que o Senhor, o teu Deus, te dá. - Êxodo 20:12",
    popularity: 82,
  },
  {
    id: 8,
    title: "Sejam Pacientes com o Tempo de Deus",
    content:
      "O amor verdadeiro é paciente. Não tenham pressa em decisões importantes. Permitam que Deus guie o tempo e o ritmo do relacionamento. Cada fase tem seu propósito. Confiem no plano de Deus e não forcem situações. A paciência demonstra maturidade e confiança em Deus.",
    category: "Paciência",
    icon: Clock,
    verse: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. - 1 Coríntios 13:4",
    popularity: 87,
  },
  {
    id: 9,
    title: "Cultivem a Alegria e o Humor",
    content:
      "Riam juntos, divirtam-se e celebrem a vida. A alegria fortalece os laços e torna o relacionamento mais leve e prazeroso. Não levem tudo tão a sério. Criem momentos de diversão e descontração. O riso é um remédio para a alma e aproxima os corações.",
    category: "Alegria",
    icon: Smile,
    verse: "O coração alegre é bom remédio, mas o espírito abatido seca os ossos. - Provérbios 17:22",
    popularity: 91,
  },
  {
    id: 10,
    title: "Estabeleçam Metas e Sonhos Compartilhados",
    content:
      "Conversem sobre o futuro e alinhem suas expectativas. Definam metas financeiras, espirituais e familiares juntos. Ter objetivos comuns cria propósito e direção no relacionamento. Sonhem grande, mas sejam práticos. Trabalhem em equipe para alcançar seus sonhos.",
    category: "Planejamento",
    icon: Target,
    verse: "Onde não há visão, o povo perece. - Provérbios 29:18",
    popularity: 79,
  },
  {
    id: 11,
    title: "Pratiquem a Generosidade",
    content:
      "Sejam generosos um com o outro em tempo, atenção e recursos. Pequenos gestos de amor fazem grande diferença. Surpreendam-se mutuamente com atos de bondade. A generosidade reflete o coração de Cristo e fortalece o amor.",
    category: "Amor Prático",
    icon: Gift,
    verse: "Mais bem-aventurado é dar do que receber. - Atos 20:35",
    popularity: 84,
  },
  {
    id: 12,
    title: "Mantenham a Transparência Financeira",
    content:
      "Sejam honestos sobre finanças desde o início. Conversem sobre hábitos de gastos, dívidas e objetivos financeiros. A transparência financeira evita conflitos futuros e constrói confiança. Aprendam a administrar o dinheiro juntos de forma sábia e bíblica.",
    category: "Finanças",
    icon: TrendingUp,
    verse: "O rico domina sobre os pobres, e quem toma emprestado é servo de quem empresta. - Provérbios 22:7",
    popularity: 76,
  },
  {
    id: 13,
    title: "Respeitem as Diferenças",
    content:
      "Vocês são únicos e diferentes, e isso é bom. Aprendam a valorizar as diferenças ao invés de tentar mudar um ao outro. Celebrem as particularidades e usem as diferenças como complemento. O respeito mútuo é fundamental para um relacionamento saudável.",
    category: "Respeito",
    icon: UserCheck,
    verse: "Portanto, acolham-se uns aos outros, como também Cristo os acolheu, para a glória de Deus. - Romanos 15:7",
    popularity: 81,
  },
  {
    id: 14,
    title: "Busquem Aconselhamento Sábio",
    content:
      "Não tenham medo de buscar ajuda de líderes espirituais, mentores ou conselheiros cristãos. A sabedoria vem de múltiplos conselheiros. Participem de cursos para casais e leiam livros sobre relacionamentos cristãos. Investir em aprendizado fortalece o relacionamento.",
    category: "Sabedoria",
    icon: Lightbulb,
    verse:
      "Os planos fracassam por falta de conselho, mas são bem-sucedidos quando há muitos conselheiros. - Provérbios 15:22",
    popularity: 77,
  },
  {
    id: 15,
    title: "Priorizem Tempo de Qualidade",
    content:
      "Em meio à correria da vida, separem tempo exclusivo para estarem juntos. Desliguem os celulares e foquem um no outro. Criem tradições e rituais especiais. O tempo de qualidade nutre o relacionamento e mantém a conexão viva.",
    category: "Tempo",
    icon: Calendar,
    verse: "Há tempo para tudo, e um momento certo para cada propósito debaixo do céu. - Eclesiastes 3:1",
    popularity: 89,
  },
  {
    id: 16,
    title: "Desenvolvam Inteligência Emocional",
    content:
      "Aprendam a reconhecer e gerenciar suas emoções. Sejam empáticos com os sentimentos um do outro. A inteligência emocional ajuda a navegar conflitos e fortalecer a intimidade. Pratiquem a autoconsciência e a regulação emocional.",
    category: "Emoções",
    icon: Heart,
    verse: "Acima de tudo, guardai o vosso coração, porque dele procedem as fontes da vida. - Provérbios 4:23",
    popularity: 83,
  },
  {
    id: 17,
    title: "Sirvam Juntos no Reino",
    content:
      "Encontrem maneiras de servir a Deus e aos outros como casal. Participem de ministérios, trabalhos voluntários e missões. Servir juntos cria propósito compartilhado e fortalece o vínculo espiritual. O serviço é uma expressão prática do amor de Cristo.",
    category: "Serviço",
    icon: Users,
    verse:
      "Cada um exerça o dom que recebeu para servir aos outros, administrando fielmente a graça de Deus em suas múltiplas formas. - 1 Pedro 4:10",
    popularity: 80,
  },
  {
    id: 18,
    title: "Mantenham a Chama do Romance",
    content:
      "Não deixem o romance morrer com o tempo. Continuem namorando mesmo depois de casados. Surpreendam-se, elogiem-se e demonstrem afeto regularmente. O romance mantém o relacionamento vivo e emocionante. Pequenos gestos românticos fazem grande diferença.",
    category: "Romance",
    icon: Sparkles,
    verse:
      "Ponha-me como um selo sobre o teu coração; como um selo sobre o teu braço; porque o amor é forte como a morte. - Cânticos 8:6",
    popularity: 93,
  },
  {
    id: 19,
    title: "Pratiquem a Gratidão Diária",
    content:
      "Agradeçam a Deus um pelo outro todos os dias. Expressem gratidão pelas pequenas coisas. A gratidão transforma a perspectiva e aumenta a satisfação no relacionamento. Mantenham um diário de gratidão ou compartilhem três coisas pelas quais são gratos diariamente.",
    category: "Gratidão",
    icon: Star,
    verse:
      "Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus. - 1 Tessalonicenses 5:18",
    popularity: 86,
  },
  {
    id: 20,
    title: "Resolvam Conflitos com Maturidade",
    content:
      "Conflitos são normais, mas a forma como os resolvem faz toda diferença. Evitem gritar, xingar ou trazer à tona erros do passado. Foquem no problema, não na pessoa. Busquem soluções juntos e estejam dispostos a ceder. A maturidade no conflito fortalece o relacionamento.",
    category: "Conflitos",
    icon: Shield,
    verse: "Se possível, na medida em que depender de vocês, vivam em paz com todos. - Romanos 12:18",
    popularity: 88,
  },
  {
    id: 21,
    title: "Mantenham Comunicação Constante",
    content:
      "Não deixem a comunicação esfriar. Conversem sobre o dia, compartilhem pensamentos e sentimentos. Use mensagens, ligações e encontros para manter a conexão. A comunicação constante previne mal-entendidos e mantém a intimidade.",
    category: "Comunicação",
    icon: Phone,
    verse: "A resposta branda desvia o furor, mas a palavra dura suscita a ira. - Provérbios 15:1",
    popularity: 85,
  },
  {
    id: 22,
    title: "Celebrem as Conquistas Juntos",
    content:
      "Alegrem-se com as vitórias um do outro. Sejam o maior torcedor e incentivador. Celebrem marcos importantes e pequenas conquistas. A celebração compartilhada multiplica a alegria e fortalece o apoio mútuo.",
    category: "Celebração",
    icon: Award,
    verse: "Alegrem-se com os que se alegram; chorem com os que choram. - Romanos 12:15",
    popularity: 82,
  },
  {
    id: 23,
    title: "Protejam o Relacionamento de Influências Negativas",
    content:
      "Sejam seletivos sobre quem influencia seu relacionamento. Evitem amizades que não respeitam seus valores ou que tentam semear discórdia. Protejam seu relacionamento de comparações nas redes sociais. Criem limites saudáveis com pessoas tóxicas.",
    category: "Proteção",
    icon: Shield,
    verse: "Não se deixem enganar: as más companhias corrompem os bons costumes. - 1 Coríntios 15:33",
    popularity: 78,
  },
  {
    id: 24,
    title: "Invistam em Crescimento Pessoal",
    content:
      "Tornem-se a melhor versão de si mesmos. Trabalhem em suas fraquezas e desenvolvam seus talentos. Um relacionamento saudável é formado por duas pessoas saudáveis. O crescimento pessoal beneficia o relacionamento como um todo.",
    category: "Crescimento",
    icon: TrendingUp,
    verse: "Antes, cresçam na graça e no conhecimento de nosso Senhor e Salvador Jesus Cristo. - 2 Pedro 3:18",
    popularity: 84,
  },
  {
    id: 25,
    title: "Mantenham a Fé em Primeiro Lugar",
    content:
      "Nunca coloquem o relacionamento acima de Deus. Quando Deus está no centro, tudo mais se alinha. Busquem primeiro o Reino de Deus e Sua justiça. Um relacionamento centrado em Cristo é um relacionamento abençoado e duradouro.",
    category: "Fé",
    icon: Compass,
    verse:
      "Mas busquem primeiro o Reino de Deus e a sua justiça, e todas essas coisas serão acrescentadas a vocês. - Mateus 6:33",
    popularity: 99,
  },
  {
    id: 26,
    title: "Pratiquem a Humildade",
    content:
      "Reconheçam seus erros e peçam desculpas quando necessário. A humildade desarma conflitos e cria espaço para o crescimento. Não sejam orgulhosos ou teimosos. A humildade é uma virtude que reflete o caráter de Cristo.",
    category: "Humildade",
    icon: Heart,
    verse:
      "Nada façam por ambição egoísta ou por vaidade, mas humildemente considerem os outros superiores a si mesmos. - Filipenses 2:3",
    popularity: 81,
  },
  {
    id: 27,
    title: "Criem Memórias Significativas",
    content:
      "Invistam em experiências juntos. Viajem, experimentem coisas novas e criem histórias para contar. As memórias compartilhadas são o tesouro do relacionamento. Documentem momentos especiais e revisitem memórias felizes regularmente.",
    category: "Memórias",
    icon: Calendar,
    verse: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele. - Salmos 118:24",
    popularity: 87,
  },
  {
    id: 28,
    title: "Nunca Parem de Aprender",
    content:
      "O relacionamento é uma jornada de aprendizado contínuo. Leiam livros, assistam palestras e busquem sempre melhorar. Estejam abertos a feedback e dispostos a mudar. O aprendizado constante mantém o relacionamento fresco e em crescimento.",
    category: "Aprendizado",
    icon: BookOpen,
    verse: "O sábio de coração aceita os mandamentos, mas o insensato e tagarela será arruinado. - Provérbios 10:8",
    popularity: 80,
  },
]

const categories = [
  { name: "Todas", count: relationshipTips.length },
  { name: "Fundamentos", count: relationshipTips.filter((tip) => tip.category === "Fundamentos").length },
  { name: "Espiritualidade", count: relationshipTips.filter((tip) => tip.category === "Espiritualidade").length },
  { name: "Comunicação", count: relationshipTips.filter((tip) => tip.category === "Comunicação").length },
  { name: "Pureza", count: relationshipTips.filter((tip) => tip.category === "Pureza").length },
  { name: "Crescimento", count: relationshipTips.filter((tip) => tip.category === "Crescimento").length },
  { name: "Romance", count: relationshipTips.filter((tip) => tip.category === "Romance").length },
  { name: "Conflitos", count: relationshipTips.filter((tip) => tip.category === "Conflitos").length },
]

export default function DicasPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"default" | "popularity">("default")

  let filteredTips =
    selectedCategory === "Todas"
      ? relationshipTips
      : relationshipTips.filter((tip) => tip.category === selectedCategory)

  if (searchQuery) {
    filteredTips = filteredTips.filter(
      (tip) =>
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  if (sortBy === "popularity") {
    filteredTips = [...filteredTips].sort((a, b) => b.popularity - a.popularity)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1.5">
            <BookOpen className="h-3.5 w-3.5 mr-1.5 inline" />
            Sabedoria Bíblica para Relacionamentos
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Dicas para Relacionamentos Cristãos
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-3xl mx-auto mb-8">
            Conselhos bíblicos e práticos para construir relacionamentos saudáveis, duradouros e centrados em Cristo
          </p>

          <div className="flex flex-wrap gap-6 justify-center mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">28</div>
              <div className="text-sm text-muted-foreground">Dicas Completas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Categorias</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Baseado na Bíblia</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar dicas por título, conteúdo ou categoria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-background"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={sortBy === "default" ? "default" : "outline"}
                onClick={() => setSortBy(sortBy === "default" ? "popularity" : "default")}
                className="h-12"
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                {sortBy === "default" ? "Padrão" : "Populares"}
              </Button>

              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="h-12 px-4"
              >
                {viewMode === "grid" ? <List className="h-5 w-5" /> : <Grid3x3 className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "secondary"}
                className={`px-5 py-2.5 text-sm cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "hover:bg-primary/10 hover:scale-105"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>
              Mostrando <span className="font-semibold text-foreground">{filteredTips.length}</span> de{" "}
              <span className="font-semibold text-foreground">{relationshipTips.length}</span> dicas
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredTips.length === 0 ? (
            <Card className="p-12 text-center">
              <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhuma dica encontrada</h3>
              <p className="text-muted-foreground">Tente ajustar sua busca ou filtros para encontrar o que procura</p>
            </Card>
          ) : (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-4"}>
              {filteredTips.map((tip, index) => {
                const IconComponent = tip.icon
                return (
                  <Card
                    key={tip.id}
                    className="bg-card border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary" className="text-sm">
                          <IconComponent className="h-3.5 w-3.5 mr-1.5" />
                          {tip.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                          {tip.popularity}%
                        </Badge>
                      </div>
                      <CardTitle className="text-foreground text-xl group-hover:text-primary transition-colors">
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{tip.content}</p>

                      <Card className="bg-gradient-to-br from-secondary/30 to-accent/10 border-primary/20 shadow-sm">
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-3">
                            <BookOpen className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <blockquote className="text-sm italic text-foreground leading-relaxed">
                              {tip.verse}
                            </blockquote>
                          </div>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Continue Sua Jornada de Crescimento
          </h3>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Explore mais recursos para fortalecer seu relacionamento e sua fé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/versos">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base">
                <BookOpen className="h-5 w-5 mr-2" />
                Versículos sobre Amor
              </Button>
            </Link>
            <Link href="/cantadas">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent">
                <Heart className="h-5 w-5 mr-2" />
                Cantadas Cristãs
              </Button>
            </Link>
            <Link href="/mensagens">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent">
                <MessageCircle className="h-5 w-5 mr-2" />
                Mensagens Prontas
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
