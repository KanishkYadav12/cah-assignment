"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { totalItems, openCart } = useCart();
  const { customer } = useAuth();
  const [shopOpen, setShopOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) setShopOpen(false);
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-[60px] items-center justify-between bg-black px-6 md:px-10">
      <Link href="/" className="text-base font-black tracking-tight text-white md:text-lg">
        Cards Against Humanity
      </Link>
      <nav className="flex items-center gap-6 text-[17px] font-black text-white md:gap-8">
        {/* Shop dropdown */}
        <div ref={shopRef} className="relative hidden sm:block">
          <button
            onClick={() => { setShopOpen(!shopOpen); setAboutOpen(false); }}
            className="flex items-center gap-1 bg-transparent text-[17px] font-black text-white"
          >
            Shop
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`mt-0.5 transition-transform ${shopOpen ? "rotate-180" : ""}`}>
              <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {shopOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white p-3 shadow-lg">
              <Link href="/shop" className="block px-3 py-2 text-sm font-bold text-black hover:bg-gray-100" onClick={() => setShopOpen(false)}>All Products</Link>
              <Link href="/products/cards-against-humanity" className="block px-3 py-2 text-sm font-bold text-black hover:bg-gray-100" onClick={() => setShopOpen(false)}>Cards Against Humanity</Link>
              <Link href="/products/family-edition" className="block px-3 py-2 text-sm font-bold text-black hover:bg-gray-100" onClick={() => setShopOpen(false)}>Family Edition</Link>
              <Link href="/products/more-cah" className="block px-3 py-2 text-sm font-bold text-black hover:bg-gray-100" onClick={() => setShopOpen(false)}>More CAH</Link>
            </div>
          )}
        </div>

        {/* About dropdown */}
        <div ref={aboutRef} className="relative hidden sm:block">
          <button
            onClick={() => { setAboutOpen(!aboutOpen); setShopOpen(false); }}
            className="flex items-center gap-1 bg-transparent text-[17px] font-black text-white"
          >
            About
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`mt-0.5 transition-transform ${aboutOpen ? "rotate-180" : ""}`}>
              <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {aboutOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white p-3 shadow-lg">
              <Link href="/about" className="block px-3 py-2 text-sm font-bold text-black hover:bg-gray-100" onClick={() => setAboutOpen(false)}>About Us</Link>
              <Link href={customer ? "/account" : "/login"} className="block px-3 py-2 text-sm font-bold text-black hover:bg-gray-100" onClick={() => setAboutOpen(false)}>{customer ? "Account" : "Login"}</Link>
            </div>
          )}
        </div>

        {/* Cart */}
        <button
          onClick={openCart}
          className="flex items-center gap-0.5 bg-transparent text-[17px] font-black text-white"
        >
          \{totalItems > 0 ? totalItems : ""}/
        </button>
      </nav>
    </header>
  );
}
