"use client";

import { Suspense, useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const { register, customer } = useAuth();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const justRegistered = useRef(false);

  // Redirect when customer is present (already logged in, or just registered)
  useEffect(() => {
    if (customer) {
      if (justRegistered.current) {
        toast("Account created successfully! Welcome!", "success");
        justRegistered.current = false;
      }
      router.replace(redirectTo);
    }
  }, [customer, router, redirectTo, toast]);

  // Don't render form if already logged in
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

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const result = await register({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });

    if (result.error) {
      setError(result.error);
      toast(result.error, "error");
      setLoading(false);
    } else {
      // Mark that we just registered so the useEffect shows the toast
      justRegistered.current = true;
      // The useEffect watching `customer` will redirect
    }
  };

  return (
    <main>
      <div className="px-6 py-14 text-center">
        <h1 className="text-4xl font-black md:text-5xl">Create Account</h1>
      </div>
      <section className="mx-auto max-w-[440px] px-6 py-14">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="mb-1 block text-xs font-black uppercase tracking-widest text-gray-400"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none focus:border-white"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-1 block text-xs font-black uppercase tracking-widest text-gray-400"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none focus:border-white"
              />
            </div>
          </div>
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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none focus:border-white"
              placeholder="Min. 8 characters"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-2 w-full py-4"
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href={
              redirectTo !== "/account"
                ? `/login?redirect=${redirectTo}`
                : "/login"
            }
            className="font-black text-white underline"
          >
            Log In
          </Link>
        </p>
      </section>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[60vh] items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </main>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
