import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, paymentMethod, participants, customerName, participantsData } = await request.json()

    console.log("Iniciando criação de pagamento InfinitePay:", { amount, paymentMethod, participants, customerName })

    // Validações básicas
    if (!amount || amount < 100) {
      return NextResponse.json({ error: "Valor mínimo deve ser R$ 1,00 (100 centavos)" }, { status: 400 })
    }

    if (!customerName) {
      return NextResponse.json({ error: "Nome do cliente é obrigatório" }, { status: 400 })
    }

    // Gera um ID único para a ordem
    const orderId = `pedal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Configura o método de pagamento
    const paymentMethodParam = paymentMethod === "pix" ? "pix" : "credit"
    const installments = paymentMethod === "credit" ? "1" : "1" // Pode ser expandido para mais parcelas

    // URL de retorno para o app
    const resultUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://pedal12.vercel.app'}/payment-result`

    // Constrói o deeplink do InfinitePay
    const deeplinkParams = new URLSearchParams({
      amount: amount.toString(),
      payment_method: paymentMethodParam,
      installments: installments,
      order_id: orderId,
      result_url: resultUrl,
      app_client_referrer: "Pedal2026",
      af_force_deeplink: "true"
    })

    const infinitePayDeeplink = `infinitepaydash://infinitetap-app?${deeplinkParams.toString()}`

    // Salva os dados dos participantes temporariamente (pode ser em cache ou banco)
    // Aqui você pode salvar em uma tabela temporária ou usar Redis
    const paymentData = {
      orderId,
      customerName,
      amount,
      participants,
      participantsData,
      status: "pending",
      createdAt: new Date().toISOString()
    }

    console.log("Deeplink gerado:", infinitePayDeeplink)

    return NextResponse.json({
      success: true,
      orderId,
      deeplink: infinitePayDeeplink,
      paymentData,
      message: "Pagamento iniciado com InfinitePay"
    })

  } catch (error) {
    console.error("Erro na API de pagamento InfinitePay:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
