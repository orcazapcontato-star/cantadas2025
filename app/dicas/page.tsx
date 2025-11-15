"use client"

import { useState, useEffect } from "react"
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
  Copy,
  Check,
} from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { useFavorites } from "@/lib/favorites-context"

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
  {
    id: 29,
    title: "Pratiquem a Escuta Ativa",
    content:
      "Ouçam verdadeiramente quando seu parceiro fala. Não apenas esperem sua vez de falar. Façam perguntas, mostrem interesse genuíno e validem seus sentimentos. A escuta ativa demonstra amor e respeito, criando um espaço seguro para comunicação profunda.",
    category: "Comunicação",
    icon: MessageCircle,
    verse: "Meus queridos irmãos, entendam isto: todo homem seja pronto para ouvir, tardio para falar. - Tiago 1:19",
    popularity: 86,
  },
  {
    id: 30,
    title: "Mantenham a Saúde Física e Mental",
    content:
      "Cuidem de seus corpos e mentes. Exercitem-se, durmam bem e busquem ajuda profissional quando necessário. Um relacionamento saudável requer pessoas saudáveis. Apoiem-se mutuamente na jornada de bem-estar.",
    category: "Bem-estar",
    icon: Heart,
    verse: "Não sabem que o corpo de vocês é templo do Espírito Santo que habita em vocês? - 1 Coríntios 6:19",
    popularity: 79,
  },
  {
    id: 31,
    title: "Fortaleçam a Intimidade Emocional",
    content:
      "Compartilhem medos, sonhos e inseguranças sem medo de julgamento. A intimidade emocional cria conexão profunda e segurança no relacionamento. Conversem abertamente sobre sentimentos e aprendam a apoiar-se mutuamente.",
    category: "Intimidade",
    icon: Heart,
    verse: "Portanto, confiem uns nos outros profundamente, pois o amor cobre uma multidão de pecados. - 1 Pedro 4:8",
    popularity: 88,
  },
  {
    id: 32,
    title: "Planejem Momentos de Lazer",
    content:
      "Reserve tempo para relaxar juntos, sem preocupações externas. Atividades recreativas fortalecem o vínculo e renovam a energia emocional. Encontros divertidos mantêm o relacionamento leve e prazeroso.",
    category: "Bem-estar",
    icon: Smile,
    verse: "Tudo tem o seu tempo determinado, e há tempo para todo propósito debaixo do céu. - Eclesiastes 3:1",
    popularity: 82,
  },
  {
    id: 33,
    title: "Pratiquem a Intimidade Física com Respeito",
    content:
      "A intimidade física deve ser expressa com amor, respeito e consentimento. Fortalece o vínculo e a confiança, mantendo limites saudáveis conforme valores pessoais e espirituais.",
    category: "Intimidade",
    icon: Users,
    verse: "Fujam da imoralidade sexual. Todos os outros pecados que alguém comete, fora do corpo os comete; mas quem se entrega à imoralidade sexual peca contra o próprio corpo. - 1 Coríntios 6:18",
    popularity: 85,
  },
  {
    id: 34,
    title: "Façam Planejamento Financeiro Conjunto",
    content:
      "Discutam gastos, economias e investimentos juntos. Planejar o futuro financeiro fortalece a confiança e evita desentendimentos. Estabeleçam metas claras e revisem periodicamente.",
    category: "Finanças",
    icon: TrendingUp,
    verse: "O bom senso faz crescer o conhecimento, mas o coração insensato se perde. - Provérbios 18:15",
    popularity: 80,
  },
  {
    id: 35,
    title: "Respeitem o Espaço Individual",
    content:
      "Cada pessoa precisa de momentos para si mesma. Respeitar o espaço do outro fortalece a confiança e mantém a individualidade saudável. Apoiem hobbies, amizades e interesses pessoais.",
    category: "Fundamentos",
    icon: UserCheck,
    verse: "Não se amoldem ao padrão deste mundo, mas transformem-se pela renovação da mente. - Romanos 12:2",
    popularity: 87,
  },
  {
    id: 36,
    title: "Busquem Crescimento Intelectual",
    content:
      "Leiam, estudem e aprendam juntos. A mente estimulada gera conversas profundas e mantém o relacionamento dinâmico. Compartilhar conhecimento fortalece admiração e respeito mútuos.",
    category: "Crescimento",
    icon: BookOpen,
    verse: "O sábio de coração aceita os mandamentos, mas o insensato e tagarela será arruinado. - Provérbios 10:8",
    popularity: 78,
  },
  {
    id: 37,
    title: "Tenham Rotinas Espirituais em Comum",
    content:
      "Participem juntos de leituras devocionais, estudos bíblicos ou meditação. A espiritualidade compartilhada cria unidade e propósito divino no relacionamento.",
    category: "Espiritualidade",
    icon: Compass,
    verse: "Onde estiverem dois ou três reunidos em meu nome, ali estou no meio deles. - Mateus 18:20",
    popularity: 90,
  },
  {
    id: 38,
    title: "Sejam Criativos no Romance",
    content:
      "Surpreendam-se com pequenos gestos e novidades. Cartas, surpresas ou encontros inesperados mantêm a chama acesa e mostram cuidado e atenção.",
    category: "Romance",
    icon: Sparkles,
    verse: "O amor seja sem hipocrisia. Detestem o mal, apeguem-se ao bem. - Romanos 12:9",
    popularity: 88,
  },
  {
    id: 39,
    title: "Desenvolvam Resiliência em Conflitos",
    content:
      "Aprendam a enfrentar desentendimentos com calma e maturidade. A resiliência emocional evita que pequenas discussões se tornem grandes problemas. Busquem soluções, não culpados.",
    category: "Conflitos",
    icon: Shield,
    verse: "Sejam fortes e corajosos. Não temam, pois o Senhor, seu Deus, estará com vocês. - Josué 1:9",
    popularity: 84,
  },
  {
    id: 40,
    title: "Dedique Tempo para Autocuidado",
    content:
      "O cuidado pessoal é essencial para manter saúde física, mental e emocional. Um parceiro saudável contribui para um relacionamento saudável. Incentivem hábitos de bem-estar.",
    category: "Bem-estar",
    icon: Heart,
    verse: "Amarás o teu próximo como a ti mesmo. - Mateus 22:39",
    popularity: 83,
  },
  {
    id: 41,
    title: "Comemorem Datas Especiais",
    content:
      "Não deixem passar aniversários, conquistas e datas importantes. Celebrações reforçam carinho, atenção e mostram valorização do relacionamento.",
    category: "Tempo",
    icon: Calendar,
    verse: "Tudo o que fizerem, façam de todo o coração, como para o Senhor, e não para os homens. - Colossenses 3:23",
    popularity: 81,
  },
  {
    id: 42,
    title: "Pratiquem a Honestidade Radical",
    content:
      "Sejam sempre sinceros, mesmo quando é difícil. A transparência fortalece confiança e evita mal-entendidos. A honestidade é a base de qualquer relacionamento duradouro.",
    category: "Fundamentos",
    icon: Shield,
    verse: "A boca fala do que está cheio o coração. - Lucas 6:45",
    popularity: 89,
  },
  {
    id: 43,
    title: "Estabeleçam Tradições de Casal",
    content:
      "Criem hábitos e rituais que só vocês compartilham. Tradições fortalecem identidade de casal e criam memórias únicas e significativas.",
    category: "Memórias",
    icon: Calendar,
    verse: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele. - Salmos 118:24",
    popularity: 82,
  },
  {
    id: 44,
    title: "Cultivem o Hábito da Gratidão Mútua",
    content:
      "Expressem diariamente apreciação pelo parceiro. Pequenos reconhecimentos fortalecem o vínculo e aumentam a satisfação no relacionamento.",
    category: "Gratidão",
    icon: Star,
    verse: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco. - 1 Tessalonicenses 5:18",
    popularity: 85,
  },
  {
    id: 45,
    title: "Invistam em Comunicação Não Verbal",
    content:
      "Gestos, toques e olhares dizem muito. Aprender a se comunicar sem palavras aumenta intimidade e compreensão mútua.",
    category: "Comunicação",
    icon: MessageCircle,
    verse: "O coração do homem planeja o seu caminho, mas o Senhor dirige os seus passos. - Provérbios 16:9",
    popularity: 83,
  },
  {
    id: 46,
    title: "Revisem Objetivos Periodicamente",
    content:
      "Conversem sobre metas de vida, sonhos e planos regularmente. Ajustes periódicos mantêm o relacionamento alinhado e fortalecem a parceria.",
    category: "Planejamento",
    icon: Target,
    verse: "Os planos do diligente tendem à abundância, mas o precipitado acaba na pobreza. - Provérbios 21:5",
    popularity: 80,
  },
  {
    id: 47,
    title: "Pratiquem a Empatia Diária",
    content:
      "Esforcem-se para compreender o ponto de vista do parceiro em todas as situações. A empatia fortalece a conexão e evita mal-entendidos.",
    category: "Fundamentos",
    icon: Users,
    verse: "Alegrem-se com os que se alegram; chorem com os que choram. - Romanos 12:15",
    popularity: 86,
  },
  {
    id: 48,
    title: "Fortaleçam a Fé Juntos",
    content:
      "Participem de atividades espirituais em conjunto, apoiando o crescimento espiritual mútuo. A fé compartilhada cria unidade e propósito no relacionamento.",
    category: "Espiritualidade",
    icon: Compass,
    verse: "E consideremo-nos uns aos outros para nos estimularmos ao amor e às boas obras. - Hebreus 10:24",
    popularity: 88,
  },
  {
    id: 49,
    title: "Pratiquem a Escuta Ativa",
    content:
      "Dediquem atenção total ao parceiro ao ouvir. Evitar interrupções e validar sentimentos aumenta a compreensão e intimidade emocional.",
    category: "Comunicação",
    icon: MessageCircle,
    verse: "A resposta branda desvia o furor, mas a palavra dura suscita a ira. - Provérbios 15:1",
    popularity: 87,
  },
  {
    id: 50,
    title: "Mantenham a Pureza nos Relacionamentos",
    content:
      "Respeitem limites físicos e emocionais de acordo com valores pessoais e espirituais. A pureza fortalece confiança e respeito mútuo.",
    category: "Pureza",
    icon: Shield,
    verse: "Fujam da imoralidade sexual. - 1 Coríntios 6:18",
    popularity: 85,
  },
  {
    id: 51,
    title: "Desafiem-se a Crescer Juntos",
    content:
      "Busquem aprender coisas novas e enfrentar desafios como equipe. Crescer juntos fortalece a parceria e mantém o relacionamento dinâmico.",
    category: "Crescimento",
    icon: TrendingUp,
    verse: "Ensina a criança no caminho em que deve andar, e até quando envelhecer não se desviará dele. - Provérbios 22:6",
    popularity: 82,
  },
  {
    id: 52,
    title: "Cultivem a Paixão no Dia a Dia",
    content:
      "Mantenham gestos de carinho, surpresas e atenção ao parceiro. Pequenos atos românticos renovam a chama do amor diariamente.",
    category: "Romance",
    icon: Heart,
    verse: "Acima de tudo, revistam-se do amor, que é o elo perfeito. - Colossenses 3:14",
    popularity: 89,
  },
  {
    id: 53,
    title: "Gerenciem Conflitos com Calma",
    content:
      "Em situações de desentendimento, busquem soluções pacíficas e respeitosas. Evitar brigas impulsivas preserva o relacionamento e fortalece a confiança.",
    category: "Conflitos",
    icon: Shield,
    verse: "Sejam todos prontos para ouvir, tardios para falar, tardios para irar-se. - Tiago 1:19",
    popularity: 86,
  },
  {
    id: 54,
    title: "Pratiquem a Honestidade Radical",
    content:
      "Sejam sempre transparentes sobre sentimentos e intenções. A sinceridade evita conflitos e constrói confiança verdadeira.",
    category: "Fundamentos",
    icon: Users,
    verse: "Portanto, deixemos a mentira e falemos a verdade cada um com o seu próximo. - Efésios 4:25",
    popularity: 80,
  },
  {
    id: 55,
    title: "Cultivem a Paciência",
    content:
      "Aprender a esperar e compreender os momentos do outro fortalece a relação e evita decisões impulsivas.",
    category: "Fundamentos",
    icon: Users,
    verse: "O amor é paciente, o amor é bondoso. - 1 Coríntios 13:4",
    popularity: 82,
  },
  {
    id: 56,
    title: "Valorizem Pequenos Gestos",
    content:
      "Gestos simples de atenção e carinho demonstram cuidado constante e mantêm o vínculo emocional saudável.",
    category: "Fundamentos",
    icon: Users,
    verse: "Em tudo o que fizerem, façam de todo o coração, como para o Senhor. - Colossenses 3:23",
    popularity: 78,
  },
  {
    id: 57,
    title: "Mantenham Compromissos",
    content:
      "Cumprir promessas, mesmo nas pequenas coisas, demonstra respeito e integridade no relacionamento.",
    category: "Fundamentos",
    icon: Users,
    verse: "O que promete ao seu próximo não deixe de cumprir. - Eclesiastes 5:4",
    popularity: 85,
  },
  {
    id: 58,
    title: "Cultivem a Gratidão Mútua",
    content:
      "Reconhecer e agradecer as atitudes do parceiro fortalece a parceria e incentiva comportamentos positivos.",
    category: "Fundamentos",
    icon: Users,
    verse: "Dai graças em tudo. - 1 Tessalonicenses 5:18",
    popularity: 79,
  },
  {
    id: 59,
    title: "Sejam Coerentes em Palavras e Ações",
    content:
      "A congruência entre o que se diz e o que se faz gera segurança emocional e respeito mútuo.",
    category: "Fundamentos",
    icon: Users,
    verse: "Portanto, tudo o que vocês querem que os outros façam a vocês, façam também vocês a eles. - Mateus 7:12",
    popularity: 81,
  },
  {
    id: 60,
    title: "Priorize a Conexão Diária",
    content:
      "Reserve momentos para diálogo, carinho e atenção. Pequenas ações diárias fortalecem o vínculo e previnem distanciamentos.",
    category: "Fundamentos",
    icon: Users,
    verse: "E consideremo-nos uns aos outros, para nos estimularmos ao amor e às boas obras. - Hebreus 10:24",
    popularity: 84,
  },
  {
    id: 61,
    title: "Construam Confiança Mútua",
    content:
      "A confiança é a base de qualquer relacionamento saudável. Sejam honestos, cumpram promessas e respeitem limites.",
    category: "Fundamentos",
    icon: Users,
    verse: "O homem que é fiel no pouco, também é fiel no muito.” – Lucas 16:10",
    popularity: 92,
  },
  {
    id: 62,
    title: "Orem Juntos",
    content:
      "Reservem momentos diários ou semanais para orar juntos, fortalecendo a conexão espiritual e buscando orientação divina em decisões e desafios do relacionamento.",
    category: "Espiritualidade",
    icon: Compass, // ícone de mãos em oração
    verse: "Porque onde estiverem dois ou três reunidos em meu nome, ali estou no meio deles. - Mateus 18:20",
    popularity: 92,
  },
  {
    id: 63,
    title: "Estudem Textos Sagrados em Conjunto",
    content:
      "Leiam e discutam passagens espirituais juntos. Isso incentiva reflexão, aprendizado e crescimento mútuo.",
    category: "Espiritualidade",
    icon: BookOpen,
    verse: "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho. - Salmos 119:105",
    popularity: 80,
  },
  {
    id: 64,
    title: "Pratiquem Atos de Serviço",
    content:
      "Realizem ações de bondade e serviço juntos, fortalecendo a fé através da prática e do amor ao próximo.",
    category: "Espiritualidade",
    icon: Compass,
    verse: "Cada um administre aos outros o dom que recebeu, como bons despenseiros da multiforme graça de Deus. - 1 Pedro 4:10",
    popularity: 82,
  },
  {
    id: 65,
    title: "Cultivem Gratidão Juntos",
    content:
      "Compartilhem diariamente motivos de gratidão. Reconhecer bênçãos fortalece a fé e a união espiritual.",
    category: "Espiritualidade",
    icon: Star,
    verse: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco. - 1 Tessalonicenses 5:18",
    popularity: 79,
  },
  {
    id: 66,
    title: "Participem de Comunidades Espirituais",
    content:
      "Envolvam-se em grupos ou comunidades de fé. O apoio coletivo fortalece a espiritualidade e a motivação no relacionamento.",
    category: "Espiritualidade",
    icon: Users,
    verse: "Não abandonemos a nossa congregação, como é costume de alguns, antes admoestemo-nos uns aos outros. - Hebreus 10:25",
    popularity: 77,
  },
  {
    id: 67,
    title: "Meditem Juntos",
    content:
      "Reserve um tempo para meditar sobre ensinamentos espirituais ou momentos de introspecção, compartilhando insights e crescimento.",
    category: "Espiritualidade",
    icon: Users,
    verse: "Aquietai-vos e sabei que eu sou Deus. - Salmos 46:10",
    popularity: 75,
  },
  {
    id: 68,
    title: "Celebrem Conquistas Espirituais",
    content:
      "Reconheçam juntos os progressos na fé e na espiritualidade, reforçando a motivação e a alegria do crescimento mútuo.",
    category: "Espiritualidade",
    icon: Users,
    verse: "Regozijai-vos sempre. - 1 Tessalonicenses 5:16",
    popularity: 78,
  },
  {
    id: 69,
    title: "Pratiquem Silêncio e Reflexão",
    content:
      "Reserve momentos de silêncio juntos para refletir sobre a fé e os ensinamentos espirituais, fortalecendo a conexão interior.",
    category: "Espiritualidade",
    icon: Users,
    verse: "Mas tu, quando orares, entra no teu quarto, e fechando a porta, ora a teu Pai que está em secreto. - Mateus 6:6",
    popularity: 76,
  },
  {
    id: 70,
    title: "Estabeleçam Objetivos Espirituais",
    content:
      "Definam juntos metas de crescimento espiritual, como estudo da palavra, orações ou serviços comunitários.",
    category: "Espiritualidade",
    icon: Target,
    verse: "Esforçai-vos por entrar pela porta estreita; porque muitos, digo-vos, tentarão entrar, e não poderão. - Lucas 13:24",
    popularity: 72,
  } ,
  {
    id: 71,
    title: "Escute com Atenção",
    content:
      "Dedique-se a ouvir de verdade. Preste atenção não apenas às palavras, mas também aos sentimentos por trás delas. Evite interromper e faça perguntas para entender melhor.",
    category: "Comunicação",
    icon: MessageCircle,
    verse: "Quem responde antes de ouvir comete insensatez. - Provérbios 18:13",
    popularity: 85,
  },
  {
    id: 72,
    title: "Evite Julgamentos Precipitados",
    content:
      "Antes de responder, reflita sobre o que ouviu. Evite tirar conclusões precipitadas ou julgar sem entender o contexto. Isso promove compreensão e evita conflitos desnecessários.",
    category: "Comunicação",
    icon: MessageCircle,
    verse: "Não julguem, para que vocês não sejam julgados. - Mateus 7:1",
    popularity: 80,
  },
  {
    id: 73,
    title: "Use Palavras de Incentivo",
    content:
      "Seja generoso com elogios e encorajamentos. Palavras positivas fortalecem relacionamentos e elevam o espírito de quem ouve. Evite críticas destrutivas e comentários negativos.",
    category: "Comunicação",
    icon: MessageCircle,
    verse: "A morte e a vida estão no poder da língua; os que gostam de usá-la comerão do seu fruto. - Provérbios 18:21",
    popularity: 88,
  },
  {
    id: 74,
    title: "Comunique-se com Clareza",
    content:
      "Expresse suas ideias e sentimentos de forma clara e objetiva. Evite ambiguidades ou indiretas que possam gerar mal-entendidos. Clareza é sinal de respeito pelo outro.",
    category: "Comunicação",
    icon: MessageCircle,
    verse: "Portanto, cada um de vocês fale a verdade com o seu próximo. - Efésios 4:25",
    popularity: 83,
  },
  {
    id: 75,
    title: "Seja Paciente ao Falar",
    content:
      "Não se precipite em respostas ou reações. Respire fundo, organize seus pensamentos e fale com calma. A paciência evita desentendimentos e demonstra maturidade emocional.",
    category: "Comunicação",
    icon: MessageCircle,
    verse: "A resposta branda desvia o furor, mas a palavra dura suscita a ira. - Provérbios 15:1",
    popularity: 87,
  },
  {
    id: 76,
    title: "Pratique a Empatia",
    content:
      "Coloque-se no lugar do outro antes de falar. Tente compreender seus sentimentos e perspectivas. A empatia cria conexões mais profundas e comunicação mais harmoniosa.",
    category: "Comunicação",
    icon: MessageCircle,
    verse: "Regozijem-se com os que se alegram; chorem com os que choram. - Romanos 12:15",
    popularity: 86,
  },
  {
    id: 77,
    title: "Evite Falar com Raiva",
    content:
      "Quando estiver irritado, espere antes de falar. Palavras ditas com raiva podem ferir e criar feridas difíceis de curar. Espere o momento certo para se expressar com amor.",
    category: "Comunicação",
    icon: MessageCircle,
    verse: "Sejam todos prontos para ouvir, tardios para falar, tardios para se irar. - Tiago 1:19",
    popularity: 89,
  },
  {
    id: 78,
    title: "Controle Seus Pensamentos",
    content:
      "A pureza começa na mente. Evite pensamentos impuros e distrações que possam levar a desejos prejudiciais. Pratique meditação e oração para manter seus pensamentos alinhados com seus valores.",
    category: "Pureza",
    icon: Heart,
    verse:
      "Pois, assim como imagina no seu coração, assim é ele. - Provérbios 23:7",
    popularity: 88,
  },
  {
    id: 79,
    title: "Escolha Bem Suas Companhias",
    content:
      "As pessoas ao seu redor influenciam suas escolhas. Cerque-se de amigos que respeitem seus valores e incentivem o crescimento espiritual e emocional. Evite amizades que pressionem para atitudes contrárias à sua fé e princípios.",
    category: "Pureza",
    icon: Heart,
    verse:
      "Não se deixem enganar: 'As más companhias corrompem os bons costumes.' - 1 Coríntios 15:33",
    popularity: 85,
  },
  {
    id: 80,
    title: "Seja Transparente e Honesto",
    content:
      "Em relacionamentos, comunique seus limites de forma clara e respeitosa. Honestidade evita mal-entendidos e mantém a pureza emocional e espiritual. Transparência fortalece confiança e intimidade verdadeira.",
    category: "Pureza",
    icon: Heart,
    verse:
      "Portanto, cada um de vocês deve abandonar a mentira e falar a verdade ao seu próximo, pois somos membros uns dos outros. - Efésios 4:25",
    popularity: 87,
  },
  {
    id: 81,
    title: "Valorize o Respeito Mútuo",
    content:
      "Respeite a si mesmo e ao outro, estabelecendo limites saudáveis em todos os relacionamentos. A pureza não é apenas sobre evitar pecado, mas sobre construir respeito, dignidade e amor verdadeiro.",
    category: "Pureza",
    icon: Heart,
    verse:
      "Amem uns aos outros com amor fraternal e honrem uns aos outros acima de vocês mesmos. - Romanos 12:10",
    popularity: 90,
  },
  {
    id: 82,
    title: "Fortaleça Sua Vida Espiritual",
    content:
      "A pureza é sustentada por uma vida de oração, leitura da Palavra e comunhão com Deus. Quanto mais você se aproxima de Deus, mais naturalmente você mantém seu coração, mente e corpo protegidos.",
    category: "Pureza",
    icon: Heart,
    verse:
      "Fujam da imoralidade sexual. Cada um de vocês saiba controlar o próprio corpo de maneira santa e honrosa. - 1 Tessalonicenses 4:3-4",
    popularity: 93,
  },
  {
    id: 83,
    title: "Pratique o Autocontrole",
    content:
      "A disciplina pessoal é essencial para manter a pureza. Aprenda a dizer 'não' à tentação e a direcionar suas ações para o que é correto e saudável.",
    category: "Pureza",
    icon: Shield,
    verse:
      "Todo aquele que luta, de tudo se abstém; eles o fazem para alcançar uma coroa que perece, mas nós, para uma coroa que dura para sempre. - 1 Coríntios 9:25",
    popularity: 91,
  },
  {
    id: 84,
    title: "Seja Transparente com seu Parceiro",
    content:
      "Em relacionamentos, a honestidade e abertura fortalecem a pureza mútua. Compartilhe seus desafios, medos e limites de maneira respeitosa e amorosa.",
    category: "Pureza",
    icon: Shield,
    verse:
      "Portanto, deixando a mentira, fale cada um a verdade com o seu próximo. - Efésios 4:25",
    popularity: 84,
  },
  {
    id: 85,
    title: "Busque Apoio Quando Necessário",
    content:
      "Não enfrente tentações sozinho. Converse com amigos confiáveis, mentores ou líderes espirituais para receber orientação e apoio na manutenção da pureza.",
    category: "Pureza",
    icon: Shield,
    verse:
      "O ferro com ferro se afia, e assim o homem afia o rosto do seu amigo. - Provérbios 27:17",
    popularity: 88,
  },
  {
    id: 86,
    title: "Valorize a Castidade",
    content:
      "A castidade é uma expressão de respeito próprio e amor a Deus. Valorize este princípio como algo que protege sua dignidade, seus relacionamentos e sua fé.",
    category: "Pureza",
    icon: Shield,
    verse:
      "Fujam da imoralidade sexual. Cada um saiba possuir o seu corpo em santidade e honra. - 1 Tessalonicenses 4:3-4",
    popularity: 92,
  },
  {
    id: 87,
    title: "Evite Conteúdos Impróprios",
    content:
      "Proteja seus olhos e mente do que é prejudicial à pureza. Redes sociais, filmes e músicas podem influenciar pensamentos e comportamentos, então escolha conteúdos edificantes.",
    category: "Pureza",
    icon: Shield,
    verse:
      "Olho nenhum viu, ouvido nenhum ouviu, mente nenhuma imaginou o que Deus preparou para aqueles que o amam. - 1 Coríntios 2:9",
    popularity: 86,
  },
  {
    id: 87,
    title: "Cresçam com Propósitos Alinhados",
    content:
      "Tenham metas de vida que se complementem. Conversem sobre sonhos, planos e visões para o futuro. Quando o casal tem propósito em comum, o relacionamento ganha direção e sentido. Trabalhem juntos para alcançar algo maior do que vocês mesmos.",
    category: "Crescimento",
    icon: TrendingUp,
    verse: "Andarão dois juntos, se não estiverem de acordo? - Amós 3:3",
    popularity: 92,
  },
  {
    id: 89,
    title: "Busquem Crescimento Espiritual Juntos",
    content:
      "Incentivem o crescimento pessoal e espiritual um do outro. Leiam a Bíblia juntos, participem de estudos bíblicos e apoiem os sonhos e objetivos mútuos. Frequentem a igreja regularmente e sirvam juntos no ministério. O crescimento espiritual conjunto fortalece o vínculo e prepara vocês para um futuro abençoado.",
    category: "Crescimento",
    icon: TrendingUp,
    verse: "Como o ferro afia o ferro, assim um homem afia o outro. - Provérbios 27:17",
    popularity: 88,
  },
  {
    id: 90,
    title: "Aprendam com os Desafios",
    content:
      "Os momentos difíceis são oportunidades de amadurecimento. Em vez de culpar um ao outro, reflitam juntos sobre o que podem aprender e como podem evoluir. Cada obstáculo superado em união torna o amor mais maduro e resistente.",
    category: "Crescimento",
    icon: TrendingUp,
    verse: "Sabemos que as tribulações produzem perseverança; a perseverança, experiência; e a experiência, esperança. - Romanos 5:3-4",
    popularity: 86,
  },
  {
    id: 91,
    title: "Invistam em Conhecimento",
    content:
      "Leiam livros, façam cursos e busquem sabedoria para melhorar como pessoas e como casal. O conhecimento abre a mente, fortalece a fé e prepara vocês para decisões mais sábias. Aprender juntos é uma forma poderosa de crescer em unidade.",
    category: "Crescimento",
    icon: TrendingUp,
    verse: "O coração do prudente adquire conhecimento; e o ouvido dos sábios busca o saber. - Provérbios 18:15",
    popularity: 84,
  },
  {
    id: 92,
    title: "Desenvolvam a Paciência e a Empatia",
    content:
      "O crescimento vem quando aprendemos a compreender o outro, mesmo nas diferenças. Sejam pacientes, escutem com atenção e busquem enxergar as situações pelos olhos do parceiro. A empatia é uma das maiores expressões de amor.",
    category: "Crescimento",
    icon: TrendingUp,
    verse: "Revesti-vos de compaixão, bondade, humildade, mansidão e paciência. - Colossenses 3:12",
    popularity: 91,
  },
  {
    id: 93,
    title: "Celebrem Cada Conquista",
    content:
      "Reconheçam o progresso, por menor que seja. Celebrar as vitórias individuais e do casal motiva a continuar crescendo. A gratidão fortalece o relacionamento e mantém a alegria viva em meio às responsabilidades diárias.",
    category: "Crescimento",
    icon: TrendingUp,
    verse: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus. - 1 Tessalonicenses 5:18",
    popularity: 89,
  },
  {
    id: 94,
    title: "Sejam Humildes para Reconhecer Erros",
    content:
      "O crescimento verdadeiro exige humildade. Admitir falhas, pedir perdão e buscar mudança mostra maturidade e amor. Um relacionamento saudável não é aquele sem erros, mas aquele onde ambos aprendem com eles.",
    category: "Crescimento",
    icon: TrendingUp,
    verse: "Deus resiste aos soberbos, mas dá graça aos humildes. - Tiago 4:6",
    popularity: 87,
  },
  {
    id: 95,
    title: "Cresçam Servindo um ao Outro",
    content:
      "O amor cresce quando há serviço mútuo. Ajude, apoie e esteja presente nas necessidades do parceiro. Quando colocamos o outro em primeiro lugar, nos tornamos mais parecidos com Cristo e o relacionamento floresce.",
    category: "Crescimento",
    icon: TrendingUp,
    verse: "Maior é aquele que serve. - Lucas 22:26",
    popularity: 90,
  },
  {
    id: 96,
    title: "Nunca Parem de Evoluir Juntos",
    content:
      "O relacionamento é uma jornada contínua. Continuem aprendendo, sonhando e crescendo lado a lado. Renovem o amor diariamente e mantenham o compromisso de serem melhores a cada dia, com Deus no centro.",
    category: "Crescimento",
    icon: TrendingUp,
    verse: "Mas crescei na graça e no conhecimento de nosso Senhor e Salvador Jesus Cristo. - 2 Pedro 3:18",
    popularity: 95,
  },
  {
    id: 97,
    title: "Valorize os Detalhes",
    content:
      "No romance, os pequenos gestos são os mais poderosos. Um bilhete, uma mensagem inesperada ou um olhar carinhoso podem reacender sentimentos profundos. Mostre que você se importa, mesmo nas pequenas coisas.",
    category: "Romance",
    icon: Sparkles,
    verse:
      "O amor seja sem hipocrisia. Aborrecei o mal e apegai-vos ao bem. - Romanos 12:9",
    popularity: 89,
  },
  {
    id: 98,
    title: "Recrie o Primeiro Encontro",
    content:
      "Reviver o primeiro encontro traz lembranças e emoções do início da relação. Planeje uma noite especial relembrando como tudo começou, e veja como isso fortalece a conexão entre vocês.",
    category: "Romance",
    icon: Sparkles,
    verse:
      "Lembra-te, pois, de onde caíste, e arrepende-te. - Apocalipse 2:5",
    popularity: 91,
  },
  {
    id: 99,
    title: "Elogie Sempre",
    content:
      "Os elogios sinceros fortalecem a autoestima e o vínculo entre o casal. Reconheça o esforço, a beleza e as qualidades da pessoa amada. Palavras gentis transformam o clima da relação.",
    category: "Romance",
    icon: Sparkles,
    verse:
      "As palavras agradáveis são como favo de mel: doces para a alma e medicina para o corpo. - Provérbios 16:24",
    popularity: 95,
  },
  {
    id: 100,
    title: "Crie Momentos a Dois",
    content:
      "Reserve tempo para estarem juntos, longe da rotina e das distrações. Pode ser um jantar, uma caminhada ou simplesmente assistir algo juntos. O importante é o tempo de qualidade.",
    category: "Romance",
    icon: Sparkles,
    verse:
      "Melhor é serem dois do que um, porque têm melhor paga do seu trabalho. - Eclesiastes 4:9",
    popularity: 92,
  },
  {
    id: 101,
    title: "Demonstre Afeto em Público",
    content:
      "Pequenos gestos de carinho em público mostram orgulho e amor. Segurar a mão, um abraço ou um elogio espontâneo demonstram respeito e segurança no relacionamento.",
    category: "Romance",
    icon: Sparkles,
    verse:
      "O amor não busca os seus interesses, não se irrita, não suspeita mal. - 1 Coríntios 13:5",
    popularity: 88,
  },
  {
    id: 102,
    title: "Seja Criativo no Amor",
    content:
      "Evite a rotina no relacionamento. Escreva cartas, planeje surpresas, use palavras novas e atitudes diferentes. A criatividade mantém o amor fresco e vivo.",
    category: "Romance",
    icon: Sparkles,
    verse:
      "Tudo o que fizerem, façam de todo o coração, como para o Senhor. - Colossenses 3:23",
    popularity: 94,
  },
  {
    id: 103,
    title: "Ouça com o Coração",
    content:
      "Romance também é escuta. Esteja presente nas conversas, mostre empatia e interesse genuíno. Amar é compreender e estar disposto a ouvir sem julgar.",
    category: "Romance",
    icon: Sparkles,
    verse:
      "Todo homem seja pronto para ouvir, tardio para falar, tardio para se irar. - Tiago 1:19",
    popularity: 90,
  },
  {
    id: 104,
    title: "Reforce o Compromisso",
    content:
      "Renove as promessas e reafirme o amor com frequência. Dizer 'eu te amo' nunca perde o poder. Relembrar o motivo pelo qual se escolheram fortalece o vínculo diariamente.",
    category: "Romance",
    icon: Sparkles,
    verse:
      "O amor jamais acaba. - 1 Coríntios 13:8",
    popularity: 96,
  },
  {
    id: 105,
    title: "Cuidem da Aparência um do Outro",
    content:
      "Manter-se atraente e cuidar da aparência é uma forma de amor e respeito. Mostre que você ainda deseja conquistar seu parceiro todos os dias.",
    category: "Romance",
    icon: Sparkles,
    verse:
      "Regozije-se o teu coração na mulher da tua mocidade. - Provérbios 5:18",
    popularity: 87,
  },
  {
    id: 106,
    title: "Transforme o Cotidiano em Romance",
    content:
      "Não espere datas especiais para demonstrar amor. Transforme momentos simples — como cozinhar juntos ou caminhar — em lembranças românticas e significativas.",
    category: "Romance",
    icon: Sparkles,
    verse:
      "Façam tudo com amor. - 1 Coríntios 16:14",
    popularity: 93,
  },
  {
    id: 107,
    title: "Ouçam Antes de Reagir",
    content:
      "Em um conflito, o instinto é se defender ou atacar. Mas ouvir com atenção e empatia pode mudar tudo. Às vezes, o outro só quer ser compreendido. Escute sem interromper e busque entender o que está por trás das palavras.",
    category: "Conflitos",
    icon: Shield,
    verse: "Todo homem deve ser pronto para ouvir, tardio para falar e tardio para irar-se. - Tiago 1:19",
    popularity: 91,
  },
  
  {
    id: 108,
    title: "Não Procurem Vencer, Procurem Entender",
    content:
      "O relacionamento não é uma competição. Quando um vence e o outro perde, ambos saem feridos. Em vez de provar quem está certo, procurem compreender os sentimentos e necessidades um do outro.",
    category: "Conflitos",
    icon: Shield,
    verse: "Nada façam por ambição egoísta ou vaidade, mas humildemente considerem os outros superiores a si mesmos. - Filipenses 2:3",
    popularity: 87,
  },
  
  {
    id: 109,
    title: "Dêem um Tempo se For Preciso",
    content:
      "Às vezes, insistir em conversar no calor do momento piora tudo. Se perceberem que a discussão está saindo do controle, façam uma pausa. Um tempo para respirar e refletir ajuda a evitar palavras que machucam.",
    category: "Conflitos",
    icon: Shield,
    verse: "Há tempo de ficar calado e tempo de falar. - Eclesiastes 3:7",
    popularity: 85,
  },
  
  {
    id: 110,
    title: "Evitem o Orgulho",
    content:
      "O orgulho impede o perdão e alimenta ressentimentos. Admitir erros e pedir desculpas não é sinal de fraqueza, mas de amor e coragem. Um coração humilde restaura o que o orgulho destrói.",
    category: "Conflitos",
    icon: Shield,
    verse: "Antes da destruição vem o orgulho, e antes da queda, o espírito altivo. - Provérbios 16:18",
    popularity: 90,
  },
  
  {
    id: 112,
    title: "Não Façam do Silêncio uma Arma",
    content:
      "O silêncio pode ser sábio, mas também pode ser usado para punir. Ignorar ou se afastar sem explicação aumenta a distância emocional. Se precisarem de espaço, digam com clareza e amor o porquê.",
    category: "Conflitos",
    icon: Shield,
    verse: "Quem encobre o ódio tem lábios mentirosos, e quem espalha calúnia é insensato. - Provérbios 10:18",
    popularity: 83,
  },
  {
    id: 113,
    title: "Evitem Generalizações",
    content:
      "Frases como 'você sempre' ou 'você nunca' alimentam a mágoa e desviam o foco do real problema. Falem sobre atitudes específicas e como se sentiram, sem atacar o caráter da pessoa.",
    category: "Conflitos",
    icon: Shield,
    verse: "As palavras agradáveis são como favo de mel, doces para a alma e medicina para o corpo. - Provérbios 16:24",
    popularity: 84,
  },
  
  {
    id: 114,
    title: "Busquem a Reconciliação, Não a Razão",
    content:
      "Mais importante do que provar um ponto é restaurar a conexão. Escolher a reconciliação é sinal de amor maduro. Às vezes, o perdão cura feridas que a razão jamais conseguiria.",
    category: "Conflitos",
    icon: Shield,
    verse: "Acima de tudo, revistam-se do amor, que é o elo perfeito. - Colossenses 3:14",
    popularity: 89,
  },
  
  {
    id: 115,
    title: "Orem Juntos Após um Conflito",
    content:
      "Nada une mais dois corações do que a oração. Depois de um desentendimento, orem pedindo sabedoria, perdão e restauração. A presença de Deus transforma feridas em crescimento.",
    category: "Conflitos",
    icon: Shield,
    verse: "Onde dois ou três estiverem reunidos em meu nome, ali eu estou no meio deles. - Mateus 18:20",
    popularity: 93,
  },
  {
    id: 116,
    title: "Planejem o Futuro Juntos",
    content:
      "Estabeleçam metas financeiras como casal — compra de casa, investimentos e aposentadoria. Caminhar na mesma direção financeira fortalece a união e evita decisões impulsivas.",
    category: "Finanças",
    icon: TrendingUp,
    verse: "Os planos do diligente tendem à abundância, mas a pressa leva à pobreza. - Provérbios 21:5",
    popularity: 82,
  },
  {
    id: 117,
    title: "Evitem Dívidas Desnecessárias",
    content:
      "Vivam com o que têm e evitem se endividar para manter aparências. Dívidas geram estresse e podem afetar a harmonia no relacionamento.",
    category: "Finanças",
    icon: TrendingUp,
    verse: "A ninguém devais coisa alguma, a não ser o amor. - Romanos 13:8",
    popularity: 91,
  },
  {
    id: 118,
    title: "Sejam Generosos",
    content:
      "A generosidade abre portas e abençoa o casal. Doar com amor demonstra gratidão e fé, lembrando que tudo o que temos vem de Deus.",
    category: "Finanças",
    icon: TrendingUp,
    verse: "Há maior felicidade em dar do que em receber. - Atos 20:35",
    popularity: 88,
  },
  {
    id: 119,
    title: "Criem um Orçamento Mensal",
    content:
      "Organizem juntos suas despesas e receitas. Um orçamento bem planejado evita brigas e mostra transparência nas decisões financeiras.",
    category: "Finanças",
    icon: TrendingUp,
    verse: "Quem é fiel no pouco também é fiel no muito. - Lucas 16:10",
    popularity: 79,
  },
  {
    id: 120,
    title: "Aprendam a Viver com Contentamento",
    content:
      "Evitem comparar-se a outros casais. A verdadeira riqueza está em viver com gratidão e contentamento, não em acumular bens.",
    category: "Finanças",
    icon: TrendingUp,
    verse: "Tendo, porém, sustento e com que nos vestir, estejamos contentes. - 1 Timóteo 6:8",
    popularity: 85,
  },
  {
    id: 121,
    title: "Decidam Grandes Gastos em Conjunto",
    content:
      "Antes de qualquer compra importante, conversem e orem juntos. Decisões financeiras compartilhadas fortalecem a confiança mútua.",
    category: "Finanças",
    icon: TrendingUp,
    verse: "Se dois de vós concordarem na terra em qualquer coisa que pedirem, isso lhes será feito. - Mateus 18:19",
    popularity: 83,
  },
  {
    id: 122,
    title: "Invistam no Conhecimento",
    content:
      "Busquem aprender sobre finanças pessoais e investimentos. A sabedoria financeira traz estabilidade e oportunidades para o futuro.",
    category: "Finanças",
    icon: TrendingUp,
    verse: "Com a sabedoria se edifica a casa, e com o entendimento ela se estabelece. - Provérbios 24:3",
    popularity: 87,
  },
  {
    id: 123,
    title: "Confiem em Deus como Provedor",
    content:
      "Façam sua parte com diligência, mas lembrem-se de que Deus é quem supre todas as necessidades. A fé traz paz mesmo nos tempos difíceis.",
    category: "Finanças",
    icon: TrendingUp,
    verse: "O meu Deus suprirá todas as vossas necessidades segundo as suas riquezas em glória. - Filipenses 4:19",
    popularity: 94,
  },
  {
    id: 124,
    title: "Valorizem os Pequenos Momentos",
    content:
      "Nem sempre o amor está nas grandes viagens ou jantares caros. Às vezes, ele está em um café juntos pela manhã ou em um olhar de cumplicidade. Aproveitem os detalhes do dia a dia.",
    category: "Tempo",
    icon: Calendar,
    verse: "Ensina-nos a contar os nossos dias para que alcancemos coração sábio. - Salmos 90:12",
    popularity: 92,
  },
  {
    id: 125,
    title: "Aprendam a Esperar",
    content:
      "O amor verdadeiro cresce no tempo certo. Não apresse processos nem decisões. Tudo o que é sólido leva tempo para amadurecer.",
    category: "Tempo",
    icon: Calendar,
    verse: "Tudo tem o seu tempo determinado, e há tempo para todo propósito debaixo do céu. - Eclesiastes 3:1",
    popularity: 87,
  },
  {
    id: 126,
    title: "Desacelerem Juntos",
    content:
      "Vivemos correndo, mas às vezes o melhor que um casal pode fazer é simplesmente parar. Desacelerem, respirem e desfrutem a presença um do outro sem pressa.",
    category: "Tempo",
    icon: Calendar,
    verse: "Aquietai-vos e sabei que eu sou Deus. - Salmos 46:10",
    popularity: 90,
  },
  {
    id: 127,
    title: "Planejem o Futuro a Dois",
    content:
      "Reservem tempo para sonhar juntos. Metas e planos em comum fortalecem o compromisso e mantêm o casal olhando na mesma direção.",
    category: "Tempo",
    icon: Calendar,
    verse: "O coração do homem planeja o seu caminho, mas o Senhor lhe dirige os passos. - Provérbios 16:9",
    popularity: 88,
  },
  {
    id: 128,
    title: "Vivam o Agora",
    content:
      "Não deixem o passado prender vocês, nem o futuro roubar o presente. Vivam o momento com gratidão e presença.",
    category: "Tempo",
    icon: Calendar,
    verse: "Portanto, não vos inquieteis com o dia de amanhã. - Mateus 6:34",
    popularity: 91,
  },
  {
    id: 129,
    title: "Celebrem Datas Especiais",
    content:
      "Relembrar momentos marcantes fortalece o vínculo. Celebrem aniversários, conquistas e até pequenas vitórias com alegria.",
    category: "Tempo",
    icon: Calendar,
    verse: "Regozijai-vos sempre no Senhor; outra vez digo, regozijai-vos. - Filipenses 4:4",
    popularity: 84,
  },
  {
    id: 130,
    title: "Sejam Pacientes com os Processos",
    content:
      "Cada fase do relacionamento traz desafios. Tenham paciência um com o outro e com o tempo das coisas. Crescimento leva tempo e amor constante.",
    category: "Tempo",
    icon: Calendar,
    verse: "A paciência é a companheira da sabedoria. - Provérbios 19:11",
    popularity: 86,
  },
  {
    id: 131,
    title: "Façam Pausas Juntos",
    content:
      "Tirar um tempo de descanso é essencial. Usem esses momentos para recarregar as energias e se reconectarem como casal.",
    category: "Tempo",
    icon: Calendar,
    verse: "Vinde a mim todos os que estais cansados e oprimidos, e eu vos aliviarei. - Mateus 11:28",
    popularity: 85,
  },
  {
    id: 132,
    title: "Comuniquem Seus Desejos com Clareza",
    content:
      "A intimidade saudável começa com comunicação aberta. Falem sobre o que gostam, limites e emoções, sem vergonha ou julgamento.",
    category: "Intimidade",
    icon: Users,
    verse: "Sejam todos prontos para ouvir, tardios para falar e tardios para irar-se. - Tiago 1:19",
    popularity: 82,
  },
  
  {
    id: 133,
    title: "Cultivem a Conexão Emocional Antes da Física",
    content:
      "A verdadeira intimidade nasce da segurança emocional. Fortaleçam o vínculo de confiança antes de buscar o contato físico.",
    category: "Intimidade",
    icon: Users,
    verse: "Acima de tudo, revistam-se do amor, que é o elo perfeito. - Colossenses 3:14",
    popularity: 90,
  },
  
  {
    id: 134,
    title: "Respeitem o Tempo Um do Outro",
    content:
      "Nem sempre os dois estarão prontos ao mesmo tempo. O respeito mútuo e a paciência demonstram amor e maturidade.",
    category: "Intimidade",
    icon: Users,
    verse: "O amor é paciente, o amor é bondoso. - 1 Coríntios 13:4",
    popularity: 88,
  },
  
  {
    id: 135,
    title: "Criem Momentos de Carinho e Afeto",
    content:
      "Gestos simples como abraços, toques e olhares sinceros fortalecem a intimidade e demonstram amor sem palavras.",
    category: "Intimidade",
    icon: Users,
    verse: "Beijem-se uns aos outros com beijo santo. - Romanos 16:16",
    popularity: 83,
  },
  
  {
    id: 136,
    title: "Mantenham a Pureza e os Limites Espirituais",
    content:
      "A intimidade deve refletir valores espirituais. Manter limites claros honra a si mesmo, ao outro e a Deus.",
    category: "Intimidade",
    icon: Users,
    verse: "Como pode o jovem manter pura a sua conduta? Vivendo de acordo com a tua palavra. - Salmos 119:9",
    popularity: 87,
  },
  
  {
    id: 137,
    title: "Reconheçam que a Intimidade Vai Além do Corpo",
    content:
      "Intimidade é também emocional e espiritual. Envolve conhecer profundamente o coração e a alma do outro.",
    category: "Intimidade",
    icon: Users,
    verse: "O homem vê a aparência, mas o Senhor vê o coração. - 1 Samuel 16:7",
    popularity: 91,
  },
  
  {
    id: 138,
    title: "Orem Juntos pela Vida Íntima",
    content:
      "Trazer Deus para o centro da intimidade fortalece o amor, o respeito e o propósito espiritual do relacionamento.",
    category: "Intimidade",
    icon: Users,
    verse: "Se dois de vocês concordarem na terra em qualquer assunto, será feito por meu Pai que está nos céus. - Mateus 18:19",
    popularity: 94,
  },
  {
    id: 139,
    title: "Pratiquem Exercícios Juntos",
    content:
      "Atividades físicas em casal fortalecem a saúde e a conexão emocional. Caminhadas, academias ou esportes em dupla criam momentos de parceria e motivação mútua.",
    category: "Bem-estar",
    icon: Heart,
    verse: "Porque Deus não nos deu espírito de covardia, mas de poder, de amor e de moderação. - 2 Timóteo 1:7",
    popularity: 88,
  },
  {
    id: 140,
    title: "Valorizem o Sono de Qualidade",
    content:
      "Dormir bem é essencial para o equilíbrio emocional e físico. Estabeleçam rotinas noturnas saudáveis e respeitem o descanso um do outro.",
    category: "Bem-estar",
    icon: Heart,
    verse: "Em paz me deito e logo adormeço, porque, Senhor, só tu me fazes habitar em segurança. - Salmos 4:8",
    popularity: 80,
  },
  {
    id: 141,
    title: "Cuidem da Alimentação",
    content:
      "Uma dieta equilibrada aumenta a energia e o bem-estar. Preparem refeições saudáveis juntos e incentivem escolhas alimentares conscientes.",
    category: "Bem-estar",
    icon: Heart,
    verse: "Portanto, quer comais, quer bebais, ou façais qualquer outra coisa, fazei tudo para a glória de Deus. - 1 Coríntios 10:31",
    popularity: 85,
  },
  {
    id: 142,
    title: "Pratiquem a Gratidão Diária",
    content:
      "Reconhecer as bênçãos diárias traz leveza e alegria. Reservem um momento para agradecer um ao outro e pelas pequenas vitórias da vida.",
    category: "Bem-estar",
    icon: Heart,
    verse: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco. - 1 Tessalonicenses 5:18",
    popularity: 92,
  },
  {
    id: 143,
    title: "Desconectem-se das Redes",
    content:
      "Separem momentos livres de tecnologia para estarem plenamente presentes. Isso renova a mente e fortalece o vínculo do casal.",
    category: "Bem-estar",
    icon: Heart,
    verse: "Aquietai-vos e sabei que eu sou Deus. - Salmos 46:10",
    popularity: 87,
  },
  {
    id: 144,
    title: "Pratiquem a Respiração Consciente",
    content:
      "A respiração profunda alivia o estresse e melhora o foco. Façam pausas diárias para respirar juntos e reencontrar o equilíbrio interior.",
    category: "Bem-estar",
    icon: Heart,
    verse: "O sopro de vida vem do Senhor. - Gênesis 2:7",
    popularity: 78,
  },
  {
    id: 145,
    title: "Encontrem Prazer nas Pequenas Coisas",
    content:
      "O bem-estar está nas simplicidades do dia a dia. Valorizem um sorriso, um gesto carinhoso ou um café compartilhado com amor.",
    category: "Bem-estar",
    icon: Heart,
    verse: "O coração alegre aformoseia o rosto. - Provérbios 15:13",
    popularity: 90,
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
  { name: "Bem-estar", count: relationshipTips.filter((tip) => tip.category === "Bem-estar").length },
  { name: "Intimidade", count: relationshipTips.filter((tip) => tip.category === "Intimidade").length },
  { name: "Finanças", count: relationshipTips.filter((tip) => tip.category === "Finanças").length },
  { name: "Tempo", count: relationshipTips.filter((tip) => tip.category === "Tempo").length },
]

