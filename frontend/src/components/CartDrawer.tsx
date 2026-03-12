"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalPrice } =
    useCart();
  const { customer } = useAuth();
  const router = useRouter();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="cart-overlay fixed inset-0 bg-black/50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`cart-drawer fixed right-0 top-0 flex h-full w-full max-w-[400px] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-[17px] font-extrabold text-black">Your Cart</h2>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center text-2xl text-black transition-opacity hover:opacity-60"
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-[15px] text-[#666666]">Your cart is empty</p>
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
                      <p className="text-[15px] font-bold text-black">
                        {item.name}
                      </p>
                      <p className="text-[13px] text-[#666666]">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex h-7 w-7 items-center justify-center border border-gray-300 text-[13px] text-black transition-colors hover:bg-gray-100"
                      >
                        &minus;
                      </button>
                      <span className="min-w-[20px] text-center text-[13px] text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex h-7 w-7 items-center justify-center border border-gray-300 text-[13px] text-black transition-colors hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-[12px] text-[#FF0000] hover:underline"
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
              <span className="text-[15px] font-extrabold text-black">
                Total
              </span>
              <span className="text-[15px] font-extrabold text-black">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => {
                closeCart();
                router.push(customer ? "/checkout" : "/login?redirect=/checkout");
              }}
              className="btn-red w-full py-3"
            >
              {customer ? "CHECKOUT" : "LOGIN TO CHECKOUT"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
