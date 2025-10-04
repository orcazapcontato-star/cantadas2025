"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Toast } from "@/components/ui/toast"
import {
  Heart,
  Copy,
  Star,
  BookOpen,
  Smile,
  Search,
  Share2,
  TrendingUp,
  Filter,
  Grid3x3,
  List,
  Download,
} from "lucide-react"
import Link from "next/link"
import { useFavorites } from "@/lib/favorites-context"
import { useState, useMemo } from "react"
import Navigation from "@/components/navigation"

const allPickupLines = [
  // Românticas
  {
    id: 1,
    text: "Você deve ser uma bênção, porque desde que te vi, minha vida mudou para melhor.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 95,
  },
  {
    id: 2,
    text: "Deus deve ter usado todo o Seu amor quando te criou.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 90,
  },
  {
    id: 3,
    text: "Você deve ser um anjo, porque trouxe o céu para a minha vida.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 85,
  },
  {
    id: 4,
    text: "Você é como um salmo: cada palavra sua traz paz ao meu coração.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 80,
  },
  {
    id: 5,
    text: "Se Deus pintou o arco-íris, imagino que cores Ele usou para pintar seus olhos.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 75,
  },
  {
    id: 6,
    text: "Se o amor move montanhas, o seu sorriso deve mover continentes.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 70,
  },
  {
    id: 7,
    text: "Você é a melodia mais bonita que Deus já compôs.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 65,
  },
  {
    id: 8,
    text: "Seu sorriso ilumina meu dia como o sol ilumina a manhã.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 60,
  },
  {
    id: 9,
    text: "Você é como uma estrela: mesmo de longe, ilumina minha vida.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 55,
  },
  {
    id: 10,
    text: "Deus criou as flores, mas você é a mais bela de todas.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 50,
  },
  {
    id: 11,
    text: "Seu olhar é como um abraço que aquece minha alma.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 45,
  },
  {
    id: 12,
    text: "Você é a prova de que Deus é um artista perfeito.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 40,
  },
  {
    id: 13,
    text: "Cada momento ao seu lado é um presente de Deus.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 35,
  },
  {
    id: 14,
    text: "Você é como um jardim: cada dia descubro uma nova beleza em você.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 30,
  },
  {
    id: 15,
    text: "Seu coração bondoso é mais precioso que qualquer tesouro.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 88,
  },
  {
    id: 53,
    text: "Você é como uma canção de louvor: cada nota traz alegria ao meu coração.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 92,
  },
  {
    id: 54,
    text: "Seu sorriso é como o nascer do sol: ilumina tudo ao seu redor.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 90,
  },
  {
    id: 55,
    text: "Você é como uma oração atendida que eu nem sabia que precisava fazer.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 94,
  },
  {
    id: 56,
    text: "Cada palavra sua é como mel: doce e reconfortante.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 87,
  },
  {
    id: 57,
    text: "Você é como um presente de Deus embrulhado em amor.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 91,
  },
  {
    id: 58,
    text: "Seu olhar é como uma janela para o céu.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 89,
  },
  {
    id: 59,
    text: "Você é como a primavera: traz vida e cor para tudo.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 86,
  },
  {
    id: 60,
    text: "Seu abraço é como um refúgio seguro em meio às tempestades.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 93,
  },
  {
    id: 61,
    text: "Você é como uma estrela cadente: rara e inesquecível.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 88,
  },
  {
    id: 62,
    text: "Cada momento ao seu lado é como um versículo de amor.",
    category: "Romântica",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
    popularity: 90,
  },

  // Bíblicas
  {
    id: 16,
    text: "Se Deus criou algo mais belo que você, deve ter guardado só para Ele no céu.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 96,
  },
  {
    id: 17,
    text: "Você é como Provérbios 31: uma mulher virtuosa cujo valor excede o de rubis.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 91,
  },
  {
    id: 18,
    text: "Se eu fosse Josué, pediria ao sol para parar só para ter mais tempo contigo.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 86,
  },
  {
    id: 19,
    text: "Se o amor é paciente e bondoso, então você deve ser a definição perfeita do amor.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 81,
  },
  {
    id: 20,
    text: "Você é como o fruto do Espírito: amor, alegria, paz... tudo em uma pessoa só.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 76,
  },
  {
    id: 21,
    text: "Como Rute seguiu Noemi, eu seguiria você até o fim do mundo.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 71,
  },
  {
    id: 22,
    text: "Você é como a graça de Deus: imerecida, mas transformadora.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 66,
  },
  {
    id: 23,
    text: "Você é como a arca de Noé: um refúgio seguro em meio às tempestades.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 61,
  },
  {
    id: 24,
    text: "Como Ester foi escolhida para um propósito, você foi escolhida para meu coração.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 56,
  },
  {
    id: 25,
    text: "Você é como o maná: um presente diário de Deus para minha vida.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 51,
  },
  {
    id: 26,
    text: "Como Davi encontrou Bate-Seba, eu encontrei você: uma bênção inesperada.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 46,
  },
  {
    id: 27,
    text: "Você é como a sabedoria de Salomão: rara e preciosa.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 41,
  },
  {
    id: 28,
    text: "Como José esperou por seus sonhos, eu esperaria por você.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 36,
  },
  {
    id: 29,
    text: "Você é como a fé de Abraão: forte, constante e inspiradora.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 31,
  },
  {
    id: 30,
    text: "Como o amor de Cristo pela igreja, assim é meu amor por você.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 96,
  },
  {
    id: 63,
    text: "Você é como a terra prometida: vale a pena esperar e lutar por você.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 94,
  },
  {
    id: 64,
    text: "Como Jacó trabalhou 14 anos por Raquel, eu esperaria uma vida inteira por você.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 97,
  },
  {
    id: 65,
    text: "Você é como o Salmo 23: traz paz e conforto à minha alma.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 93,
  },
  {
    id: 66,
    text: "Como Moisés viu a sarça ardente, eu vejo a glória de Deus em você.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 91,
  },
  {
    id: 67,
    text: "Você é como o cordeiro pascal: preciosa e digna de celebração.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 89,
  },
  {
    id: 68,
    text: "Como Daniel na cova dos leões, eu enfrentaria qualquer desafio por você.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 92,
  },
  {
    id: 69,
    text: "Você é como a videira verdadeira: fonte de vida e alegria.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 88,
  },
  {
    id: 70,
    text: "Como Pedro caminhou sobre as águas, eu daria passos de fé por você.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 90,
  },
  {
    id: 71,
    text: "Você é como o tabernáculo: onde a presença de Deus habita.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 87,
  },
  {
    id: 72,
    text: "Como João Batista preparou o caminho, você preparou meu coração para o amor.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 91,
  },
  {
    id: 73,
    text: "Você é como a nova Jerusalém: perfeita e radiante.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 89,
  },
  {
    id: 74,
    text: "Como Elias foi levado ao céu, você eleva meu espírito.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 86,
  },
  {
    id: 75,
    text: "Você é como o pão da vida: essencial e nutritiva para minha alma.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 92,
  },
  {
    id: 76,
    text: "Como Maria guardava as coisas no coração, eu guardo cada momento contigo.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 94,
  },
  {
    id: 77,
    text: "Você é como a armadura de Deus: proteção e força para minha vida.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 88,
  },
  {
    id: 78,
    text: "Como Zaqueu subiu na árvore, eu faria qualquer coisa para te ver.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 90,
  },
  {
    id: 79,
    text: "Você é como o rio da vida: refrescante e vivificante.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 87,
  },
  {
    id: 80,
    text: "Como Paulo escreveu cartas, eu escreveria poemas eternos sobre você.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 93,
  },
  {
    id: 81,
    text: "Você é como a pedra angular: fundamental para construir meu futuro.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 91,
  },
  {
    id: 82,
    text: "Como Gideão venceu com poucos, com você ao meu lado posso vencer tudo.",
    category: "Bíblica",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
    popularity: 89,
  },

  // Engraçadas
  {
    id: 31,
    text: "Você é a resposta para todas as minhas orações... literalmente!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 85,
  },
  {
    id: 32,
    text: "Deus realmente se superou quando te criou... e olha que Ele já tinha feito o pôr do sol!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 80,
  },
  {
    id: 33,
    text: "Se eu pudesse reescrever o Gênesis, começaria com 'No princípio, Deus criou você'.",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 75,
  },
  {
    id: 34,
    text: "Se eu fosse Moisés, pediria para Deus abrir o mar só para caminhar até você.",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 70,
  },
  {
    id: 35,
    text: "Você deve ter um mapa, porque me perdi nos seus olhos!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 65,
  },
  {
    id: 36,
    text: "Se beleza fosse pecado, você precisaria de muito perdão!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 60,
  },
  {
    id: 37,
    text: "Você deve ser o fruto proibido, porque não consigo resistir!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 55,
  },
  {
    id: 38,
    text: "Se eu fosse Adão, você seria minha Eva... mas sem a parte da maçã!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 50,
  },
  {
    id: 39,
    text: "Você é como o WiFi da igreja: todo mundo quer se conectar!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 45,
  },
  {
    id: 40,
    text: "Se eu fosse Sansão, você seria minha força... mas não cortaria meu cabelo!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 40,
  },
  {
    id: 41,
    text: "Você é como o dízimo: 10% não é suficiente, quero dar 100%!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 35,
  },
  {
    id: 42,
    text: "Se eu fosse Noé, construiria uma arca só para nós dois!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 85,
  },
  {
    id: 83,
    text: "Você deve ser o maná, porque caiu do céu direto na minha vida!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 88,
  },
  {
    id: 84,
    text: "Se eu fosse Golias, você seria a pedra que acertou meu coração!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 86,
  },
  {
    id: 85,
    text: "Você é como o culto de domingo: não posso perder!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 84,
  },
  {
    id: 86,
    text: "Se eu fosse Jonas, seria engolido pela baleia só para ter uma história para te contar!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 87,
  },
  {
    id: 87,
    text: "Você é como o louvor: quanto mais te conheço, mais quero estar perto!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 89,
  },
  {
    id: 88,
    text: "Se eu fosse Zaqueu, subiria em qualquer árvore só para te ver passar!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 85,
  },
  {
    id: 89,
    text: "Você é como a oferta: quanto mais dou atenção, mais recebo de volta!",
    category: "Engraçada",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-800",
    popularity: 83,
  },

  // Inspiradoras
  {
    id: 43,
    text: "Você é como a fé: não posso ver, mas sei que é real e transforma tudo.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 92,
  },
  {
    id: 44,
    text: "Você é como a prova de que Deus tem um senso de humor perfeito e um coração cheio de amor.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 90,
  },
  {
    id: 45,
    text: "Você deve ser uma parábola, porque cada momento contigo ensina algo sobre o amor.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 88,
  },
  {
    id: 46,
    text: "Você é como a luz: onde você está, as trevas não podem permanecer.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 90,
  },
  {
    id: 47,
    text: "Sua presença é como uma oração respondida.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 86,
  },
  {
    id: 48,
    text: "Você é como a esperança: mesmo nos dias difíceis, me faz acreditar em dias melhores.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 90,
  },
  {
    id: 49,
    text: "Você é como um milagre: algo que só Deus poderia fazer.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 88,
  },
  {
    id: 50,
    text: "Sua bondade é como uma semente: planta amor onde quer que vá.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 86,
  },
  {
    id: 51,
    text: "Você é como a paz de Deus: supera todo entendimento.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 92,
  },
  {
    id: 52,
    text: "Você é como um testemunho vivo do amor de Deus.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 92,
  },
  {
    id: 90,
    text: "Você é como a aurora: anuncia um novo dia cheio de possibilidades.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 91,
  },
  {
    id: 91,
    text: "Sua fé é contagiante e me inspira a ser uma pessoa melhor.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 94,
  },
  {
    id: 92,
    text: "Você é como um farol: guia e ilumina o caminho dos que estão ao seu redor.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 90,
  },
  {
    id: 93,
    text: "Sua alegria é como um bálsamo que cura corações feridos.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 89,
  },
  {
    id: 94,
    text: "Você é como uma ponte: conecta pessoas ao amor de Deus.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 93,
  },
  {
    id: 95,
    text: "Sua humildade é um exemplo vivo de grandeza verdadeira.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 91,
  },
  {
    id: 96,
    text: "Você é como uma fonte: de onde você está, flui vida e renovação.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 88,
  },
  {
    id: 97,
    text: "Sua coragem me inspira a enfrentar meus próprios desafios.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 92,
  },
  {
    id: 98,
    text: "Você é como um jardim bem cuidado: fruto de dedicação e amor.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 87,
  },
  {
    id: 99,
    text: "Sua generosidade é um reflexo do coração de Deus.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 90,
  },
  {
    id: 100,
    text: "Você é como uma sinfonia: cada parte de você cria harmonia perfeita.",
    category: "Inspiradora",
    icon: Star,
    color: "bg-purple-100 text-purple-800",
    popularity: 93,
  },
]

