"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const FAQ_RESPONSES: Record<string, string> = {
  pago: `💳 **Problemas con el pago**

Si tienes problemas para realizar un pago, verifica:
• Que tu tarjeta tenga fondos suficientes
• Que los datos de la tarjeta sean correctos
• Que tu banco no haya bloqueado la transacción

Aceptamos: Tarjetas de crédito/débito, PSE, y transferencias bancarias.

Si el problema persiste, contáctanos al WhatsApp: +57 300 123 4567`,

  devolucion: `🔄 **Política de devoluciones**

Aceptamos devoluciones dentro de los 30 días posteriores a la compra.

Requisitos:
• Producto en perfecto estado
• Empaque original
• Factura de compra

Proceso:
1. Contacta a soporte@elartedevivir.com
2. Envía fotos del producto
3. Te enviaremos una guía de devolución
4. Reembolso en 5-7 días hábiles

¿Necesitas más ayuda?`,

  envio: `📦 **Información de envíos**

Tiempos de entrega:
• Bogotá: 2-3 días hábiles
• Principales ciudades: 3-5 días hábiles
• Resto del país: 5-8 días hábiles

Costo de envío:
• Gratis en compras superiores a $150.000
• $15.000 para compras menores

Seguimiento: Recibirás un código de rastreo por email.`,

  sesion: `🔐 **Problemas para iniciar sesión**

Si no puedes acceder a tu cuenta:

1. Verifica tu email y contraseña
2. Usa "¿Olvidaste tu contraseña?" para restablecerla
3. Revisa tu carpeta de spam para el email de recuperación

¿Aún no tienes cuenta?
Regístrate en 2 minutos y disfruta de:
• Seguimiento de pedidos
• Historial de compras
• Ofertas exclusivas

¿Necesitas ayuda? Escríbenos a soporte@elartedevivir.com`,

  productos: `🎨 **Nuestros productos**

Ofrecemos tres categorías principales:

**Arte** 🖼️
Esculturas, pinturas y piezas decorativas únicas

**Artesanías** 🏺
Productos hechos a mano por artesanos colombianos

**Perfumes** 🌸
Fragancias exclusivas y naturales

¿Buscas algo específico? Cuéntame más sobre lo que necesitas.`,

  contacto: `📞 **Contáctanos**

Estamos aquí para ayudarte:

📧 Email: soporte@elartedevivir.com
📱 WhatsApp: +57 300 123 4567
🕐 Horario: Lun-Vie 9am-6pm, Sáb 9am-2pm

Redes sociales:
• Instagram: @elartedevivir
• Facebook: El Arte de Vivir

Tiempo de respuesta: 24-48 horas`,

  garantia: `✅ **Garantía de productos**

Todos nuestros productos cuentan con garantía:

• **Arte y Artesanías**: Garantía de autenticidad
• **Perfumes**: Garantía de calidad por 6 meses

Si recibes un producto defectuoso:
1. Contáctanos en las primeras 48 horas
2. Envía fotos del producto
3. Cambio o reembolso inmediato

Tu satisfacción es nuestra prioridad.`,

  descuento: `🎁 **Descuentos y promociones**

Formas de ahorrar:

• **Primera compra**: 10% de descuento con código BIENVENIDO
• **Envío gratis**: En compras sobre $150.000
• **Newsletter**: Suscríbete y recibe ofertas exclusivas
• **Cumpleaños**: Regalo especial en tu mes

¡Síguenos en redes sociales para no perderte ninguna promoción!`,

  default: `¡Hola! 👋 Soy tu asistente virtual de El Arte de Vivir.

Puedo ayudarte con:
• Problemas con pagos
• Devoluciones y cambios
• Información de envíos
• Problemas para iniciar sesión
• Información de productos
• Contacto y soporte
• Garantías
• Descuentos y promociones

¿En qué puedo ayudarte hoy?`,
}

function getAutomaticResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

  if (
    message.includes("pago") ||
    message.includes("pagar") ||
    message.includes("tarjeta") ||
    message.includes("transacción")
  ) {
    return FAQ_RESPONSES.pago
  }
  if (message.includes("devol") || message.includes("cambio") || message.includes("reembolso")) {
    return FAQ_RESPONSES.devolucion
  }
  if (
    message.includes("envío") ||
    message.includes("envio") ||
    message.includes("entrega") ||
    message.includes("enviar")
  ) {
    return FAQ_RESPONSES.envio
  }
  if (
    message.includes("sesión") ||
    message.includes("sesion") ||
    message.includes("login") ||
    message.includes("contraseña") ||
    message.includes("cuenta")
  ) {
    return FAQ_RESPONSES.sesion
  }
  if (
    message.includes("producto") ||
    message.includes("venden") ||
    message.includes("categoría") ||
    message.includes("categoria")
  ) {
    return FAQ_RESPONSES.productos
  }
  if (
    message.includes("contacto") ||
    message.includes("contactar") ||
    message.includes("teléfono") ||
    message.includes("telefono") ||
    message.includes("email") ||
    message.includes("whatsapp")
  ) {
    return FAQ_RESPONSES.contacto
  }
  if (
    message.includes("garantía") ||
    message.includes("garantia") ||
    message.includes("defectuoso") ||
    message.includes("calidad")
  ) {
    return FAQ_RESPONSES.garantia
  }
  if (
    message.includes("descuento") ||
    message.includes("promoción") ||
    message.includes("promocion") ||
    message.includes("oferta") ||
    message.includes("cupón") ||
    message.includes("cupon")
  ) {
    return FAQ_RESPONSES.descuento
  }

  return FAQ_RESPONSES.default
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isTyping) return

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simular tiempo de respuesta (500-1000ms)
    const responseTime = Math.random() * 500 + 500

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAutomaticResponse(inputValue),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, responseTime)
  }

  const suggestedQuestions = [
    "¿Cómo puedo hacer un pago?",
    "¿Cuál es el tiempo de envío?",
    "¿Cómo hago una devolución?",
    "Problemas para iniciar sesión",
  ]

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl transition-all duration-300",
          "bg-gradient-to-br from-[#8b2942] to-[#c44569] hover:from-[#6d1f33] hover:to-[#a33555]",
          "hover:scale-110 active:scale-95",
          isOpen && "scale-0",
        )}
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex flex-col transition-all duration-300",
          "w-[380px] h-[600px] max-h-[80vh]",
          "bg-white rounded-2xl shadow-2xl border border-gray-200",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#8b2942] to-[#c44569] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Asistente Virtual</h3>
              <p className="text-xs text-white/80">El Arte de Vivir</p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#8b2942]/10 to-[#c44569]/10 rounded-xl p-4 border border-[#8b2942]/20">
                <p className="text-sm text-gray-700 mb-3">
                  ¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-medium">Preguntas frecuentes:</p>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputValue(question)
                      inputRef.current?.focus()
                    }}
                    className="w-full text-left text-sm p-3 rounded-lg bg-gray-50 hover:bg-[#8b2942]/5 border border-gray-200 hover:border-[#8b2942]/30 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                      message.role === "user"
                        ? "bg-gradient-to-br from-[#8b2942] to-[#c44569] text-white"
                        : "bg-gray-100 text-gray-800 border border-gray-200",
                    )}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3 border border-gray-200">
                    <Loader2 className="h-4 w-4 animate-spin text-[#8b2942]" />
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu pregunta..."
              disabled={isTyping}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8b2942]/50 focus:border-[#8b2942] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#8b2942] to-[#c44569] hover:from-[#6d1f33] hover:to-[#a33555] disabled:opacity-50"
              size="icon"
            >
              {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Respuestas automáticas • El Arte de Vivir</p>
        </form>
      </div>
    </>
  )
}
