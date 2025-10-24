"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"

export default function CheckoutPage() {
  const [method, setMethod] = useState("card")

  const total = 550000 // simulado

  return (
    <div className="flex justify-center p-6">
      <div className="w-full md:w-[60%] bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Título */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Pasarela de Pago</h2>

        {/* Datos del comprador */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Datos del comprador</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input id="nombre" placeholder="Ej: Juan Pérez" />
            </div>
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="ejemplo@email.com" />
            </div>
            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" type="tel" placeholder="+57 300 123 4567" />
            </div>
            <div>
              <Label htmlFor="direccion">Dirección</Label>
              <Input id="direccion" placeholder="Calle 123 #45-67" />
            </div>
          </div>
        </div>

        {/* Métodos de pago */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Método de pago</h3>
          <RadioGroup value={method} onValueChange={setMethod} className="space-y-3">
            <div className="flex items-center space-x-3 border p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="cursor-pointer">Tarjeta de crédito / débito</Label>
            </div>
            <div className="flex items-center space-x-3 border p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="pse" id="pse" />
              <Label htmlFor="pse" className="cursor-pointer">PSE / Transferencia bancaria</Label>
            </div>
            <div className="flex items-center space-x-3 border p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Resumen del pedido */}
        <div className="mb-8 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Resumen del pedido</h3>
          <div className="flex justify-between text-lg mb-2">
            <span>Perfume Artesanal (x1)</span>
            <span>$120.000</span>
          </div>
          <div className="flex justify-between text-lg mb-2">
            <span>Pintura en óleo (x2)</span>
            <span>$700.000</span>
          </div>
          <div className="flex justify-between text-lg font-bold mt-4 border-t pt-3">
            <span>Total a pagar</span>
            <span className="text-blue-600">${total.toLocaleString()}</span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between gap-4">
          <Button variant="outline" className="px-6 py-2 rounded-xl">
            Volver al carrito
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md">
            Pagar ahora
          </Button>
        </div>
      </div>
    </div>
  )
}

