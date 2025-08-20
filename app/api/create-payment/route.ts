import { type NextRequest, NextResponse } from "next/server"

const ASAAS_API_URL = "https://sandbox.asaas.com/api/v3" // Usando sandbox para testes
const ASAAS_API_KEY = process.env.ASAAS_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { amount, paymentMethod, participants, customerName, participantsData } = await request.json()

    console.log("Iniciando criação de pagamento:", { amount, paymentMethod, participants, customerName })

    if (!ASAAS_API_KEY) {
      console.error("ASAAS_API_KEY não configurada")
      return NextResponse.json({ error: "Chave da API do Asaas não configurada" }, { status: 500 })
    }

    // Log da chave para debug (apenas primeiros caracteres)
    console.log("API Key configurada:", ASAAS_API_KEY.substring(0, 10) + "...")

    // Primeiro, cria ou busca o cliente
    const customerPayload = {
      name: customerName,
      email: `${customerName.toLowerCase().replace(/\s+/g, "")}@pedal2026.com`,
      cpfCnpj: "24971563792", // CPF válido para testes
    }

    console.log("Criando cliente:", customerPayload)

    const customerResponse = await fetch(`${ASAAS_API_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: ASAAS_API_KEY,
      },
      body: JSON.stringify(customerPayload),
    })

    const customerData = await customerResponse.json()
    console.log("Resposta do cliente:", customerData)

    if (!customerResponse.ok) {
      console.error("Erro ao criar cliente:", customerData)

      // Tratamento específico para erro de ambiente
      if (customerData.errors?.[0]?.code === "invalid_environment") {
        return NextResponse.json(
          {
            error: "Erro de configuração da API. Verifique se a chave está correta para o ambiente (sandbox/produção).",
          },
          { status: 400 },
        )
      }

      return NextResponse.json(
        {
          error: customerData.errors?.[0]?.description || "Erro ao criar cliente",
        },
        { status: 400 },
      )
    }

    const customerId = customerData.id
    console.log("Cliente criado com ID:", customerId)

    // Cria a cobrança
    const billingType = paymentMethod === "pix" ? "PIX" : "CREDIT_CARD"
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 1) // 1 dia para vencimento

    const paymentPayload = {
      customer: customerId,
      billingType,
      value: amount,
      dueDate: dueDate.toISOString().split("T")[0],
      description: `Inscrição Pedal 2026 - ${participants} pessoa(s)`,
      externalReference: `pedal-2026-${Date.now()}`,
      observations: JSON.stringify(participantsData),
    }

    console.log("Criando pagamento:", paymentPayload)

    const paymentResponse = await fetch(`${ASAAS_API_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: ASAAS_API_KEY,
      },
      body: JSON.stringify(paymentPayload),
    })

    const payment = await paymentResponse.json()
    console.log("Resposta do pagamento:", payment)

    if (!paymentResponse.ok) {
      console.error("Erro do Asaas:", payment)
      return NextResponse.json(
        { error: payment.errors?.[0]?.description || "Erro ao criar pagamento" },
        { status: 400 },
      )
    }

    // Se for PIX, tenta gerar o QR Code
    if (billingType === "PIX") {
      console.log("Gerando QR Code PIX para pagamento:", payment.id)

      // Aguarda um pouco para o Asaas processar
      await new Promise((resolve) => setTimeout(resolve, 2000))

      try {
        const pixResponse = await fetch(`${ASAAS_API_URL}/payments/${payment.id}/pixQrCode`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: ASAAS_API_KEY,
          },
        })

        if (pixResponse.ok) {
          const pixData = await pixResponse.json()
          console.log("QR Code gerado com sucesso")

          return NextResponse.json({
            success: true,
            paymentId: payment.id,
            invoiceUrl: payment.invoiceUrl,
            pixQrCode: pixData.encodedImage,
            pixCopyAndPaste: pixData.payload,
            status: payment.status,
          })
        } else {
          console.warn("Não foi possível gerar QR Code, usando dados básicos")
        }
      } catch (pixError) {
        console.error("Erro ao gerar QR Code:", pixError)
      }
    }

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      invoiceUrl: payment.invoiceUrl,
      pixQrCode: null,
      pixCopyAndPaste: payment.pixCopyAndPaste || null,
      status: payment.status,
    })
  } catch (error) {
    console.error("Erro na API de pagamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
