const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_URL || 'https://cah-assignment.onrender.com'
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'pk_76962c41b90bef91da9bea018054c4b5e6bd5744e64dc75b0cc3f6149f9345d8'

const headers = {
  'Content-Type': 'application/json',
  'x-publishable-api-key': PUBLISHABLE_KEY,
}

export async function createCart() {
  const res = await fetch(`${MEDUSA_URL}/store/carts`, {
    method: 'POST',
    headers,
  })
  const data = await res.json()
  return data.cart
}

export async function addToCart(cartId: string, variantId: string, quantity: number) {
  const res = await fetch(`${MEDUSA_URL}/store/carts/${cartId}/line-items`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ variant_id: variantId, quantity }),
  })
  const data = await res.json()
  return data.cart
}

export async function getCart(cartId: string) {
  const res = await fetch(`${MEDUSA_URL}/store/carts/${cartId}`, { headers })
  const data = await res.json()
  return data.cart
}