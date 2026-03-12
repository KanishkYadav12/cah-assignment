"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";
import { getFeaturedProducts, products } from "@/data/products";
import type { Product } from "@/types";

export default function ProductGrid({ cmsProducts }: { cmsProducts?: Product[] }) {
  const items = cmsProducts && cmsProducts.length > 0 ? cmsProducts : getFeaturedProducts();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="bg-black pb-8 pt-12">
      {/* Heading row */}
      <div className="flex items-end justify-between px-6 pb-8 md:px-10">
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-none text-white">
          Buy the game.
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition hover:bg-white hover:text-black"
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition hover:bg-white hover:text-black"
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div ref={scrollRef} className="carousel-container flex gap-4 px-6 md:px-10">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
