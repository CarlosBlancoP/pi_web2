// src/app/login/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "@/components/ui/button"
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg p-6">
        {/* Header */}
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800 mb-2">
            Registro
          </CardTitle>
          <p className="text-center text-sm text-gray-500">
            Ingresa tus credenciales para continuar
          </p>
        </CardHeader>

        {/* Contenido */}
        <CardContent className="mt-6 space-y-8">
          <form className="space-y-8">
            {/* Email */}
            <div className="space-y-3">
              <Label htmlFor="name" className="text-base font-medium">
                Nombre completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                className="h-12"
                required
              />
              <Label htmlFor="email" className="text-base font-medium">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@correo.com"
                className="h-12"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-3">
              <Label htmlFor="password" className="text-base font-medium">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="h-12"
                required
              />
            </div>
                <div className="space-y-3">
              <Label htmlFor="password" className="text-base font-medium">
                Confirmar Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="h-12"
                required
              />
            </div>

            {/* Botón */}
            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg">
              Crear 
            </Button>
          </form>
          
        </CardContent>
      </Card>
    </div>
  )
}