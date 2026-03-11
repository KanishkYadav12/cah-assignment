const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'

export async function getHero() {
  try {
    const res = await fetch(`${CMS_URL}/api/hero?limit=1`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.docs?.[0] ?? null
  } catch {
    return null
  }
}

export async function getProducts() {
  try {
    const res = await fetch(`${CMS_URL}/api/products?limit=100`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data?.docs ?? []
  } catch {
    return []
  }
}

export async function getFAQs() {
  try {
    const res = await fetch(`${CMS_URL}/api/faqs?limit=100&sort=order`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data?.docs ?? []
  } catch {
    return []
  }
}

export async function getStealSection() {
  try {
    const res = await fetch(`${CMS_URL}/api/steal-section?limit=1`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.docs?.[0] ?? null
  } catch {
    return null
  }
}

export async function getFooter() {
  try {
    const res = await fetch(`${CMS_URL}/api/footer?limit=1`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.docs?.[0] ?? null
  } catch {
    return null
  }
}