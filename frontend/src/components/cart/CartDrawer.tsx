"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-[#111] text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
          <h2 className="text-lg font-black">
            Cart{totalItems > 0 ? ` (${totalItems})` : ""}
          </h2>
          <button
            onClick={closeCart}
            className="bg-transparent text-2xl font-black leading-none"
          >
            &times;
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="py-12 text-center text-gray-500">
              Your cart is empty.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 border-b border-gray-700 pb-4"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-700">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-black">{item.name}</span>
                    <span className="text-sm text-gray-400">${item.price.toFixed(2)}</span>
                    <div className="mt-auto flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-600 text-xs hover:border-white"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-600 text-xs hover:border-white"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-xs text-gray-500 underline hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-700 px-6 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-black">Total</span>
              <span className="text-lg font-black">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-red block w-full py-3 text-center"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
