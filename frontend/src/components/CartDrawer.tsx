"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalPrice } =
    useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-70 flex h-full w-full flex-col bg-white shadow-xl transition-transform duration-300 md:w-100 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-bold text-black">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-2xl text-black transition-opacity hover:opacity-60"
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-gray-100 pb-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-contain"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-bold text-black">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex h-7 w-7 items-center justify-center border border-gray-300 text-sm text-black"
                      >
                        -
                      </button>
                      <span className="text-sm text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex h-7 w-7 items-center justify-center border border-gray-300 text-sm text-black"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-sm text-[#FF0000] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-4">
            <div className="mb-4 flex justify-between">
              <span className="font-bold text-black">Total</span>
              <span className="font-bold text-black">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-[#FF0000] py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-80">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
