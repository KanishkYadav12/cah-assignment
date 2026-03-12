"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/context/CartContext";

const fallbackProduct = {
  name: "Cards Against Humanity: Family Edition",
  slug: "family-edition",
  price: 29,
  description:
    "Cards Against Humanity: Family Edition is a whole new game that's just as funny as the original, but written so kids and adults can play together. Each round, one player asks a question from a blue card, and everyone else answers with their funniest yellow card.",
  bulletPoints: [
    { point: "Designed for kids ages 8 and up." },
    { point: "A whole new game \u2014 not just a censored version of the original." },
    { point: "600 cards, endless replay value." },
  ],
  images: [
    {
      imageUrl:
        "https://img.cah.io/images/vc07edlh/production/048109f3bcd6e2c21cb041f9e5d0ddeac9c3de2f-716x1294.png",
    },
  ],
};

const fallbackRelated = [
  {
    id: "cards-against-humanity",
    slug: "cards-against-humanity",
    name: "Cards Against Humanity",
    description: "America\u2019s #1 gerbil coffin.",
    price: 29,
    images: [
      {
        imageUrl:
          "https://img.cah.io/images/vc07edlh/production/69d14a8c4c8084841b5f3437eb8a06124162dc0d-660x1270.png",
      },
    ],
  },
  {
    id: "more-cah",
    slug: "more-cah",
    name: "More Cards Against Humanity",
    description: "600 expansion cards to double your deck.",
    price: 25,
    images: [
      {
        imageUrl:
          "https://img.cah.io/images/vc07edlh/production/6122ebf50190e25b00cbfd9d7960671bf6a0c054-660x1200.png",
      },
    ],
  },
  {
    id: "five-dollar-packs",
    slug: "five-dollar-packs",
    name: "$5 Packs",
    description: "For whatever you\u2019re into.",
    price: 5,
    images: [
      {
        imageUrl:
          "https://img.cah.io/images/vc07edlh/production/41556c5c773ab42a27824ae1c8c73315653de2bf-660x1200.png",
      },
    ],
  },
];

interface Props {
  product: any;
  related: any[];
  footer: any;
}

export default function FamilyEditionClient({
  product,
  related,
  footer,
}: Props) {
  const p = product || fallbackProduct;
  const relatedList = related?.length > 0 ? related : fallbackRelated;
  const productImage =
    p?.images?.[0]?.imageUrl || fallbackProduct.images[0].imageUrl;
  const bullets = p?.bulletPoints || fallbackProduct.bulletPoints;
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: p?.slug || "family-edition",
        name: p?.name || "Family Edition",
        price: p?.price || 29,
        image: productImage,
        variantId: p?.medusaVariantId,
      });
    }
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Product Detail */}
        <section className="px-5 py-10 md:py-16">
          <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            {/* Left - Image */}
            <div className="flex items-center justify-center">
              <Image
                src={productImage}
                alt={p?.name || "Family Edition"}
                width={600}
                height={540}
                className="h-auto w-full max-w-[400px]"
                priority
              />
            </div>

            {/* Right - Info */}
            <div className="flex flex-col">
              <h1 className="mb-3 text-[24px] font-extrabold text-black md:text-[32px]">
                {p?.name || fallbackProduct.name}
              </h1>
              <p className="mb-5 text-[22px] font-extrabold text-black md:text-[26px]">
                $
                {typeof p?.price === "number"
                  ? p.price.toFixed(2)
                  : p?.price || "29.00"}
              </p>
              <p className="mb-5 text-[15px] leading-[1.7] text-[#555555]">
                {p?.description || fallbackProduct.description}
              </p>
              {bullets.length > 0 && (
                <ul className="mb-6 list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-[#555555]">
                  {bullets.map((b: any, i: number) => (
                    <li key={i}>{b.point}</li>
                  ))}
                </ul>
              )}

              {/* Quantity Selector */}
              <div className="mb-5 flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center border border-gray-300 text-lg text-black transition-colors hover:bg-gray-100"
                >
                  &minus;
                </button>
                <span className="flex h-10 w-12 items-center justify-center border-y border-gray-300 text-[15px] font-bold text-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center border border-gray-300 text-lg text-black transition-colors hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-red w-full py-4"
              >
                {added ? "ADDED!" : "ADD TO CART"}
              </button>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="border-t border-gray-200 px-5 py-10 md:py-16">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="mb-8 text-[22px] font-extrabold text-black md:text-[26px]">
              You should check out:
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {relatedList.map((item: any, idx: number) => (
                <RelatedCard key={item.id || idx} item={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer data={footer} />
      <CartDrawer />
    </>
  );
}

function RelatedCard({ item }: { item: any }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: item.id || item.slug || "product",
      name: item.name || "Product",
      price: item.price || 0,
      image: item.images?.[0]?.imageUrl || "",
      variantId: item.medusaVariantId,
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-w-[240px] flex-1">
      <div className="flex flex-col">
        <Image
          src={item?.images?.[0]?.imageUrl || ""}
          alt={item?.name || "Product"}
          width={300}
          height={270}
          className="mb-3 h-auto w-full object-contain"
        />
        <h3 className="mb-1 text-[15px] font-bold text-black">
          {item?.name}
        </h3>
        <p className="mb-2 text-[13px] text-[#666666]">{item?.description}</p>
        <p className="mb-3 text-[15px] font-bold text-black">
          $
          {typeof item?.price === "number"
            ? item.price.toFixed(2)
            : item?.price}
        </p>
        <button
          onClick={handleAdd}
          className="btn-red w-full py-3"
        >
          {added ? "ADDED!" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}
