import type { Metadata } from "next";
import ProductGrid from "@/components/home/ProductGrid";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Buy Cards Against Humanity, expansion packs, and everything else.",
};

export default function ShopPage() {
  return (
    <main>
      <section className="px-6 py-24 text-center">
        <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.05]">
          The Store.
        </h1>
        <p className="mt-3 text-gray-400">
          All the games and packs you need for game night.
        </p>
      </section>
      <ProductGrid />
    </main>
  );
}