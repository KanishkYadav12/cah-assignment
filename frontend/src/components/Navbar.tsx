"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <nav className="sticky top-0 z-50 border-b border-black bg-white">
      <div className="mx-auto flex h-[60px] max-w-[1200px] items-center justify-between px-5">
        <Link href="/">
          <Image
            src="https://www.cardsagainsthumanity.com/images/logo-header.svg"
            alt="Cards Against Humanity"
            width={200}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/shop"
            className="text-sm font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-60"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-sm font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-60"
          >
            About
          </Link>
          <button
            onClick={openCart}
            className="cursor-pointer text-sm font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-60"
          >
            {totalItems} Cart
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-[5px] md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[2px] w-6 bg-black transition-transform duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[2px] w-6 bg-black transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-[2px] w-6 bg-black transition-transform duration-200 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-black bg-white md:hidden">
          <div className="flex flex-col px-5 py-4">
            <Link
              href="/shop"
              className="py-3 text-sm font-bold uppercase tracking-wider text-black"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="py-3 text-sm font-bold uppercase tracking-wider text-black"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                openCart();
              }}
              className="py-3 text-left text-sm font-bold uppercase tracking-wider text-black"
            >
              {totalItems} Cart
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
