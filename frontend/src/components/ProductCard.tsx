"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

export default function ProductCard({
  id,
  image,
  title,
  description,
  price,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id, name: title, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex min-w-[280px] flex-col">
      <div className="mb-4">
        <Image
          src={image}
          alt={title}
          width={400}
          height={360}
          className="h-auto w-full object-contain"
        />
      </div>
      <h3 className="mb-1 text-lg font-bold text-black">{title}</h3>
      <p className="mb-2 text-sm text-gray-600">{description}</p>
      <p className="mb-3 text-lg font-bold text-black">
        ${price.toFixed(2)}
      </p>
      <button
        onClick={handleAdd}
        className="w-full bg-[#FF0000] py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80"
      >
        {added ? "Added!" : "Add to Cart"}
      </button>
    </div>
  );
}
