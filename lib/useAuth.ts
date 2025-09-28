"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  apiService,
  AuthResponse,
  LoginRequest,
  SignupRequest,
  ApiError,
} from "./api";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  roles?: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Helper: decode JWT
const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const router = useRouter();
  const { locale } = useParams() as { locale: string }; // ✅ get locale from URL

  // Init auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = apiService.getToken();
        console.log("🔍 Token found:", token ? "Yes" : "No");

        if (token) {
          const decoded = decodeJWT(token);
          console.log("🔍 Decoded JWT:", decoded);

          if (decoded) {
            setAuthState((prev) => ({
              ...prev,
              isAuthenticated: true,
              isLoading: false,
              user: {
                id: decoded.sub || "unknown",
                email: decoded.sub || "unknown@example.com",
                firstName: "",
                lastName: "",
                phone: "",
                roles: [],
              },
            }));
          } else {
            console.log("❌ Invalid token, clearing...");
            apiService.removeToken();
            setAuthState((prev) => ({
              ...prev,
              isAuthenticated: false,
              isLoading: false,
            }));
          }
        } else {
          console.log("❌ No token found");
          setAuthState((prev) => ({
            ...prev,
            isAuthenticated: false,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        setAuthState((prev) => ({
          ...prev,
          isAuthenticated: false,
          isLoading: false,
          error: "Failed to initialize authentication",
        }));
      }
    };

    initAuth();
  }, []);

  // Login
  const login = useCallback(
    async (credentials: LoginRequest) => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response: AuthResponse = await apiService.login(credentials);
        apiService.setToken(response.token);

        setAuthState({
          user: response.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        // ✅ Redirect with locale
        router.push(`/${locale}`);
        return response;
      } catch (error) {
        const errorMessage =
          error instanceof ApiError
            ? error.message
            : "Login failed. Please try again.";

        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));

        throw error;
      }
    },
    [router, locale]
  );

  // Signup
  const signup = useCallback(
    async (userData: SignupRequest) => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await apiService.signup(userData);
        // Don't automatically log in the user after signup
        // Don't set token or update auth state

        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: null,
        }));

        // Redirect to login page instead of home page
        console.log('Signup successful, redirecting to login page:', `/${locale}/login`);
        router.push(`/${locale}/login`);
        return response;
      } catch (error) {
        const errorMessage =
          error instanceof ApiError
            ? error.message
            : "Signup failed. Please try again.";

        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));

        throw error;
      }
    },
    [router, locale]
  );

  // Logout
  const logout = useCallback(async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      apiService.removeToken();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      router.push(`/${locale}/login`);
    }
  }, [router, locale]);

  const clearError = useCallback(() => {
    setAuthState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...authState,
    login,
    signup,
    logout,
    clearError,
  };
}
