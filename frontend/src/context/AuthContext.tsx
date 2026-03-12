"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

const MEDUSA_PROXY = "/api/medusa";
const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
  "pk_76962c41b90bef91da9bea018054c4b5e6bd5744e64dc75b0cc3f6149f9345d8";

const MEDUSA_HEADERS = {
  "Content-Type": "application/json",
  "x-publishable-api-key": PUBLISHABLE_KEY,
};

export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthContextType {
  customer: Customer | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "cah-auth-token";
const CUSTOMER_KEY = "cah-customer";
const TOKEN_EXPIRY_KEY = "cah-auth-expiry";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function isSessionExpired(): boolean {
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiry) return true;
  return Date.now() > Number(expiry);
}

function clearAuthStorage() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CUSTOMER_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
}

function setAuthStorage(token: string, customer: Customer) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
  localStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + SESSION_DURATION_MS));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedCustomer = localStorage.getItem(CUSTOMER_KEY);
    if (savedToken && savedCustomer && !isSessionExpired()) {
      try {
        setToken(savedToken);
        setCustomer(JSON.parse(savedCustomer));
      } catch {
        clearAuthStorage();
      }
    } else {
      // Session expired or missing — clear stale data
      clearAuthStorage();
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{ error?: string }> => {
      try {
        // Authenticate with Medusa
        let authRes: Response;
        try {
          authRes = await fetch(
            `${MEDUSA_PROXY}/auth/customer/emailpass`,
            {
              method: "POST",
              headers: MEDUSA_HEADERS,
              body: JSON.stringify({ email, password }),
            }
          );
        } catch (fetchErr) {
          console.error("Auth login fetch failed:", fetchErr);
          return {
            error:
              "Cannot reach the server. It may be starting up — please wait a moment and try again.",
          };
        }

        if (!authRes.ok) {
          const errData = await authRes.json().catch(() => null);
          return {
            error: errData?.message || "Invalid email or password",
          };
        }

        const authData = await authRes.json();
        const authToken = authData.token;

        // Fetch customer profile
        let customerRes: Response;
        try {
          customerRes = await fetch(`${MEDUSA_PROXY}/store/customers/me`, {
            headers: {
              ...MEDUSA_HEADERS,
              Authorization: `Bearer ${authToken}`,
            },
          });
        } catch (fetchErr) {
          console.error("Customer profile fetch failed:", fetchErr);
          return {
            error:
              "Cannot reach the server. It may be starting up — please wait a moment and try again.",
          };
        }

        if (!customerRes.ok) {
          return { error: "Failed to fetch customer profile" };
        }

        const customerData = await customerRes.json();
        const cust = customerData.customer;

        setToken(authToken);
        setCustomer(cust);
        setAuthStorage(authToken, cust);

        return {};
      } catch (err) {
        console.error("Login unexpected error:", err);
        return { error: "An unexpected error occurred. Please try again." };
      }
    },
    []
  );

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
    }): Promise<{ error?: string }> => {
      try {
        // First create actor (auth identity)
        let authRes: Response;
        try {
          authRes = await fetch(
            `${MEDUSA_PROXY}/auth/customer/emailpass/register`,
            {
              method: "POST",
              headers: MEDUSA_HEADERS,
              body: JSON.stringify({
                email: data.email,
                password: data.password,
              }),
            }
          );
        } catch (fetchErr) {
          console.error("Auth register fetch failed:", fetchErr);
          return {
            error:
              "Cannot reach the server. It may be starting up — please wait a moment and try again.",
          };
        }

        if (!authRes.ok) {
          const errData = await authRes.json().catch(() => null);
          return {
            error:
              errData?.message ||
              "Registration failed. Email may already be in use.",
          };
        }

        const authData = await authRes.json();
        const authToken = authData.token;

        // Create customer record
        let customerRes: Response;
        try {
          customerRes = await fetch(`${MEDUSA_PROXY}/store/customers`, {
            method: "POST",
            headers: {
              ...MEDUSA_HEADERS,
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
            }),
          });
        } catch (fetchErr) {
          console.error("Customer create fetch failed:", fetchErr);
          return {
            error:
              "Cannot reach the server. It may be starting up — please wait a moment and try again.",
          };
        }

        if (!customerRes.ok) {
          const errData = await customerRes.json().catch(() => null);
          return {
            error: errData?.message || "Failed to create customer profile",
          };
        }

        const customerData = await customerRes.json();
        const cust = customerData.customer;

        setToken(authToken);
        setCustomer(cust);
        setAuthStorage(authToken, cust);

        return {};
      } catch (err) {
        console.error("Register unexpected error:", err);
        return { error: "An unexpected error occurred. Please try again." };
      }
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setCustomer(null);
    clearAuthStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{ customer, token, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
