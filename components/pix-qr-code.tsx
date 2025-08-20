"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle, QrCode, Smartphone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PixQRCodeProps {
  qrCode: string
  copyPaste: string
  amount: number
  paymentId: string
}

export function PixQRCode({ qrCode, copyPaste, amount, paymentId }: PixQRCodeProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(copyPaste)
      setCopied(true)
      toast({
        title: "Código PIX copiado! 📋",
        description: "Cole no seu app do banco para fazer o pagamento.",
      })
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Tente copiar manualmente o código PIX.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <QrCode className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-600 mb-2">Pagamento PIX</h3>
        <p className="text-gray-600">Escaneie o QR Code ou copie o código</p>
      </div>

      {/* QR Code */}
      <div className="text-center">
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block shadow-sm">
          <img src={`data:image/png;base64,${qrCode}`} alt="QR Code PIX" className="w-48 h-48 mx-auto" />
        </div>
      </div>

      {/* Código PIX */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Smartphone className="h-4 w-4" />
          Código PIX (Copia e Cola):
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={copyPaste}
            readOnly
            className="flex-1 p-3 border rounded-lg bg-gray-50 text-xs font-mono break-all"
          />
          <Button
            onClick={copyPixCode}
            variant="outline"
            size="sm"
            className={`px-4 transition-all duration-200 ${
              copied ? "bg-green-50 border-green-200 text-green-600" : "hover:bg-gray-50"
            }`}
          >
            {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Valor */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-green-800">Valor a pagar:</span>
          <span className="text-2xl font-bold text-green-600">R$ {amount.toFixed(2)}</span>
        </div>
      </div>

      {/* Instruções */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">📱 Como pagar:</h4>
        <ol className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              1
            </span>
            Abra o app do seu banco
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              2
            </span>
            Escaneie o QR Code ou cole o código PIX
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              3
            </span>
            Confirme o pagamento
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              4
            </span>
            Sua inscrição será confirmada automaticamente
          </li>
        </ol>
      </div>

      {/* Info do pagamento */}
      <div className="text-center text-xs text-gray-500 border-t pt-4">
        <p>
          ID do Pagamento: <span className="font-mono">{paymentId}</span>
        </p>
        <p className="mt-1">⚡ Aprovação instantânea após o pagamento</p>
      </div>
    </div>
  )
}
