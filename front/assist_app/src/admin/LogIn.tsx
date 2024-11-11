'use client'

import React, { useState } from "react"
import { User, AlertCircle, ChevronDown, Search, Menu, Bell, Mail, Lock, LogIn } from "lucide-react"
import { Button } from "../../@/components/ui/button"
import { Input } from "../../@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../@/components/ui/card"
import { useNavigate } from "react-router-dom";

interface LoginCredentials {
  email: string
  password: string
}

export default function EnhancedLoginComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  })

  const handleNewStudent = () => {
    navigate("/");
  };
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault()
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // if (!emailRegex.test(formData.email)) {
    //   setError("Por favor, ingrese un correo electrónico válido.")
    //   return
    // }
    // if (!formData.email || !formData.password) {
    //   setError("Por favor, complete todos los campos.")
    //   return
    // }
    // try {
    //   // Simulating API call
    //   await new Promise((resolve) => setTimeout(resolve, 1000))
    //   console.log("Inicio de sesión exitoso:", formData)
    //   setFormData({ email: "", password: "" })
    //   setError(null)
    //   alert("Inicio de sesión exitoso!")
    // } catch (error) {
    //   setError("Error al iniciar sesión. Intente nuevamente.")
    //   console.error("Error:", error)
    // }
    handleNewStudent();
    
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <header className="bg-white shadow-md text-primary p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Menu className="mr-4 text-primary hover:text-primary/80 cursor-pointer" />
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Gestión Educativa
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="text-primary hover:text-primary/80 cursor-pointer" />
          <Bell className="text-primary hover:text-primary/80 cursor-pointer" />
          <User className="text-primary hover:text-primary/80 cursor-pointer" />
          <ChevronDown className="text-primary hover:text-primary/80 cursor-pointer" />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    // type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="nombre@ejemplo.com"
                    // required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="••••••••"
                    // required
                  />
                </div>
              </div>
              {error && (
                <div className="text-red-600 flex items-center bg-red-50 p-3 rounded-md">
                  <AlertCircle className="mr-2 flex-shrink-0" size={16} />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
              </Button>
            </form>
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm">
          &copy; 2024 ITEC 3° año Analista y Programador de Sistemas. Todos los
          derechos reservados.
        </p>
      </footer>
    </div>
  )
}