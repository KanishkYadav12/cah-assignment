"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

export default function ProductInfo({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      {/* Images */}
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
          <Image
            src={product.images[activeImage]}
            alt={product.name}
            fill
            className="object-contain p-6"
          />
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative h-16 w-16 overflow-hidden rounded-lg border ${
                  i === activeImage ? "border-white" : "border-gray-700"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  fill
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <h1 className="mb-2 text-3xl font-black md:text-4xl">
          {product.name}
        </h1>
        <p className="mb-4 text-gray-400">{product.tagline}</p>
        <p className="mb-6 text-3xl font-black">${product.price}</p>

        <p className="mb-6 leading-relaxed text-gray-400">
          {product.description}
        </p>

        {product.bullets.length > 0 && (
          <ul className="mb-6 list-inside list-disc space-y-1 text-sm text-gray-400">
            {product.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex overflow-hidden rounded-full border border-gray-700">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-transparent px-3 py-2 text-lg font-black hover:bg-gray-800"
            >
              −
            </button>
            <span className="flex w-10 items-center justify-center border-x border-gray-700 text-sm font-black">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-transparent px-3 py-2 text-lg font-black hover:bg-gray-800"
            >
              +
            </button>
          </div>
          <button
            onClick={() => {
              for (let i = 0; i < quantity; i++) {
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0],
                });
              }
            }}
            className="btn-red flex-1 py-3"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