export default function DicasPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"default" | "popularity">("default")
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const { favorites, toggleFavorite } = useFavorites()

  const [tipOfDay, setTipOfDay] = useState<(typeof relationshipTips)[0] | null>(null)

  useEffect(() => {
    const today = new Date().toDateString()
    const storedDate = localStorage.getItem("tipOfDayDate")
    const storedTip = localStorage.getItem("tipOfDay")

    if (storedDate === today && storedTip) {
      setTipOfDay(JSON.parse(storedTip))
    } else {
      const randomTip = relationshipTips[Math.floor(Math.random() * relationshipTips.length)]
      setTipOfDay(randomTip)
      localStorage.setItem("tipOfDay", JSON.stringify(randomTip))
      localStorage.setItem("tipOfDayDate", today)
    }
  }, [])

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

  const handleCopyVerse = (verse: string, tipId: number) => {
    navigator.clipboard.writeText(verse)
    setCopiedId(tipId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {tipOfDay && (
        <section className="relative py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-b border-primary/20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start gap-4">
              <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Dica do Dia</h3>
                <p className="text-muted-foreground mb-3">{tipOfDay.title}</p>
                <p className="text-sm text-foreground italic mb-3">"{tipOfDay.verse}"</p>
                <Link href={`#tip-${tipOfDay.id}`}>
                  <Button size="sm" variant="outline">
                    Ler Completo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

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
              <div className="text-3xl font-bold text-primary">40</div>
              <div className="text-sm text-muted-foreground">Dicas Completas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">12</div>
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
                const isFavorited = favorites.some((fav) => fav.id === tip.id && fav.type === "dica")
                return (
                  <Card
                    key={tip.id}
                    id={`tip-${tip.id}`}
                    className="bg-card border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary" className="text-sm">
                          <IconComponent className="h-3.5 w-3.5 mr-1.5" />
                          {tip.category}
                        </Badge>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                            {tip.popularity}%
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              toggleFavorite({
                                id: tip.id,
                                type: "dica",
                                title: tip.title,
                                content: tip.content,
                                category: tip.category,
                              })
                            }
                            className="h-6 w-6 p-0"
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                isFavorited ? "fill-primary text-primary" : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-foreground text-xl group-hover:text-primary transition-colors">
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{tip.content}</p>

                      <Card className="bg-gradient-to-br from-secondary/30 to-accent/10 border-primary/20 shadow-sm">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1">
                              <BookOpen className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <blockquote className="text-sm italic text-foreground leading-relaxed">
                                {tip.verse}
                              </blockquote>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCopyVerse(tip.verse, tip.id)}
                              className="h-6 w-6 p-0 flex-shrink-0"
                            >
                              {copiedId === tip.id ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
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
