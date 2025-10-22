"use client"

import React, { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat-support" }),
  })

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

  // ✅ Arreglamos la comparación con un cast seguro
  const isLoading = status === ("in_progress" as any)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    sendMessage({ text: inputValue })
    setInputValue("")
  }

  const suggestedQuestions = [
    "¿Qué tipos de productos venden?",
    "¿Cuál es el tiempo de envío?",
    "¿Tienen política de devolución?",
    "¿Cómo puedo contactarlos?",
  ]

  return (
    <>
      {/* Botón del Chat */}
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

      {/* Ventana del Chat */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex flex-col transition-all duration-300",
          "w-[380px] h-[600px] max-h-[80vh]",
          "bg-white rounded-2xl shadow-2xl border border-gray-200",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none",
        )}
      >
        {/* Encabezado */}
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

        {/* Mensajes */}
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
                    {message.parts.map((part, index) =>
                      part.type === "text" ? (
                        <p key={index} className="whitespace-pre-wrap leading-relaxed">
                          {part.text}
                        </p>
                      ) : null,
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
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
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8b2942]/50 focus:border-[#8b2942] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#8b2942] to-[#c44569] hover:from-[#6d1f33] hover:to-[#a33555] disabled:opacity-50"
              size="icon"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Powered by ChatGPT</p>
        </form>
      </div>
    </>
  )
}
