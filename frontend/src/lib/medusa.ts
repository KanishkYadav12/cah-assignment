const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_URL || 'https://cah-assignment.onrender.com'

export async function createCart() {
  const res = await fetch(`${MEDUSA_URL}/store/carts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await res.json()
  return data.cart
}

export async function addToCart(cartId: string, variantId: string, quantity: number) {
  const res = await fetch(`${MEDUSA_URL}/store/carts/${cartId}/line-items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ variant_id: variantId, quantity }),
  })
  const data = await res.json()
  return data.cart
}

export async function getCart(cartId: string) {
  const res = await fetch(`${MEDUSA_URL}/store/carts/${cartId}`)
  const data = await res.json()
  return data.cart
}