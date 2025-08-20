import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verifica se o pagamento foi aprovado
    if (body.event === "PAYMENT_RECEIVED" || body.event === "PAYMENT_CONFIRMED") {
      const payment = body.payment

      // Recupera os dados dos participantes das observações
      if (payment.observations) {
        try {
          const participantsData = JSON.parse(payment.observations)

          // Salva os participantes no Supabase
          const { data, error } = await supabase.from("pessoas").insert(participantsData).select()

          if (error) {
            console.error("Erro ao salvar no Supabase:", error)
            return NextResponse.json({ error: "Erro ao salvar participantes" }, { status: 500 })
          }

          console.log("Participantes salvos com sucesso:", data)

          // Aqui você pode enviar email de confirmação, etc.
        } catch (parseError) {
          console.error("Erro ao fazer parse dos dados dos participantes:", parseError)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Erro no webhook:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
