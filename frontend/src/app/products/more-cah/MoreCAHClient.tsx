"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/context/CartContext";

const fallbackProduct = {
  name: "More Cards Against Humanity",
  price: 29,
  description: "More Cards Against Humanity comes with 600 expansion cards that instantly double the replayability and girth of your deck.",
  bulletPoints: [
    { point: "If you've never bought an expansion and you want more Cards Against Humanity, buy More Cards Against Humanity." },
    { point: "It's got all the best jokes from our old Red Box, Blue Box, and Green Box expansions, plus 50 cards we've never printed before." },
    { point: "Shiny!" },
  ],
  images: [{ imageUrl: "https://img.cah.io/images/vc07edlh/production/5e64d25a746ed1ebc9d5025f935fc650a984a105-1400x1260.png" }],
}

const fallbackRelated = [
  {
    id: "tales-vol-1",
    name: "Tales Vol. 1",
    description: "A book of fill-in-the-blank stories to play with your CAH cards.",
    price: 19.99,
    images: [{ imageUrl: "https://img.cah.io/images/vc07edlh/production/5de43bd46e3aca7e0dbbe441a5f27de1bb041cda-1401x1261.png" }],
  },
  {
    id: "shit-list",
    name: "Shit List",
    description: "A fresh way to play CAH where YOU write the answers, plus 80 black cards.",
    price: 22.99,
    images: [{ imageUrl: "https://img.cah.io/images/vc07edlh/production/06e90cda6bff2b7f23e2998f3c0a18451649fc94-1400x1261.png" }],
  },
  {
    id: "twists-bundle",
    name: "Twists Bundle",
    description: "It's like playing for the first time again, four more times.",
    price: 59.99,
    images: [{ imageUrl: "https://img.cah.io/images/vc07edlh/production/20c0b3d96cc73ad923a6d8d25abf900d688fd80b-2801x2521.png" }],
  },
]

interface Props {
  product: any
  related: any[]
  footer: any
}

function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product?.slug || "more-cah",
      name: product?.name || "More Cards Against Humanity",
      price: product?.price || 29,
      image: product?.images?.[0]?.imageUrl || fallbackProduct.images[0].imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-[#FF0000] py-4 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80"
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}

export default function MoreCAHClient({ product, related, footer }: Props) {
  const p = product || fallbackProduct
  const relatedList = related?.length > 0 ? related : fallbackRelated
  const productImage = p?.images?.[0]?.imageUrl || fallbackProduct.images[0].imageUrl
  const bullets = p?.bulletPoints || fallbackProduct.bulletPoints

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Product Detail */}
        <section className="px-5 py-12 md:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2">
            {/* Left - Image */}
            <div>
              <Image
                src={productImage}
                alt={p?.name || "Product"}
                width={600}
                height={540}
                className="h-auto w-full"
                priority
              />
            </div>

            {/* Right - Info */}
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-3xl font-bold text-black md:text-4xl">
                {p?.name}
              </h1>
              <p className="mb-6 text-base leading-relaxed text-gray-700">
                {p?.description}
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-5 text-base text-gray-700">
                {bullets.map((b: any, i: number) => (
                  <li key={i}>{b.point}</li>
                ))}
              </ul>
              <p className="mb-6 text-3xl font-bold text-black">
                ${p?.price}
              </p>
              <AddToCartButton product={p} />
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="border-t border-gray-200 px-5 py-12 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-8 text-2xl font-bold text-black md:text-3xl">
              You should check out:
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {relatedList.map((item: any, idx: number) => (
                <div key={item.id || idx} className="min-w-[250px] flex-1">
                  <div className="flex flex-col">
                    <Image
                      src={item?.images?.[0]?.imageUrl || ""}
                      alt={item?.name || "Product"}
                      width={300}
                      height={270}
                      className="mb-4 h-auto w-full object-contain"
                    />
                    <h3 className="mb-2 text-lg font-bold text-black">
                      {item?.name}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      {item?.description}
                    </p>
                    <p className="mb-4 font-bold text-black">
                      ${item?.price}
                    </p>
                    <button className="w-full bg-[#FF0000] py-3 text-sm font-bold uppercase text-white hover:opacity-80">
                      Add to Cart
                    </button>
                  </div>
                </div>
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