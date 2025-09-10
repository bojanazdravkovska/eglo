"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { apiService, AuthResponse, LoginRequest, SignupRequest, ApiError } from './api'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })
  
  const router = useRouter()

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = apiService.getToken()
        if (token) {
          // You might want to validate the token with the backend here
          // For now, we'll assume it's valid if it exists
          setAuthState(prev => ({
            ...prev,
            isAuthenticated: true,
            isLoading: false,
          }))
        } else {
          setAuthState(prev => ({
            ...prev,
            isAuthenticated: false,
            isLoading: false,
          }))
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to initialize authentication',
        }))
      }
    }

    initAuth()
  }, [])

  const login = useCallback(async (credentials: LoginRequest) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response: AuthResponse = await apiService.login(credentials)
      
      // Store the token
      apiService.setToken(response.token)
      
      setAuthState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      // Redirect to home page or intended destination
      router.push('/')
      
      return response
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Login failed. Please try again.'
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      
      throw error
    }
  }, [router])

  const signup = useCallback(async (userData: SignupRequest) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response: AuthResponse = await apiService.signup(userData)
      
      // Store the token
      apiService.setToken(response.token)
      
      setAuthState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      // Redirect to home page
      router.push('/')
      
      return response
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Signup failed. Please try again.'
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      
      throw error
    }
  }, [router])

  const logout = useCallback(async () => {
    try {
      await apiService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local state regardless of API call success
      apiService.removeToken()
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
      
      // Redirect to login page
      router.push('/login')
    }
  }, [router])

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...authState,
    login,
    signup,
    logout,
    clearError,
  }
}