const categories = [
  { name: "Todas", count: "100", icon: Filter },
  { name: "Romântica", count: "27", icon: Heart },
  { name: "Bíblica", count: "37", icon: BookOpen },
  { name: "Engraçada", count: "20", icon: Smile },
  { name: "Inspiradora", count: "16", icon: Star },
]

export default function CantadasPage() {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [displayCount, setDisplayCount] = useState(12)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"default" | "popular" | "recent">("default")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null)

  const filteredLines = useMemo(() => {
    let lines = allPickupLines

    if (selectedCategory !== "Todas") {
      lines = lines.filter((line) => line.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      lines = lines.filter((line) => line.text.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (sortBy === "popular") {
      lines = [...lines].sort((a, b) => b.popularity - a.popularity)
    } else if (sortBy === "recent") {
      lines = [...lines].reverse()
    }

    return lines
  }, [selectedCategory, searchQuery, sortBy])

  const displayedLines = filteredLines.slice(0, displayCount)
  const hasMoreLines = displayCount < filteredLines.length

  const stats = useMemo(() => {
    const totalFavorites = allPickupLines.filter((line) => isFavorite(line.text)).length
    const avgPopularity = Math.round(
      allPickupLines.reduce((sum, line) => sum + line.popularity, 0) / allPickupLines.length,
    )
    return {
      total: allPickupLines.length,
      favorites: totalFavorites,
      avgPopularity,
    }
  }, [isFavorite])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setToast({ message: "Cantada copiada!", type: "success" })
  }

  const toggleFavorite = (line: any) => {
    if (isFavorite(line.text)) {
      const favoriteId = line.id.toString()
      removeFavorite(favoriteId)
      setToast({ message: "Removido dos favoritos", type: "info" })
    } else {
      addFavorite({
        type: "cantada",
        title: `Cantada ${line.category}`,
        content: line.text,
        category: line.category,
      })
      setToast({ message: "Adicionado aos favoritos!", type: "success" })
    }
  }

  const shareToWhatsApp = (text: string) => {
    const message = encodeURIComponent(`${text}\n\n✨ Via Cantadas Cristãs`)
    window.open(`https://wa.me/?text=${message}`, "_blank")
  }

  const loadMore = () => {
    setDisplayCount((prev) => prev + 12)
  }

  const exportFavorites = () => {
    const favoritesText = allPickupLines
      .filter((line) => isFavorite(line.text))
      .map((line) => `${line.category}: ${line.text}`)
      .join("\n\n")

    const blob = new Blob([favoritesText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "minhas-cantadas-favoritas.txt"
    a.click()
    setToast({ message: "Favoritos exportados!", type: "success" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header with Gradient */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            {stats.total} Cantadas Disponíveis
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Biblioteca Completa de Cantadas Cristãs
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8 leading-relaxed">
            Cantadas respeitosas e criativas que honram os valores cristãos e demonstram interesse genuíno
          </p>

          {/* Statistics Display */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total de Cantadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.favorites}</div>
              <div className="text-sm text-muted-foreground">Seus Favoritos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.avgPopularity}%</div>
              <div className="text-sm text-muted-foreground">Popularidade Média</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar cantadas por palavra-chave..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setDisplayCount(12)
                  }}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "default" | "popular" | "recent")}
                className="px-4 py-2 rounded-md border border-input bg-background text-foreground"
              >
                <option value="default">Ordenar: Padrão</option>
                <option value="popular">Ordenar: Mais Populares</option>
                <option value="recent">Ordenar: Mais Recentes</option>
              </select>
            </div>

            {/* View Mode Toggle and Export Button */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              {stats.favorites > 0 && (
                <Button variant="outline" size="sm" onClick={exportFavorites}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Favoritos
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Badge
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "secondary"}
                  className="px-4 py-2.5 text-sm cursor-pointer hover:bg-primary/10 transition-all hover:scale-105"
                  onClick={() => {
                    setSelectedCategory(category.name)
                    setDisplayCount(12)
                  }}
                >
                  <IconComponent className="h-3.5 w-3.5 mr-1.5" />
                  {category.name} ({category.count})
                </Badge>
              )
            })}
          </div>
          <p className="text-center text-muted-foreground text-sm">
            Mostrando <span className="font-semibold text-foreground">{displayedLines.length}</span> de{" "}
            <span className="font-semibold text-foreground">{filteredLines.length}</span> cantadas
            {selectedCategory !== "Todas" && ` na categoria ${selectedCategory}`}
          </p>
        </div>
      </section>

      {/* Pickup Lines Grid/List */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Conditional Rendering for Grid vs List View */}
          <div
            className={
              viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" : "flex flex-col gap-4"
            }
          >
            {displayedLines.map((line) => {
              const IconComponent = line.icon
              const isLineFavorite = isFavorite(line.text)
              return (
                <Card
                  key={line.id}
                  className="bg-card border-border hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={line.color}>
                          <IconComponent className="h-3 w-3 mr-1" />
                          {line.category}
                        </Badge>
                        {/* Popularity Indicator */}
                        <Badge variant="outline" className="text-xs">
                          {line.popularity}% ❤️
                        </Badge>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(line)}
                          className={isLineFavorite ? "text-primary" : ""}
                          title="Favoritar"
                        >
                          <Heart className={`h-4 w-4 ${isLineFavorite ? "fill-current" : ""}`} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(line.text)} title="Copiar">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => shareToWhatsApp(line.text)}
                          title="Compartilhar no WhatsApp"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-foreground text-base sm:text-lg leading-relaxed italic">
                      "{line.text}"
                    </blockquote>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {hasMoreLines && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="px-8 bg-transparent hover:bg-primary/10 transition-all"
                onClick={loadMore}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Carregar Mais Cantadas ({filteredLines.length - displayCount} restantes)
              </Button>
            </div>
          )}

          {filteredLines.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-4 text-6xl">🔍</div>
              <p className="text-muted-foreground text-lg mb-4">Nenhuma cantada encontrada</p>
              <p className="text-muted-foreground text-sm mb-6">
                Tente ajustar seus filtros ou buscar por outras palavras-chave
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("Todas")
                }}
              >
                Limpar Todos os Filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">Gostou das cantadas?</h3>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Explore nossas mensagens prontas e dicas para relacionamentos cristãos saudáveis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mensagens">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Ver Mensagens Prontas
              </Button>
            </Link>
            <Link href="/dicas">
              <Button variant="outline" size="lg">
                Dicas de Relacionamento
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Toast Notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
