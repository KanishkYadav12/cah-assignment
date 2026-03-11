"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_URL || 'https://cah-assignment.onrender.com'

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variantId?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  medusaCartId: string | null;
}

const STORAGE_KEY = "cah-cart";
const MEDUSA_CART_KEY = "medusa-cart-id";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Medusa API helpers
async function createMedusaCart() {
  try {
    const res = await fetch(`${MEDUSA_URL}/store/carts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    const data = await res.json()
    return data.cart?.id || null
  } catch {
    return null
  }
}

async function addItemToMedusaCart(cartId: string, variantId: string, quantity: number) {
  try {
    await fetch(`${MEDUSA_URL}/store/carts/${cartId}/line-items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ variant_id: variantId, quantity }),
    })
  } catch {
    // silent fail - local cart still works
  }
}

async function removeItemFromMedusaCart(cartId: string, lineItemId: string) {
  try {
    await fetch(`${MEDUSA_URL}/store/carts/${cartId}/line-items/${lineItemId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
  } catch {
    // silent fail
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [medusaCartId, setMedusaCartId] = useState<string | null>(null);

  // Load from localStorage after mount
  useEffect(() => {
    setItems(loadCart());
    const savedCartId = localStorage.getItem(MEDUSA_CART_KEY)
    if (savedCartId) setMedusaCartId(savedCartId)
    setHydrated(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const getOrCreateMedusaCart = useCallback(async () => {
    if (medusaCartId) return medusaCartId
    const newCartId = await createMedusaCart()
    if (newCartId) {
      setMedusaCartId(newCartId)
      localStorage.setItem(MEDUSA_CART_KEY, newCartId)
    }
    return newCartId
  }, [medusaCartId])

  const addItem = useCallback(async (item: Omit<CartItem, "quantity">) => {
    // Update local UI instantly
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    // Sync with Medusa in background
    if (item.variantId) {
      const cartId = await getOrCreateMedusaCart()
      if (cartId && item.variantId) {
        await addItemToMedusaCart(cartId, item.variantId, 1)
      }
    }
  }, [getOrCreateMedusaCart]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([])
    setMedusaCartId(null)
    localStorage.removeItem(MEDUSA_CART_KEY)
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        medusaCartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}