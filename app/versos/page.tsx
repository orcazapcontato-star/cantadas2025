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
  {
    id: 31,
    text: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.",
    reference: "1 Coríntios 13:4",
    category: "Amor",
    theme: "Paciência e Bondade",
  },
  {
    id: 32,
    text: "Acima de tudo, amem-se sinceramente, pois o amor cobre uma multidão de pecados.",
    reference: "1 Pedro 4:8",
    category: "Amor",
    theme: "Perdão",
  },
  {
    id: 33,
    text: "E agora permanecem a fé, a esperança e o amor. O maior deles, porém, é o amor.",
    reference: "1 Coríntios 13:13",
    category: "Amor",
    theme: "Prioridade Espiritual",
  },
  {
    id: 34,
    text: "Meu mandamento é este: amem-se uns aos outros como eu os amei.",
    reference: "João 15:12",
    category: "Amor",
    theme: "Amor Fraternal",
  },
  {
    id: 35,
    text: "Quem não ama não conhece a Deus, porque Deus é amor.",
    reference: "1 João 4:8",
    category: "Amor",
    theme: "Natureza Divina",
  },
  {
    id: 36,
    text: "Façam tudo com amor.",
    reference: "1 Coríntios 16:14",
    category: "Amor",
    theme: "Ação com Propósito",
  },
  {
    id: 37,
    text: "Amados, amemos uns aos outros, pois o amor procede de Deus.",
    reference: "1 João 4:7",
    category: "Amor",
    theme: "Origem Divina do Amor",
  },
  {
    id: 38,
    text: "O amor deve ser sincero. Odeiem o que é mau; apeguem-se ao que é bom.",
    reference: "Romanos 12:9",
    category: "Amor",
    theme: "Pureza e Verdade",
  },
  {
    id: 39,
    text: "Portanto deixará o homem seu pai e sua mãe, e unir-se-á à sua mulher, e serão ambos uma só carne.",
    reference: "Gênesis 2:24",
    category: "Casamento",
    theme: "União",
  },
  {
    id: 40,
    text: "Maridos, amai vossas mulheres, como também Cristo amou a igreja e a si mesmo se entregou por ela.",
    reference: "Efésios 5:25",
    category: "Casamento",
    theme: "Amor",
  },
  {
    id: 41,
    text: "Assim, não são mais dois, mas uma só carne. Portanto, o que Deus uniu, ninguém separe.",
    reference: "Mateus 19:6",
    category: "Casamento",
    theme: "Aliança",
  },
  {
    id: 42,
    text: "Mulheres, sujeitai-vos a vossos maridos, como ao Senhor, porque o marido é o cabeça da mulher, como também Cristo é o cabeça da igreja.",
    reference: "Efésios 5:22-23",
    category: "Casamento",
    theme: "Respeito",
  },
  {
    id: 43,
    text: "Enganoso é o encanto, e vã a formosura, mas a mulher que teme ao Senhor, essa será louvada.",
    reference: "Provérbios 31:30",
    category: "Casamento",
    theme: "Virtude",
  },
  {
    id: 44,
    text: "O amor seja sem hipocrisia. Detestai o mal, apegando-vos ao bem.",
    reference: "Romanos 12:9",
    category: "Casamento",
    theme: "Amor Verdadeiro",
  },
  {
    id: 45,
    text: "Feliz é aquele que teme ao Senhor e anda nos seus caminhos.",
    reference: "Salmos 128:1",
    category: "Casamento",
    theme: "Bênção",
  },
  {
    id: 46,
    text: "Aquele que encontra uma esposa encontra algo excelente; recebeu uma bênção do Senhor.",
    reference: "Provérbios 18:22",
    category: "Casamento",
    theme: "Bênção",
  },
  {
    id: 47,
    text: "A verdadeira amizade é constante mesmo nos tempos difíceis.",
    reference: "Provérbios 27:17",
    category: "Amizade",
    theme: "Fidelidade",
  },
  {
    id: 48,
    text: "Quem tem amigos deve mostrar-se amigo em todas as circunstâncias.",
    reference: "Eclesiastes 4:9-10",
    category: "Amizade",
    theme: "Apoio",
  },
  {
    id: 49,
    text: "O amigo verdadeiro se alegra com sua alegria e sofre com sua tristeza.",
    reference: "Romanos 12:15",
    category: "Amizade",
    theme: "Empatia",
  },
  {
    id: 50,
    text: "Melhor é um amigo próximo do que um irmão distante.",
    reference: "Provérbios 27:10",
    category: "Amizade",
    theme: "Proximidade",
  },
  {
    id: 51,
    text: "O amor fraterno não deve ser apenas de palavras, mas também de ações sinceras.",
    reference: "1 João 3:18",
    category: "Amizade",
    theme: "Ação",
  },
  {
    id: 52,
    text: "O amigo fiel é um refúgio seguro em tempos de angústia.",
    reference: "Provérbios 18:24",
    category: "Amizade",
    theme: "Fidelidade",
  },
  {
    id: 53,
    text: "Confie no amigo e compartilhe seus segredos com prudência e amor.",
    reference: "Provérbios 11:13",
    category: "Amizade",
    theme: "Confiança",
  },
  {
    id: 54,
    text: "Amigos verdadeiros corrigem com amor e não com dureza.",
    reference: "Provérbios 27:6",
    category: "Amizade",
    theme: "Honestidade",
  },
  {
    id: 55,
    text: "A amizade se prova nos momentos de necessidade, não apenas na diversão.",
    reference: "Provérbios 17:17",
    category: "Amizade",
    theme: "Companheirismo",
  },
  {
    id: 56,
    text: "Um amigo que guarda seus segredos é mais valioso do que muitos conhecidos.",
    reference: "Provérbios 20:6",
    category: "Amizade",
    theme: "Lealdade",
  },
  {
    id: 57,
    text: "Escolha amigos que edificam e incentivam seu crescimento.",
    reference: "1 Coríntios 15:33",
    category: "Amizade",
    theme: "Influência",
  },
  {
    id: 58,
    text: "A verdadeira amizade permanece mesmo quando há divergências.",
    reference: "Provérbios 27:9",
    category: "Amizade",
    theme: "Respeito",
  },
  {
    id: 59,
    text: "O amigo que ouve com paciência é mais precioso do que palavras vazias.",
    reference: "Provérbios 18:13",
    category: "Amizade",
    theme: "Compreensão",
  },
  {
    id: 60,
    text: "A amizade sincera é um tesouro que resiste ao tempo e às dificuldades.",
    reference: "Eclesiastes 4:12",
    category: "Amizade",
    theme: "Durabilidade",
  },
  {
    id: 61,
    text: "Liberte seu coração do peso do rancor; perdoar é um presente que você se dá.",
    reference: "Mateus 6:14",
    category: "Perdão",
    theme: "Libertação",
  },
  {
    id: 62,
    text: "O perdão não muda o passado, mas transforma o seu futuro.",
    reference: "Lucas 6:37",
    category: "Perdão",
    theme: "Transformação",
  },
  {
    id: 63,
    text: "Perdoar não significa esquecer, mas escolher a paz em vez da amargura.",
    reference: "Colossenses 3:13",
    category: "Perdão",
    theme: "Paz",
  },
  {
    id: 64,
    text: "Sejam bondosos e compassivos, perdoando como Deus nos perdoou.",
    reference: "Efésios 4:32",
    category: "Perdão",
    theme: "Compaixão",
  },
  {
    id: 65,
    text: "O perdão é um ato de coragem, mostrando força interior e maturidade.",
    reference: "Provérbios 19:11",
    category: "Perdão",
    theme: "Coragem",
  },
  {
    id: 66,
    text: "Não retenha o perdão; ele traz cura ao coração ferido.",
    reference: "Mateus 18:21-22",
    category: "Perdão",
    theme: "Cura",
  },
  {
    id: 67,
    text: "Quando perdoamos, abrimos espaço para o amor e a reconciliação.",
    reference: "Romanos 12:18",
    category: "Perdão",
    theme: "Amor",
  },
  {
    id: 68,
    text: "Perdoar é um passo essencial para libertar-se do passado e viver plenamente.",
    reference: "Isaías 43:25",
    category: "Perdão",
    theme: "Liberdade",
  },
  {
    id: 69,
    text: "A verdadeira força está em perdoar aqueles que nos magoaram.",
    reference: "Mateus 5:44",
    category: "Perdão",
    theme: "Força",
  },
  {
    id: 70,
    text: "Perdoar diariamente fortalece a alma e promove harmonia nos relacionamentos.",
    reference: "Efésios 4:32",
    category: "Perdão",
    theme: "Harmonia",
  },
  {
    id: 71,
    text: "O ferro afia o ferro, assim como um amigo sábio afia o caráter.",
    reference: "Provérbios 27:17",
    category: "Crescimento",
    theme: "Mútuo Apoio",
  },
  {
    id: 72,
    text: "A mente que se abre a uma nova ideia jamais retorna ao seu tamanho original.",
    reference: "Albert Einstein",
    category: "Crescimento",
    theme: "Aprendizado Contínuo",
  },
  {
    id: 73,
    text: "O verdadeiro crescimento vem do esforço e da disciplina diária.",
    reference: "Desconhecido",
    category: "Crescimento",
    theme: "Disciplina",
  },
  {
    id: 74,
    text: "Aprender com os erros é mais valioso do que repetir os acertos.",
    reference: "Desconhecido",
    category: "Crescimento",
    theme: "Aprendizado",
  },
  {
    id: 75,
    text: "Crescer é sair da zona de conforto e abraçar desafios.",
    reference: "Desconhecido",
    category: "Crescimento",
    theme: "Desafio",
  },
  {
    id: 76,
    text: "Quem planta conhecimento, colhe sabedoria.",
    reference: "Provérbios 10:14",
    category: "Crescimento",
    theme: "Sabedoria",
  },
  {
    id: 77,
    text: "O sucesso é a soma de pequenos esforços repetidos diariamente.",
    reference: "Robert Collier",
    category: "Crescimento",
    theme: "Persistência",
  },
  {
    id: 78,
    text: "O homem prudente vê o mal e esconde-se; mas os simples passam adiante e sofrem a consequência.",
    reference: "Provérbios 22:3",
    category: "Crescimento",
    theme: "Prudência",
  },
  {
    id: 79,
    text: "Não tema ir devagar, tema apenas ficar parado.",
    reference: "Provérbios Adaptado",
    category: "Crescimento",
    theme: "Progresso",
  },
  {
    id: 80,
    text: "A mente que se exercita na reflexão é mais afiada que qualquer espada.",
    reference: "Desconhecido",
    category: "Crescimento",
    theme: "Reflexão",
  },
  {
    id: 81,
    text: "Orai continuamente, sem cessar, permitindo que a oração se torne parte natural do seu dia.",
    reference: "1 Tessalonicenses 5:17",
    category: "Oração",
    theme: "Constância na Oração",
  },
  {
    id: 82,
    text: "Entregue a Deus todas as suas preocupações, confiando que Ele cuidará de cada detalhe da sua vida.",
    reference: "1 Pedro 5:7",
    category: "Oração",
    theme: "Entrega e Confiança",
  },
  {
    id: 83,
    text: "Quando orar, faça-o em secreto, sem ostentação, valorizando a sinceridade da sua conexão com Deus.",
    reference: "Mateus 6:6",
    category: "Oração",
    theme: "Oração Secreta",
  },
  {
    id: 84,
    text: "A oração com fé verdadeira move montanhas e manifesta o poder de Deus em nossa vida.",
    reference: "Marcos 11:24",
    category: "Oração",
    theme: "Fé na Oração",
  },
  {
    id: 85,
    text: "Em todos os momentos, agradeça a Deus, reconhecendo Suas bênçãos e fortalecendo seu coração.",
    reference: "1 Tessalonicenses 5:18",
    category: "Oração",
    theme: "Gratidão",
  },
  {
    id: 86,
    text: "Peça a Deus sabedoria em suas decisões, pois Ele concede entendimento àqueles que buscam com humildade.",
    reference: "Tiago 1:5",
    category: "Oração",
    theme: "Sabedoria",
  },
  {
    id: 87,
    text: "A oração fervorosa de uma pessoa justa é poderosa e eficaz, tocando o coração de Deus.",
    reference: "Tiago 5:16",
    category: "Oração",
    theme: "Oração Poderosa",
  },
  {
    id: 88,
    text: "Busque primeiro o Reino de Deus e a Sua justiça, e todas as necessidades serão supridas.",
    reference: "Mateus 6:33",
    category: "Oração",
    theme: "Prioridade Espiritual",
  },
  {
    id: 89,
    text: "Confesse seus pecados a Deus em oração, recebendo perdão e restauração em Sua presença.",
    reference: "1 João 1:9",
    category: "Oração",
    theme: "Confissão e Perdão",
  },
  {
    id: 90,
    text: "Novamente lhes digo: se dois de vocês concordarem na terra em qualquer assunto sobre o qual pedirem, isso lhes será feito por meu Pai que está nos céus.",
    reference: "Mateus 18:19",
    category: "Oração",
    theme: "União Espiritual",
  },
  {
    id: 91,
    text: "Confie no processo, mesmo quando não vê resultados imediatos.",
    reference: "Romanos 8:28",
    category: "Fé",
    theme: "Confiança",
  },
  {
    id: 92,
    text: "A confiança verdadeira se revela em momentos de dificuldade.",
    reference: "Salmos 56:3",
    category: "Fé",
    theme: "Confiança",
  },
  {
    id: 93,
    text: "Confie em Deus para guiar seus passos, mesmo quando o caminho parece incerto.",
    reference: "Provérbios 3:5",
    category: "Fé",
    theme: "Confiança",
  },
  {
    id: 94,
    text: "A confiança fortalece relacionamentos e cria vínculos duradouros.",
    reference: "1 Coríntios 13:7",
    category: "Fé",
    theme: "Confiança",
  },
  {
    id: 95,
    text: "Não permita que o medo substitua a confiança em quem você é chamado a ser.",
    reference: "Josué 1:9",
    category: "Fé",
    theme: "Confiança",
  },
  {
    id: 96,
    text: "Confiança se constrói com pequenas atitudes de fidelidade diária.",
    reference: "Lucas 16:10",
    category: "Fé",
    theme: "Confiança",
  },
  {
    id: 97,
    text: "A confiança em Deus traz paz em meio às tempestades da vida.",
    reference: "Filipenses 4:6-7",
    category: "Fé",
    theme: "Confiança",
  },
  {
    id: 98,
    text: "Confiar é entregar o controle e descansar no cuidado divino.",
    reference: "Salmos 37:5",
    category: "Fé",
    theme: "Confiança",
  },
  {
    id: 99,
    text: "A confiança verdadeira se manifesta em obediência e perseverança.",
    reference: "Hebreus 11:1",
    category: "Fé",
    theme: "Confiança",
  },
  {
    id: 100,
    text: "Confie em Deus, porque Ele nunca falha nem abandona seus filhos.",
    reference: "Deuteronômio 31:6",
    category: "Fé",
    theme: "Confiança",
  },
  {
    id: 101,
    text: "Entrega ao Senhor tudo o que você faz, e seus planos serão estabelecidos.",
    reference: "Provérbios 16:3",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 102,
    text: "Deus é o nosso refúgio e fortaleza, socorro sempre presente na angústia.",
    reference: "Salmos 46:1",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 103,
    text: "Confie no Senhor e faça o bem; habite na terra e seja fiel.",
    reference: "Salmos 37:3",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 104,
    text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.",
    reference: "Isaías 41:10",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 105,
    text: "Em Deus ponho minha confiança e não temerei; o que pode fazer-me o homem?",
    reference: "Salmos 56:11",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 106,
    text: "Lança o teu cuidado sobre o Senhor, e ele te susterá.",
    reference: "Salmos 55:22",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 107,
    text: "O Senhor é a minha luz e a minha salvação; de quem terei medo?",
    reference: "Salmos 27:1",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 108,
    text: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.",
    reference: "Salmos 91:1",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 109,
    text: "Entrega os teus caminhos ao Senhor, confia nele, e ele tudo fará.",
    reference: "Salmos 37:5",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 110,
    text: "O Senhor é bom, é fortaleza no dia da angústia e conhece os que nele confiam.",
    reference: "Naum 1:7",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 111,
    text: "O coração confiante alcançará bons resultados, mas o coração ansioso será derrotado.",
    reference: "Provérbios 14:29",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 112,
    text: "Não se turbe o vosso coração; credes em Deus, crede também em mim.",
    reference: "João 14:1",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 113,
    text: "Bendito o homem que confia no Senhor e cuja confiança é o Senhor.",
    reference: "Jeremias 17:7",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 114,
    text: "Quando eu estiver com medo, confiarei em Ti.",
    reference: "Salmos 56:3",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 115,
    text: "Confiai no Senhor perpetuamente, porque o Senhor Deus é uma rocha eterna.",
    reference: "Isaías 26:4",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 116,
    text: "O Senhor é fiel; ele fortalecerá e guardará aqueles que nele confiam.",
    reference: "Salmos 31:23",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 117,
    text: "Quem confia no seu próprio coração é insensato, mas quem anda em sabedoria se conservará seguro.",
    reference: "Provérbios 28:26",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 118,
    text: "O Senhor sustenta todos os que caem e levanta todos os abatidos.",
    reference: "Salmos 145:14",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 119,
    text: "Confia no Senhor com todo o teu coração, e Ele guiará teus passos.",
    reference: "Provérbios 3:6",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 120,
    text: "No dia em que eu temer, hei de confiar em Ti.",
    reference: "Salmos 56:4",
    category: "Confiança",
    theme: "Fé",
  },
  {
    id: 121,
    text: "O Senhor é a minha luz e a minha salvação; de quem terei medo?",
    reference: "Salmos 27:1",
    category: "Paz",
    theme: "Confiança",
  },
  {
    id: 122,
    text: "Entregue o seu caminho ao Senhor; confie nele, e ele agirá.",
    reference: "Salmos 37:5",
    category: "Paz",
    theme: "Entrega",
  },
  {
    id: 123,
    text: "Deixo-vos a paz; a minha paz vos dou. Não vo-la dou como o mundo a dá.",
    reference: "João 14:27",
    category: "Paz",
    theme: "Paz Interior",
  },
  {
    id: 124,
    text: "O Senhor dá força ao seu povo; o Senhor abençoa com paz ao seu povo.",
    reference: "Salmos 29:11",
    category: "Paz",
    theme: "Proteção",
  },
  {
    id: 125,
    text: "Fiquem em paz entre vós mesmos e procurem viver em harmonia.",
    reference: "Romanos 12:18",
    category: "Paz",
    theme: "Harmonia",
  },
  {
    id: 126,
    text: "No Senhor encontramos refúgio; nele repousa a nossa paz.",
    reference: "Isaías 26:3",
    category: "Paz",
    theme: "Segurança",
  },
  {
    id: 127,
    text: "Aquietem-se e saibam que eu sou Deus.",
    reference: "Salmos 46:10",
    category: "Paz",
    theme: "Calma",
  },
  {
    id: 128,
    text: "Bendiz o Senhor, porque ele é bom; o seu amor dura para sempre.",
    reference: "Salmos 107:1",
    category: "Paz",
    theme: "Gratidão",
  },
  {
    id: 129,
    text: "Lancem sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",
    reference: "1 Pedro 5:7",
    category: "Paz",
    theme: "Confiança",
  },
  {
    id: 130,
    text: "O Senhor é bom, um refúgio em tempos de angústia. Ele protege os que nele confiam.",
    reference: "Naum 1:7",
    category: "Paz",
    theme: "Segurança",
  },
  {
    id: 131,
    text: "Dedique tempo de qualidade à sua família, mesmo em dias corridos, para fortalecer os laços afetivos.",
    reference: "Efésios 5:16",
    category: "Família",
    theme: "Tempo de Qualidade",
  },
  {
    id: 132,
    text: "Ensine seus filhos pelo exemplo, mostrando integridade e valores sólidos em todas as suas ações.",
    reference: "Provérbios 22:6",
    category: "Família",
    theme: "Exemplo",
  },
  {
    id: 133,
    text: "Pratique a paciência e a compreensão dentro do lar, lembrando que todos têm falhas e aprendizados.",
    reference: "Colossenses 3:13",
    category: "Família",
    theme: "Paciência",
  },
  {
    id: 134,
    text: "Comunique-se de forma aberta e honesta com todos os membros da família, evitando mal-entendidos.",
    reference: "Provérbios 15:1",
    category: "Família",
    theme: "Comunicação",
  },
  {
    id: 135,
    text: "Celebre as conquistas e momentos especiais juntos, fortalecendo o sentimento de união familiar.",
    reference: "Salmos 133:1",
    category: "Família",
    theme: "Celebração",
  },
  {
    id: 136,
    text: "Ensine e pratique o perdão dentro de casa, pois mágoas acumuladas destroem relacionamentos.",
    reference: "Mateus 6:14",
    category: "Família",
    theme: "Perdão",
  },
  {
    id: 137,
    text: "Mostre carinho e apreço diariamente, valorizando cada membro da família.",
    reference: "1 João 4:7",
    category: "Família",
    theme: "Afeto",
  },
  {
    id: 138,
    text: "Participe ativamente das responsabilidades do lar, criando um ambiente de cooperação e respeito.",
    reference: "Gálatas 6:2",
    category: "Família",
    theme: "Cooperação",
  },
  {
    id: 139,
    text: "Ore pelos seus familiares, pedindo proteção, sabedoria e bênçãos para cada um deles.",
    reference: "Filipenses 4:6",
    category: "Família",
    theme: "Oração",
  },
  {
    id: 140,
    text: "Valorize os mais velhos, ouvindo suas experiências e aprendendo com sua sabedoria.",
    reference: "Levítico 19:32",
    category: "Família",
    theme: "Respeito aos Idosos",
  },
  {
    id: 141,
    text: "Fuja de qualquer situação que possa comprometer sua integridade moral.",
    reference: "Provérbios 4:14",
    category: "Pureza",
    theme: "Integridade",
  },
  {
    id: 142,
    text: "Honre seu corpo como templo do Espírito Santo, mantendo pensamentos e ações puras.",
    reference: "1 Coríntios 6:19-20",
    category: "Pureza",
    theme: "Autocontrole",
  },
  {
    id: 143,
    text: "A pureza começa na mente; alimente seus pensamentos com o que é bom e justo.",
    reference: "Filipenses 4:8",
    category: "Pureza",
    theme: "Pensamento Saudável",
  },
  {
    id: 144,
    text: "Respeite os limites do seu corpo e da sua alma, evitando práticas que possam ferir ambos.",
    reference: "1 Tessalonicenses 4:4-5",
    category: "Pureza",
    theme: "Autocontrole",
  },
  {
    id: 145,
    text: "Mantenha relacionamentos que elevem sua fé e fortaleçam sua integridade.",
    reference: "Provérbios 13:20",
    category: "Pureza",
    theme: "Relacionamentos",
  },
  {
    id: 146,
    text: "Não se entregue a desejos passageiros; cultive a paciência e a disciplina.",
    reference: "Gálatas 5:16-17",
    category: "Pureza",
    theme: "Disciplina",
  },
  {
    id: 147,
    text: "Evite a intimidade antes do tempo; o respeito pelo outro e por si mesmo é sagrado.",
    reference: "Hebreus 13:4",
    category: "Pureza",
    theme: "Respeito",
  },
  {
    id: 148,
    text: "Fortaleça-se na oração para resistir às tentações e permanecer puro.",
    reference: "Mateus 26:41",
    category: "Pureza",
    theme: "Oração",
  },
  {
    id: 149,
    text: "Seja exemplo de pureza e integridade para aqueles ao seu redor.",
    reference: "Filipenses 2:15",
    category: "Pureza",
    theme: "Exemplo",
  },
  {
    id: 150,
    text: "Confie no Espírito Santo para guiá-lo em pensamentos, palavras e ações puras.",
    reference: "João 16:13",
    category: "Pureza",
    theme: "Guia Divino",
  },
  {
    id: 151,
    text: "Seja sempre justo em suas decisões, lembrando-se de tratar os outros como gostaria de ser tratado.",
    reference: "Mateus 7:12",
    category: "Caráter",
    theme: "Virtudes",
  },
  {
    id: 152,
    text: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento.",
    reference: "Provérbios 3:5",
    category: "Caráter",
    theme: "Virtudes",
  },
  {
    id: 153,
    text: "Honre a Deus em tudo o que fizer, pois isso demonstra integridade e caráter.",
    reference: "Provérbios 3:6",
    category: "Caráter",
    theme: "Virtudes",
  },
  {
    id: 154,
    text: "Quem é paciente mostra domínio próprio e sabedoria em lidar com os desafios da vida.",
    reference: "Tiago 1:19",
    category: "Caráter",
    theme: "Virtudes",
  },
  {
    id: 155,
    text: "A humildade é a base do verdadeiro crescimento; coloque os outros acima de si mesmo.",
    reference: "Filipenses 2:3",
    category: "Caráter",
    theme: "Virtudes",
  },
  {
    id: 156,
    text: "Seja bondoso e compassivo, perdoando como Deus nos perdoou.",
    reference: "Efésios 4:32",
    category: "Caráter",
    theme: "Virtudes",
  },
  {
    id: 157,
    text: "Mantenha a integridade mesmo quando ninguém estiver olhando; isso fortalece o caráter.",
    reference: "Provérbios 10:9",
    category: "Caráter",
    theme: "Virtudes",
  },
  {
    id: 158,
    text: "A mansidão não é fraqueza, mas força controlada que promove paz e entendimento.",
    reference: "Mateus 5:5",
    category: "Caráter",
    theme: "Virtudes",
  },
  {
    id: 159,
    text: "Seja corajoso e firme diante das adversidades, confiando na orientação divina.",
    reference: "Josué 1:9",
    category: "Caráter",
    theme: "Virtudes",
  },
  {
    id: 160,
    text: "Busque a sabedoria e o discernimento acima de riquezas, pois o caráter se constrói com conhecimento e prudência.",
    reference: "Provérbios 4:7",
    category: "Caráter",
    theme: "Virtudes",
  },
  {
    id: 161,
    text: "O Senhor é a minha luz e a minha salvação; a quem temerei?",
    reference: "Salmos 27:1",
    category: "Bênção",
    theme: "Proteção",
  },
  {
    id: 162,
    text: "O Senhor te abençoe e te guarde; faça resplandecer o seu rosto sobre ti e te dê paz.",
    reference: "Números 6:24-26",
    category: "Bênção",
    theme: "Paz",
  },
  {
    id: 163,
    text: "Bendito seja o Senhor, que de dia em dia nos cumula de benefícios.",
    reference: "Salmos 68:19",
    category: "Bênção",
    theme: "Gratidão",
  },
  {
    id: 164,
    text: "O Senhor te fortalecerá e te guardará; o Senhor fará resplandecer o seu rosto sobre ti e te dará paz.",
    reference: "Salmos 121:5-6",
    category: "Bênção",
    theme: "Força",
  },
  {
    id: 165,
    text: "Que o Senhor conceda prosperidade em tudo o que fizeres e abençoe os frutos do teu trabalho.",
    reference: "Deuteronômio 28:12",
    category: "Bênção",
    theme: "Prosperidade",
  },
  {
    id: 166,
    text: "O Senhor é bom; a sua misericórdia dura para sempre, e a sua fidelidade estende-se a todas as gerações.",
    reference: "Salmos 100:5",
    category: "Bênção",
    theme: "Misericórdia",
  },
  {
    id: 167,
    text: "O Senhor te guiará continuamente e satisfará a tua alma em lugares áridos.",
    reference: "Isaías 58:11",
    category: "Bênção",
    theme: "Guiamento",
  },
  {
    id: 168,
    text: "Bem-aventurados os que confiam no Senhor, pois a misericórdia deles será grande.",
    reference: "Salmos 32:10",
    category: "Bênção",
    theme: "Confiança",
  },
  {
    id: 169,
    text: "O Senhor é a minha força e o meu escudo; nele confia o meu coração.",
    reference: "Salmos 28:7",
    category: "Bênção",
    theme: "Proteção",
  },
  {
    id: 170,
    text: "O Senhor cumprirá todos os teus desejos e pensamentos de acordo com a sua vontade.",
    reference: "Salmos 20:4",
    category: "Bênção",
    theme: "Cumprimento",
  },
  {
    id: 171,
    text: "Porque pela graça sois salvos, mediante a fé; e isto não vem de vós, é dom de Deus.",
    reference: "Efésios 2:8",
    category: "Graça",
    theme: "Salvação",
  },
  {
    id: 172,
    text: "A graça do Senhor Jesus Cristo seja com todos vós. Amém.",
    reference: "Apocalipse 22:21",
    category: "Graça",
    theme: "Bênção",
  },
  {
    id: 173,
    text: "Mas ele me disse: A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.",
    reference: "2 Coríntios 12:9",
    category: "Graça",
    theme: "Força",
  },
  {
    id: 174,
    text: "A graça e a paz vos sejam multiplicadas, pelo conhecimento de Deus e de Jesus nosso Senhor.",
    reference: "2 Pedro 1:2",
    category: "Graça",
    theme: "Paz",
  },
  {
    id: 175,
    text: "A graça de nosso Senhor Jesus Cristo seja com todos vós. Amém.",
    reference: "Romanos 16:20",
    category: "Graça",
    theme: "Bênção",
  },
  {
    id: 176,
    text: "A graça de Deus nos trouxe salvação, não por obras, mas pelo Seu amor e misericórdia.",
    reference: "Tito 2:11",
    category: "Graça",
    theme: "Salvação",
  },
  {
    id: 177,
    text: "Deus é rico em misericórdia; por amor do grande amor com que nos amou, nos deu vida com Cristo.",
    reference: "Efésios 2:4-5",
    category: "Graça",
    theme: "Misericórdia",
  },
  {
    id: 178,
    text: "Recebei, pois, os que são fracos na fé, mas não para discutir opiniões.",
    reference: "Romanos 14:1",
    category: "Graça",
    theme: "Aceitação",
  },
  {
    id: 179,
    text: "Portanto, mantendo-se firmes na graça de Deus, não vos afasteis da fé.",
    reference: "Hebreus 12:15",
    category: "Graça",
    theme: "Fé",
  },
  {
    id: 180,
    text: "O Senhor é misericordioso e compassivo, tardio em irar-se e grande em benignidade.",
    reference: "Salmos 103:8",
    category: "Graça",
    theme: "Misericórdia",
  },
  {
    id: 181,
    text: "A graça de Deus é maior do que todos os nossos pecados, sempre nos oferecendo perdão e esperança.",
    reference: "1 João 1:9",
    category: "Graça",
    theme: "Perdão",
  },
  {
    id: 182,
    text: "Que a graça e a paz de Deus, nosso Pai, e do Senhor Jesus Cristo estejam com você.",
    reference: "Filipenses 1:2",
    category: "Graça",
    theme: "Paz",
  },
  {
    id: 183,
    text: "O Senhor é compassivo e misericordioso, lento para a ira e grande em amor.",
    reference: "Salmos 103:8",
    category: "Misericórdia",
    theme: "Amor Divino",
  },
  {
    id: 184,
    text: "Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, que em sua grande misericórdia nos regenerou para uma viva esperança.",
    reference: "1 Pedro 1:3",
    category: "Misericórdia",
    theme: "Renovação",
  },
  {
    id: 185,
    text: "Porque a misericórdia do Senhor é desde a eternidade e sua fidelidade dura para sempre.",
    reference: "Salmos 100:5",
    category: "Misericórdia",
    theme: "Eternidade",
  },
  {
    id: 186,
    text: "Misericordioso e piedoso é o Senhor, tardio em irar-se e grande em benignidade.",
    reference: "Salmos 145:8",
    category: "Misericórdia",
    theme: "Piedade",
  },
  {
    id: 187,
    text: "O Senhor é bom para todos, e suas misericórdias estão sobre todas as suas obras.",
    reference: "Salmos 145:9",
    category: "Misericórdia",
    theme: "Bondade",
  },
  {
    id: 188,
    text: "As misericórdias do Senhor se renovam a cada manhã; grande é a tua fidelidade.",
    reference: "Lamentações 3:22-23",
    category: "Misericórdia",
    theme: "Renovação Diária",
  },
  {
    id: 189,
    text: "Clama a mim, e eu te responderei, e anunciar-te-ei coisas grandes e firmes que não sabes.",
    reference: "Jeremias 33:3",
    category: "Misericórdia",
    theme: "Resposta de Deus",
  },
  {
    id: 190,
    text: "O Senhor é justo em todos os seus caminhos, e benigno em todas as suas obras.",
    reference: "Salmos 145:17",
    category: "Misericórdia",
    theme: "Justiça e Benignidade",
  },
  {
    id: 191,
    text: "A misericórdia e a verdade se encontraram; a justiça e a paz se beijaram.",
    reference: "Salmos 85:10",
    category: "Misericórdia",
    theme: "Harmonia Divina",
  },
  {
    id: 192,
    text: "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento.",
    reference: "Provérbios 3:5",
    category: "Misericórdia",
    theme: "Confiança",
  },
  {
    id: 193,
    text: "O Senhor é misericordioso e compassivo, paciente e cheio de amor.",
    reference: "Salmos 103:8",
    category: "Misericórdia",
    theme: "Amor e Paciência",
  },
  {
    id: 194,
    text: "Seja forte e corajoso! Não tenha medo, pois o Senhor, o seu Deus, estará com você por onde quer que ande.",
    reference: "Josué 1:9",
    category: "Coragem",
    theme: "Força",
  },
  {
    id: 195,
    text: "O Senhor é a minha luz e a minha salvação; de quem terei medo? O Senhor é o meu forte refúgio; de quem terei medo?",
    reference: "Salmos 27:1",
    category: "Coragem",
    theme: "Força",
  },
  {
    id: 196,
    text: "Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo; o teu bordão e o teu cajado me consolam.",
    reference: "Salmos 23:4",
    category: "Coragem",
    theme: "Força",
  },
  {
    id: 197,
    text: "O Senhor está comigo; não temerei. O que me pode fazer o homem?",
    reference: "Salmos 118:6",
    category: "Coragem",
    theme: "Força",
  },
  {
    id: 198,
    text: "Esforcem-se, e Ele fortalecerá o coração de vocês, todos vocês que esperam no Senhor.",
    reference: "Salmos 31:24",
    category: "Coragem",
    theme: "Força",
  },
  {
    id: 199,
    text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.",
    reference: "Isaías 41:10",
    category: "Coragem",
    theme: "Força",
  },
  {
    id: 200,
    text: "Quando passares pelas águas estarei contigo; e quando pelos rios, eles não te submergirão; quando passares pelo fogo, não te queimarás.",
    reference: "Isaías 43:2",
    category: "Coragem",
    theme: "Força",
  },
  {
    id: 201,
    text: "O Senhor lutará por vocês; tão somente acalmem-se.",
    reference: "Êxodo 14:14",
    category: "Coragem",
    theme: "Força",
  },
  {
    id: 202,
    text: "O meu corpo e o meu coração poderão fraquejar, mas Deus é a força do meu coração e a minha herança para sempre.",
    reference: "Salmos 73:26",
    category: "Coragem",
    theme: "Força",
  },
  {
    id: 203,
    text: "O Senhor é bom, uma fortaleza no dia da angústia; e conhece os que nele confiam.",
    reference: "Naum 1:7",
    category: "Coragem",
    theme: "Força",
  },
  {
    id: 204,
    text: "O Senhor é quem vai adiante de ti; ele será contigo, não te deixará nem te desamparará; não temas, nem te espantes.",
    reference: "Deuteronômio 31:8",
    category: "Coragem",
    theme: "Força",
  },
  {
    id: 205,
    text: "Tudo posso naquele que me fortalece.",
    reference: "Filipenses 4:13",
    category: "Coragem",
    theme: "Força",
  },
  {
    id: 206,
    text: "O amor lança fora todo medo, porque o medo supõe castigo; e aquele que teme não está aperfeiçoado no amor.",
    reference: "1 João 4:18",
    category: "Coragem",
    theme: "Força",
  },
  {
    id: 207,
    text: "Os planos do Senhor permanecem para sempre; os propósitos do seu coração, por todas as gerações.",
    reference: "Salmos 33:11",
    category: "Propósito",
    theme: "Propósito Eterno",
  },
  {
    id: 208,
    text: "O coração do homem pode fazer planos, mas a resposta certa vem do Senhor.",
    reference: "Provérbios 16:1",
    category: "Propósito",
    theme: "Direção",
  },
  {
    id: 209,
    text: "Tudo tem o seu tempo determinado, e há tempo para todo propósito debaixo do céu.",
    reference: "Eclesiastes 3:1",
    category: "Propósito",
    theme: "Tempo",
  },
  {
    id: 210,
    text: "Porque dele, e por ele, e para ele são todas as coisas.",
    reference: "Romanos 11:36",
    category: "Propósito",
    theme: "Sentido da Vida",
  },
  {
    id: 211,
    text: "E sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
    reference: "Romanos 8:28",
    category: "Propósito",
    theme: "Chamado",
  },
  {
    id: 212,
    text: "Entrega o teu caminho ao Senhor; confia nele, e ele o fará.",
    reference: "Salmos 37:5",
    category: "Propósito",
    theme: "Confiança",
  },
  {
    id: 213,
    text: "O Senhor cumprirá o seu propósito em mim; o teu amor, Senhor, permanece para sempre.",
    reference: "Salmos 138:8",
    category: "Propósito",
    theme: "Confirmação",
  },
  {
    id: 214,
    text: "Tu me farás ver os caminhos da vida; na tua presença há plenitude de alegria.",
    reference: "Salmos 16:11",
    category: "Propósito",
    theme: "Direção",
  },
  {
    id: 215,
    text: "Porque eu bem sei os planos que tenho para vós, diz o Senhor; planos de paz e não de mal.",
    reference: "Jeremias 29:11",
    category: "Propósito",
    theme: "Esperança",
  },
  {
    id: 216,
    text: "Cada um exerça o dom que recebeu para servir aos outros, como bons despenseiros da multiforme graça de Deus.",
    reference: "1 Pedro 4:10",
    category: "Propósito",
    theme: "Serviço",
  },
  {
    id: 217,
    text: "Tudo quanto fizerdes, fazei-o de todo o coração, como ao Senhor, e não aos homens.",
    reference: "Colossenses 3:23",
    category: "Propósito",
    theme: "Trabalho com Propósito",
  },
  {
    id: 218,
    text: "O homem pode fazer planos, mas é o propósito do Senhor que prevalece.",
    reference: "Provérbios 19:21",
    category: "Propósito",
    theme: "Soberania",
  },
  {
    id: 219,
    text: "Deus é quem efetua em vós tanto o querer como o realizar, segundo a sua boa vontade.",
    reference: "Filipenses 2:13",
    category: "Propósito",
    theme: "Chamado",
  },
  {
    id: 220,
    text: "Levanta-te, resplandece, porque já vem a tua luz, e a glória do Senhor vai nascendo sobre ti.",
    reference: "Isaías 60:1",
    category: "Propósito",
    theme: "Despertar",
  },
  {
    id: 221,
    text: "O Senhor te guiará continuamente, fartará a tua alma até em lugares áridos, e fortificará os teus ossos.",
    reference: "Isaías 58:11",
    category: "Propósito",
    theme: "Direção Divina",
  },
  {
    id: 222,
    text: "Aquele que começou boa obra em vós há de completá-la até o dia de Cristo Jesus.",
    reference: "Filipenses 1:6",
    category: "Propósito",
    theme: "Processo",
  },
  {
    id: 223,
    text: "Tu conservarás em perfeita paz aquele cuja mente está firme em ti.",
    reference: "Isaías 26:3",
    category: "Propósito",
    theme: "Firmeza",
  },
  {
    id: 224,
    text: "O Senhor estabelecerá para ti um propósito firme, se o teu coração for íntegro para com ele.",
    reference: "1 Reis 9:4-5",
    category: "Propósito",
    theme: "Integridade",
  },
  {
    id: 225,
    text: "Não fostes vós que me escolhestes, mas eu vos escolhi para irem e darem fruto.",
    reference: "João 15:16",
    category: "Propósito",
    theme: "Frutificação",
  },
  {
    id: 226,
    text: "Sede fortes e corajosos; não temais, nem vos assusteis, porque o Senhor vosso Deus está convosco.",
    reference: "Josué 1:9",
    category: "Propósito",
    theme: "Coragem",
  },
  {
    id: 227,
    text: "O temor do Senhor é o princípio da sabedoria, e o conhecimento do Santo é entendimento.",
    reference: "Provérbios 9:10",
    category: "Propósito",
    theme: "Sabedoria",
  },
  {
    id: 228,
    text: "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento.",
    reference: "Provérbios 3:5",
    category: "Propósito",
    theme: "Confiança",
  },
  {
    id: 229,
    text: "O Senhor dirige os passos do homem, e firma o seu caminho.",
    reference: "Salmos 37:23",
    category: "Propósito",
    theme: "Caminho",
  },
  {
    id: 230,
    text: "O Espírito do Senhor está sobre mim, porque me ungiu para anunciar boas novas aos pobres.",
    reference: "Lucas 4:18",
    category: "Propósito",
    theme: "Missão",
  },
  {
    id: 231,
    text: "Não despreze os pequenos começos, porque o Senhor se alegra em ver o trabalho começar.",
    reference: "Zacarias 4:10",
    category: "Propósito",
    theme: "Começos",
  },
  {
    id: 232,
    text: "Quem é fiel no pouco, também é fiel no muito.",
    reference: "Lucas 16:10",
    category: "Propósito",
    theme: "Fidelidade",
  },
  {
    id: 233,
    text: "Esforça-te e tem bom ânimo; não temas, porque o Senhor é contigo.",
    reference: "Josué 1:9",
    category: "Propósito",
    theme: "Ânimo",
  },
  {
    id: 234,
    text: "Sede firmes, inabaláveis, e sempre abundantes na obra do Senhor.",
    reference: "1 Coríntios 15:58",
    category: "Propósito",
    theme: "Constância",
  },
  {
    id: 235,
    text: "Tudo o que o Senhor faz tem o seu propósito; até os maus para o dia do castigo.",
    reference: "Provérbios 16:4",
    category: "Propósito",
    theme: "Soberania Divina",
  },
  {
    id: 236,
    text: "O Senhor é quem te chama; ele é fiel, e fará isso acontecer.",
    reference: "1 Tessalonicenses 5:24",
    category: "Propósito",
    theme: "Chamado",
  },
  {
    id: 237,
    text: "Não te deixes vencer do mal, mas vence o mal com o bem.",
    reference: "Romanos 12:21",
    category: "Propósito",
    theme: "Bondade",
  },
  {
    id: 238,
    text: "Se alguém quer vir após mim, negue-se a si mesmo, tome a sua cruz, e siga-me.",
    reference: "Mateus 16:24",
    category: "Propósito",
    theme: "Discipulado",
  },
  {
    id: 239,
    text: "O Senhor é a minha luz e a minha salvação; de quem terei medo?",
    reference: "Salmos 27:1",
    category: "Propósito",
    theme: "Coragem",
  },
  {
    id: 240,
    text: "Deus não é injusto para se esquecer do vosso trabalho e do amor que demonstrastes.",
    reference: "Hebreus 6:10",
    category: "Propósito",
    theme: "Serviço",
  },
  {
    id: 241,
    text: "Buscai primeiro o Reino de Deus e a sua justiça, e todas essas coisas vos serão acrescentadas.",
    reference: "Mateus 6:33",
    category: "Propósito",
    theme: "Prioridades",
  },
  {
    id: 242,
    text: "Sede imitadores de Deus, como filhos amados.",
    reference: "Efésios 5:1",
    category: "Propósito",
    theme: "Identidade",
  },
  {
    id: 243,
    text: "Regozija-te no Senhor, e ele satisfará os desejos do teu coração.",
    reference: "Salmos 37:4",
    category: "Propósito",
    theme: "Alegria",
  },
  {
    id: 244,
    text: "O justo florescerá como a palmeira e crescerá como o cedro no Líbano.",
    reference: "Salmos 92:12",
    category: "Propósito",
    theme: "Crescimento",
  },
  {
    id: 245,
    text: "Andar humildemente com o teu Deus é o que o Senhor requer de ti.",
    reference: "Miquéias 6:8",
    category: "Propósito",
    theme: "Humildade",
  },
  {
    id: 246,
    text: "O Senhor é bom para os que esperam nele, para a alma que o busca.",
    reference: "Lamentações 3:25",
    category: "Propósito",
    theme: "Esperança",
  },
  {
    id: 247,
    text: "Não te desanimes, porque o Senhor teu Deus está contigo por onde quer que andares.",
    reference: "Josué 1:9",
    category: "Propósito",
    theme: "Confiança",
  },
  {
    id: 248,
    text: "Fazei tudo sem murmurações, para que sejais irrepreensíveis filhos de Deus.",
    reference: "Filipenses 2:14-15",
    category: "Propósito",
    theme: "Caráter",
  },
  {
    id: 249,
    text: "O Senhor é a força do seu povo; ele é refúgio e salvação para o seu ungido.",
    reference: "Salmos 28:8",
    category: "Propósito",
    theme: "Força",
  },
  {
    id: 250,
    text: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus.",
    reference: "1 Tessalonicenses 5:18",
    category: "Propósito",
    theme: "Gratidão",
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
