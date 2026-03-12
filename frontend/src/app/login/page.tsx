"use client";

import { Suspense, useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/account";
  const { login, customer } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const justLoggedIn = useRef(false);

  // Redirect when customer is present
  useEffect(() => {
    if (customer) {
      if (justLoggedIn.current) {
        toast("Logged in successfully!", "success");
        justLoggedIn.current = false;
      }
      router.replace(redirectTo);
    }
  }, [customer, router, redirectTo, toast]);

  // Show "redirecting" if already logged in
  if (customer) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-400">Redirecting...</p>
      </main>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    if (result.error) {
      setError(result.error);
      toast(result.error, "error");
      setLoading(false);
    } else {
      justLoggedIn.current = true;
      // The useEffect watching `customer` will redirect
    }
  };

  return (
    <main>
      <div className="px-6 py-14 text-center">
        <h1 className="text-4xl font-black md:text-5xl">Log In</h1>
      </div>
      <section className="mx-auto max-w-[440px] px-6 py-14">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-black uppercase tracking-widest text-gray-400"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none focus:border-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-black uppercase tracking-widest text-gray-400"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none focus:border-white"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-2 w-full py-4"
          >
            {loading ? "LOGGING IN..." : "LOG IN"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href={
              redirectTo !== "/account"
                ? `/register?redirect=${redirectTo}`
                : "/register"
            }
            className="font-black text-white underline"
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[60vh] items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
