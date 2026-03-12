"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface Product {
  id?: string;
  name?: string;
  slug?: string;
  tagline?: string;
  buttonText?: string;
  buttonLink?: string;
  price?: number;
  images?: { imageUrl: string; alt?: string }[];
  medusaVariantId?: string;
}

const fallbackProducts: Product[] = [
  {
    id: "cards-against-humanity",
    slug: "cards-against-humanity",
    images: [
      { imageUrl: "https://img.cah.io/images/vc07edlh/production/69d14a8c4c8084841b5f3437eb8a06124162dc0d-660x1270.png" },
    ],
    tagline: "America's #1 gerbil coffin.",
    buttonText: "BUY NOW",
    buttonLink: "/products/more-cah",
    name: "Cards Against Humanity",
    price: 29,
  },
  {
    id: "family-edition",
    slug: "family-edition",
    images: [
      { imageUrl: "https://img.cah.io/images/vc07edlh/production/048109f3bcd6e2c21cb041f9e5d0ddeac9c3de2f-716x1294.png" },
    ],
    tagline: "Play CAH with your kids.",
    buttonText: "BUY FAMILY EDITION",
    name: "Family Edition",
    price: 29,
  },
  {
    id: "more-cah",
    slug: "more-cah",
    images: [
      { imageUrl: "https://img.cah.io/images/vc07edlh/production/6122ebf50190e25b00cbfd9d7960671bf6a0c054-660x1200.png" },
    ],
    tagline: "Moooooore cards!",
    buttonText: "BUY EXPANSIONS",
    name: "More Cards Against Humanity",
    price: 20,
  },
  {
    id: "five-dollar-packs",
    slug: "five-dollar-packs",
    images: [
      { imageUrl: "https://img.cah.io/images/vc07edlh/production/41556c5c773ab42a27824ae1c8c73315653de2bf-660x1200.png" },
    ],
    tagline: "For whatever you're into.",
    buttonText: "BUY $5 PACKS",
    name: "$5 Packs",
    price: 5,
  },
];

function BuyButton({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id || product.slug || "product",
      name: product.name || product.tagline || "Product",
      price: product.price || 29,
      image: product.images?.[0]?.imageUrl || "",
      variantId: product.medusaVariantId,
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className="btn-red mt-auto block w-full py-4"
    >
      {added ? "ADDED!" : product.buttonText || "ADD TO CART"}
    </button>
  );
}

export default function BuySection({
  data,
  showHeading = true,
}: {
  data?: Product[];
  showHeading?: boolean;
}) {
  const products = data && data.length > 0 ? data : fallbackProducts;

  return (
    <section className="bg-white px-5 py-14 md:py-20">
      <div className="mx-auto max-w-[1000px]">
        {showHeading && (
          <h2 className="mb-12 text-[28px] font-extrabold leading-tight text-black md:mb-16 md:text-[42px]">
            Buy the game.
          </h2>
        )}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-x-16 md:gap-y-14">
          {products.map((product, idx) => (
            <div key={idx} className="flex flex-col">
              {/* Product Image(s) */}
              <div className="mb-5 flex items-end justify-center gap-1 px-4">
                {(product.images || []).map((img, i) => (
                  <Image
                    key={i}
                    src={img.imageUrl}
                    alt={img.alt || product.tagline || "Product"}
                    width={330}
                    height={600}
                    className="h-auto max-h-[340px] w-auto object-contain"
                    loading={idx < 2 ? "eager" : "lazy"}
                  />
                ))}
              </div>
              {/* Tagline */}
              <p className="mb-4 text-[16px] leading-snug text-black md:text-[17px]">
                {product.tagline}
              </p>
              {/* CTA Button */}
              <BuyButton product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}