"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const bgColor = product.bgColor || "#B5E5F5";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex-shrink-0 overflow-hidden rounded-xl"
      style={{ width: "min(80vw, 380px)" }}
    >
      <div
        className="flex h-[520px] flex-col justify-between p-6 md:h-[600px]"
        style={{ backgroundColor: bgColor }}
      >
        {/* Product image */}
        <div className="relative mx-auto h-[55%] w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Bottom text */}
        <div>
          <h3 className="mb-2 text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight text-black">
            {product.tagline}
          </h3>
          <span className="btn-red mt-3 inline-block">
            {product.ctaLabel || "Buy Now"}
          </span>
        </div>
      </div>
    </Link>
  );
}
