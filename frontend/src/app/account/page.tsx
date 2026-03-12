"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function AccountPage() {
  const router = useRouter();
  const { customer, isLoading, logout } = useAuth();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !customer) {
      router.replace("/login");
    }
  }, [isLoading, customer, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  if (!customer) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-400">Redirecting to login...</p>
      </main>
    );
  }

  return (
    <main>
      <div className="px-6 py-14 text-center">
        <h1 className="text-4xl font-black md:text-5xl">My Account</h1>
      </div>
      <section className="mx-auto max-w-[600px] px-6 py-14">
        <div className="mb-8 rounded-lg border border-gray-700 bg-gray-900 p-6">
          <h2 className="mb-4 text-lg font-black">Profile</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <p>
              <span className="font-black text-white">Name:</span>{" "}
              {customer.first_name} {customer.last_name}
            </p>
            <p>
              <span className="font-black text-white">Email:</span>{" "}
              {customer.email}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            logout();
            toast("Logged out successfully", "success");
            router.push("/");
          }}
          className="btn-outline w-full py-3"
        >
          LOG OUT
        </button>
      </section>
    </main>
  );
}
