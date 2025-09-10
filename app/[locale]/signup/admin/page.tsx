"use client"

import { useState } from "react"
import { Button } from "../../../../components/Button"
import { Input } from "../../../../components/Input"
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react"
import { useParams } from "next/navigation"
import { useTranslations } from 'next-intl'

// Import test utility
import '../../../../lib/test-registration'

export default function AdminSignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [useCorsProxy, setUseCorsProxy] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('adminSignup')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setIsSubmitting(true)
    
    try {
      console.log('Testing registration with payload:', {
        email: formData.email,
        password: formData.password
      })

      // Choose URL based on CORS proxy setting
      const baseUrl = useCorsProxy 
        ? 'https://cors-anywhere.herokuapp.com/https://nativeapi-h8e7h4cgc6gpgbea.northeurope-01.azurewebsites.net'
        : 'https://nativeapi-h8e7h4cgc6gpgbea.northeurope-01.azurewebsites.net'

      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(useCorsProxy && { 'X-Requested-With': 'XMLHttpRequest' })
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        
        // Try to parse as JSON for better error message
        try {
          const errorJson = JSON.parse(errorText)
          setError(`Registration failed: ${errorJson.message || errorText}`)
        } catch {
          setError(`Registration failed: ${response.status} - ${errorText}`)
        }
        return
      }

      const data = await response.json()
      console.log('Registration successful:', data)
      setSuccess('Registration successful! Check console for full response details.')
      
      // Clear form on success
      setFormData({
        email: "",
        password: "",
        confirmPassword: ""
      })
      
    } catch (error) {
      console.error('Registration error:', error)
      if (error instanceof Error && error.message.includes('CORS')) {
        setError('CORS Error: Backend needs to allow requests from localhost:3000. Try enabling CORS proxy below.')
      } else {
        setError(error instanceof Error ? error.message : 'Registration failed')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-600 mt-2">{t('subtitle')}</p>
          <p className="text-sm text-gray-500 mt-1">{t('endpoint')}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* CORS Proxy Toggle */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={useCorsProxy}
                onChange={(e) => setUseCorsProxy(e.target.checked)}
                className="rounded"
              />
              <span>{t('useCorsProxy')}</span>
            </label>
            <p className="text-xs text-blue-600 mt-1">
              {t('corsNote')}{" "}
              <a href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank" rel="noopener noreferrer" className="underline ml-1">
                {t('corsDemo')}
              </a> first to enable the proxy.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Create a password (min 6 characters)"
                  className="pl-10 pr-10"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('testingRegistration') : t('testRegistration')}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              <a href={`/${locale}/signup`} className="font-medium text-teal-600 hover:text-teal-700">
                {t('backToSignup')}
              </a>
            </p>
            <p className="text-xs text-gray-500">
              {t('description')}
            </p>
            <p className="text-xs text-blue-600">
              {t('consoleNote')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
