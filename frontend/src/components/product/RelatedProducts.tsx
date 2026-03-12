"use client";

import ProductCard from "@/components/home/ProductCard";
import { getRelatedProducts } from "@/data/products";
import type { Product } from "@/types";

export default function RelatedProducts({
  currentSlug,
  limit = 3,
}: {
  currentSlug: string;
  limit?: number;
}) {
  const related = getRelatedProducts(currentSlug, limit);
  if (related.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-700 pt-12">
      <h2 className="mb-8 text-2xl font-black">You might also like</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
