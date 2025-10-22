import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const systemPrompt = `Eres un asistente virtual amable y profesional de "El Arte de Vivir", una tienda en línea especializada en productos de arte, perfumes y artesanías. 

Tu objetivo es ayudar a los usuarios con:
- Información sobre productos (arte, perfumes, artesanías)
- Preguntas sobre envíos y entregas
- Políticas de devolución y garantías
- Navegación del sitio web
- Recomendaciones de productos
- Información de contacto y horarios

Responde de manera clara, concisa y amigable. Si no sabes algo específico, ofrece alternativas útiles o sugiere contactar al equipo de soporte.`

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages,
    maxOutputTokens: 500,
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse()
}
