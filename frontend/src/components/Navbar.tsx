"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { customer } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-black">
      <div className="mx-auto flex h-[56px] max-w-[1200px] items-center justify-between px-5 md:h-[60px]">
        <Link href="/" className="shrink-0">
          <Image
            src="https://www.cardsagainsthumanity.com/images/logo-header.svg"
            alt="Cards Against Humanity"
            width={200}
            height={30}
            priority
            className="h-[24px] w-auto md:h-[28px]"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          <Link
            href="/shop"
            className="text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:text-white/80"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:text-white/80"
          >
            About
          </Link>
          <Link
            href={customer ? "/account" : "/login"}
            className="text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:text-white/80"
          >
            {customer ? "Account" : "Login"}
          </Link>
          <button
            onClick={openCart}
            className="relative flex items-center text-white transition-colors hover:text-white/80"
            aria-label="Open cart"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-[6px] -top-[6px] flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#FF0000] text-[9px] font-bold leading-none text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={openCart}
            className="relative flex items-center text-white"
            aria-label="Open cart"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-[6px] -top-[6px] flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#FF0000] text-[9px] font-bold leading-none text-white">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="flex flex-col gap-[5px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[2px] w-[22px] bg-white transition-transform duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[2px] w-[22px] bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[2px] w-[22px] bg-white transition-transform duration-200 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <div className="flex flex-col px-5 py-3">
            <Link
              href="/shop"
              className="py-3 text-[13px] font-bold uppercase tracking-[0.1em] text-white/90"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="py-3 text-[13px] font-bold uppercase tracking-[0.1em] text-white/90"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href={customer ? "/account" : "/login"}
              className="py-3 text-[13px] font-bold uppercase tracking-[0.1em] text-white/90"
              onClick={() => setMenuOpen(false)}
            >
              {customer ? "Account" : "Login"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
