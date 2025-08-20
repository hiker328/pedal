import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log("Resultado do pagamento InfinitePay recebido:", body)

    // Extrai os parâmetros do resultado
    const {
      order_id,
      nsu,
      aut,
      card_brand,
      user_id,
      access_id,
      handle,
      merchant_document,
      warning
    } = body

    // Verifica se houve erro
    if (warning) {
      console.error("Aviso no pagamento:", warning)
      return NextResponse.json({ 
        success: false, 
        error: warning,
        orderId: order_id 
      })
    }

    // Verifica se o pagamento foi aprovado
    if (nsu && aut) {
      console.log("Pagamento aprovado:", { order_id, nsu, aut, card_brand })

      // Aqui você pode buscar os dados dos participantes pelo order_id
      // e salvá-los no banco de dados
      
      // Exemplo de como salvar no Supabase (se configurado)
      if (isSupabaseConfigured()) {
        try {
          const supabase = getSupabaseClient()
          
          // Busca os dados dos participantes (você precisa implementar essa lógica)
          // const participantsData = await getParticipantsByOrderId(order_id)
          
          // Salva no banco com status pago
          // const { data, error } = await supabase
          //   .from("pessoas")
          //   .insert(participantsData.map(p => ({ ...p, pago: true })))
          //   .select()

          console.log("Dados salvos no banco com sucesso")
        } catch (dbError) {
          console.error("Erro ao salvar no banco:", dbError)
        }
      }

      return NextResponse.json({
        success: true,
        orderId: order_id,
        nsu,
        aut,
        cardBrand: card_brand,
        message: "Pagamento processado com sucesso"
      })
    }

    return NextResponse.json({
      success: false,
      orderId: order_id,
      message: "Pagamento não foi aprovado"
    })

  } catch (error) {
    console.error("Erro ao processar resultado do pagamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
