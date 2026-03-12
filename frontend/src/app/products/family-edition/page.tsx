import type { Metadata } from "next";
import { getProductBySlug } from "@/data/products";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";

export const metadata: Metadata = {
  title: "Family Edition",
  description:
    "Cards Against Humanity: Family Edition is a whole new game that's just as funny as the original, but written for kids and adults to play together.",
};

export default function FamilyEditionPage() {
  const product = getProductBySlug("family-edition");
  if (!product) return null;

  return (
    <main className="mx-auto max-w-[1400px] px-6 py-12">
      <ProductInfo product={product} />
      <RelatedProducts currentSlug="family-edition" />
    </main>
  );
}
