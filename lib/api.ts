// lib/api.ts

// ---------------------------------------------------------------------------
// Base URL (prod defaults to your Azure API, overridable via env)
// Keep `/api` because your endpoints are like "/auth/login" → "/api/auth/login"
// ---------------------------------------------------------------------------
const DEFAULT_API_BASE =
  'https://nativeapi-h8e7h4cgc6gpgbea.northeurope-01.azurewebsites.net/api';

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === 'production' ? DEFAULT_API_BASE : 'http://localhost:3000/api')
).replace(/\/$/, ''); // strip trailing slash

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface EgloApiResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    email: string;
    userId: string;
    roles?: string[];
  };
  errors?: string[];
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    roles?: string[];
  };
  expiresIn?: number;
}

// A very light JSON-ish type (no "any")
type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

// Shape we *optionally* expect from error bodies
type ApiErrorPayload = {
  message?: string;
} & Record<string, Json>;

// ---------------------------------------------------------------------------
// Error
// ---------------------------------------------------------------------------
export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

// ------------------------------ Type guards ---------------------------------
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function hasStringMessage(value: unknown): value is { message: string } {
  return (
    isRecord(value) &&
    'message' in value &&
    typeof (value as Record<string, unknown>).message === 'string'
  );
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------
class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private buildUrl(endpoint: string) {
    const ep = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.baseURL}${ep}`;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = this.buildUrl(endpoint);

    if (process.env.NODE_ENV !== 'production') {
      console.log('🔍 API_BASE_URL:', this.baseURL);
      console.log('🔍 endpoint:', endpoint);
      console.log('🔍 Full URL:', url);
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    // Add auth token if available
    const token = this.getToken();
    if (token) {
      (headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = { ...options, headers };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        // Parse error body safely, without "any"
        let rawError: unknown = {};
        try {
          rawError = await response.json();
        } catch {
          // leave rawError as {}
        }

        const errorData: ApiErrorPayload | Record<string, unknown> = isRecord(rawError)
          ? (rawError as ApiErrorPayload)
          : {};

        const message = hasStringMessage(rawError)
          ? rawError.message
          : `HTTP error! status: ${response.status}`;

        if (process.env.NODE_ENV !== 'production') {
          console.log('🔍 API Error Response:', errorData);
          console.log('🔍 Response Status:', response.status);
        }

        throw new ApiError(message, response.status, errorData);
      }

      // Successful JSON response
      const parsed: unknown = await response.json();
      return parsed as T;
    } catch (error: unknown) {
      if (error instanceof ApiError) throw error;

      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      throw new ApiError(message, 0, error);
    }
  }

  // Convert Eglo API response to our internal format
  private convertToAuthResponse(egloResponse: EgloApiResponse): AuthResponse {
    if (!egloResponse.success || !egloResponse.token || !egloResponse.user) {
      throw new ApiError(
        egloResponse.message || 'Authentication failed',
        400,
        egloResponse.errors
      );
    }

    return {
      token: egloResponse.token,
      user: {
        id: egloResponse.user.userId,
        email: egloResponse.user.email,
        firstName: '', // Not provided by API
        lastName: '',  // Not provided by API
        phone: '',     // Not provided by API
        roles: egloResponse.user.roles,
      },
    };
  }

  // ------------------------- Public endpoints --------------------------------

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const egloResponse = await this.request<EgloApiResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    return this.convertToAuthResponse(egloResponse);
  }

  async signup(userData: SignupRequest): Promise<{ success: boolean; message: string }> {
    const egloResponse = await this.request<EgloApiResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });

    if (!egloResponse.success) {
      throw new ApiError(egloResponse.message || 'Signup failed', 400, egloResponse.errors);
    }

    return { success: egloResponse.success, message: egloResponse.message };
  }

  async logout(): Promise<void> {
    // No API logout endpoint; clear local token
    this.removeToken();
  }

  async refreshToken(): Promise<AuthResponse> {
    throw new ApiError('Token refresh not implemented', 501);
  }

  // --------------------------- Token helpers ---------------------------------

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
export const apiService = new ApiService();

// Usage example (uncomment to use):
// apiService.login({ email: '