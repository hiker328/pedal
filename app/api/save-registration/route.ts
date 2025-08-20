import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase"

interface Participant {
  nome: string
  tamanho_camisa: string
  cidade_origem: string
  equipe: string
}

export async function POST(request: NextRequest) {
  // Verifica se está em modo de build
  if (process.env.NODE_ENV === 'production' && !isSupabaseConfigured()) {
    return NextResponse.json({ error: "Configuração do banco de dados não disponível" }, { status: 503 })
  }

  try {
    const { participants }: { participants: Participant[] } = await request.json()

    if (!participants || participants.length === 0) {
      return NextResponse.json({ error: "Nenhum participante fornecido" }, { status: 400 })
    }

    // Valida os dados obrigatórios
    for (const participant of participants) {
      if (!participant.nome || !participant.tamanho_camisa) {
        return NextResponse.json({ error: "Nome e tamanho da camisa são obrigatórios" }, { status: 400 })
      }
    }

    // Insere os participantes no Supabase
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("pessoas").insert(participants).select()

    if (error) {
      console.error("Erro do Supabase:", error)
      return NextResponse.json({ error: "Erro ao salvar no banco de dados" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data,
      message: `${participants.length} participante(s) registrado(s) com sucesso`,
    })
  } catch (error) {
    console.error("Erro na API:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
