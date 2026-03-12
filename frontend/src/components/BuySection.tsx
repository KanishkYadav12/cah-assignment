"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface Product {
  id?: string;
  name?: string;
  tagline?: string;
  buttonText?: string;
  buttonLink?: string;
  images?: { imageUrl: string; alt?: string }[];
}

const fallbackProducts = [
  {
    id: "cards-against-humanity",
    images: [{ imageUrl: "https://img.cah.io/images/vc07edlh/production/69d14a8c4c8084841b5f3437eb8a06124162dc0d-660x1270.png" }],
    tagline: "America's #1 gerbil coffin.",
    buttonText: "Buy Now",
    buttonLink: "/products/more-cah",
    name: "Cards Against Humanity",
    price: 29,
  },
  {
    id: "family-edition",
    images: [{ imageUrl: "https://img.cah.io/images/vc07edlh/production/048109f3bcd6e2c21cb041f9e5d0ddeac9c3de2f-716x1294.png" }],
    tagline: "Play CAH with your kids.",
    buttonText: "Buy Family Edition",
    buttonLink: "#",
    name: "Family Edition",
    price: 29,
  },
  {
    id: "more-cah",
    images: [{ imageUrl: "https://img.cah.io/images/vc07edlh/production/6122ebf50190e25b00cbfd9d7960671bf6a0c054-660x1200.png" }],
    tagline: "Moooooore cards!",
    buttonText: "Buy Expansions",
    buttonLink: "#",
    name: "More Cards Against Humanity",
    price: 20,
  },
  {
    id: "five-dollar-packs",
    images: [{ imageUrl: "https://img.cah.io/images/vc07edlh/production/41556c5c773ab42a27824ae1c8c73315653de2bf-660x1200.png" }],
    tagline: "For whatever you're into.",
    buttonText: "Buy $5 Packs",
    buttonLink: "#",
    name: "$5 Packs",
    price: 5,
  },
];

function BuyButton({ product }: { product: any }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id || product.slug || "product",
      name: product.name || product.tagline || "Product",
      price: product.price || 29,
      image: product.images?.[0]?.imageUrl || "",
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className="block w-full bg-[#FF0000] py-4 text-center text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80"
    >
      {added ? "Added!" : product.buttonText || "Add to Cart"}
    </button>
  );
}

export default function BuySection({ data }: { data?: any[] }) {
  const products = data && data.length > 0 ? data : fallbackProducts;

  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-16 text-4xl font-bold text-black">Buy the game.</h2>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {products.map((product, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="mb-5 flex max-h-[400px] items-center justify-center gap-2 overflow-hidden">
                {(product.images || []).map((img: any, i: number) => (
                  <Image
                    key={i}
                    src={img.imageUrl}
                    alt={product.tagline || "Product"}
                    width={330}
                    height={635}
                    className="max-h-[350px] w-auto object-contain"
                  />
                ))}
              </div>
              <p className="mb-4 text-lg font-medium text-black">
                {product.tagline}
              </p>
              <BuyButton product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}