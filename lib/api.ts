const API_BASE_URL = 'http://localhost:3000/api' // Force local API routes

// Updated interfaces to match the new Eglo API
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

// Signup request - only email and password required
export interface SignupRequest {
  email: string
  password: string
}

// Updated response interface to match API response
export interface EgloApiResponse {
  success: boolean
  message: string
  token?: string
  user?: {
    email: string
    userId: string
    roles?: string[]
  }
  errors?: string[]
}

// Convert Eglo API response to our internal AuthResponse format
export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    phone?: string
    roles?: string[]  
  }
  expiresIn?: number
}

export class ApiError extends Error {
  status: number
  details?: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

// Remove all CORS proxy logic and use local API routes
class ApiService {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    console.log('🔍 API_BASE_URL:', this.baseURL)
    console.log('🔍 endpoint:', endpoint)
    console.log('🔍 Full URL:', url)
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = this.getToken()
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.log('🔍 API Error Response:', errorData)
        console.log('🔍 Response Status:', response.status)
        throw new ApiError(
          errorData.message || `HTTP error! status: ${response.status}`,
          response.status,
          errorData
        )
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'An unknown error occurred',
        0,
        error
      )
    }
  }

  // Convert Eglo API response to our internal format
  private convertToAuthResponse(egloResponse: EgloApiResponse): AuthResponse {
    if (!egloResponse.success || !egloResponse.token || !egloResponse.user) {
      throw new ApiError(
        egloResponse.message || 'Authentication failed',
        400,
        egloResponse.errors
      )
    }

    return {
      token: egloResponse.token,
      user: {
        id: egloResponse.user.userId,
        email: egloResponse.user.email,
        firstName: '', // Not provided by API
        lastName: '', // Not provided by API
        phone: '', // Not provided by API
        roles: egloResponse.user.roles, // Add roles here
      },
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const egloResponse = await this.request<EgloApiResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })

    return this.convertToAuthResponse(egloResponse)
  }

  async signup(userData: SignupRequest): Promise<{ success: boolean; message: string }> {
    const requestBody = {
      email: userData.email,
      password: userData.password,
    }
    
    console.log('🔍 Signup Request Body:', requestBody)
    
    const egloResponse = await this.request<EgloApiResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })

    if (!egloResponse.success) {
      throw new ApiError(
        egloResponse.message || 'Signup failed',
        400,
        egloResponse.errors
      )
    }

    return {
      success: egloResponse.success,
      message: egloResponse.message
    }
  }

  async logout(): Promise<void> {
    // For now, just clear the local token since the API doesn't have a logout endpoint
    this.removeToken()
  }

  async refreshToken(): Promise<AuthResponse> {
    // For now, throw an error since the API doesn't have a refresh endpoint
    throw new ApiError('Token refresh not implemented', 501)
  }

  // Token management
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

// Export a singleton instance
export const apiService = new ApiService()

// Export the class for testing or custom instances
export { ApiService }
