import configPromise from '@payload-config'
import { getPayload } from 'payload'

const WEBHOOK_SECRET = process.env.MEDUSA_WEBHOOK_SECRET || ''

export const POST = async (request: Request) => {
  try {
    // Verify webhook secret if configured
    if (WEBHOOK_SECRET) {
      const authHeader = request.headers.get('x-webhook-secret')
      if (authHeader !== WEBHOOK_SECRET) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const body = await request.json()
    const { event, data } = body

    if (!event || !data) {
      return Response.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    if (event === 'product.updated' || event === 'product.created') {
      const product = data
      const handle = product.handle

      if (!handle) {
        return Response.json({ error: 'No handle in product data' }, { status: 400 })
      }

      // Find existing product in Payload by slug
      const existing = await payload.find({
        collection: 'products',
        where: { slug: { equals: handle } },
        limit: 1,
      })

      const name = product.title || handle
      let price = 0
      let medusaVariantId: string | undefined

      // Extract price from variants if available
      if (product.variants?.length > 0) {
        const variant = product.variants[0]
        if (variant.prices?.length > 0) {
          price = variant.prices[0].amount / 100
        }
        medusaVariantId = variant.id
      }

      if (existing.docs.length > 0) {
        // Update existing product
        await payload.update({
          collection: 'products',
          id: existing.docs[0].id,
          data: {
            name,
            slug: handle,
            ...(product.description ? { description: product.description } : {}),
            ...(price ? { price } : {}),
            ...(medusaVariantId ? { medusaVariantId } : {}),
          } as any,
        })
      } else {
        // Create new product
        await payload.create({
          collection: 'products',
          data: {
            name,
            slug: handle,
            price,
            ...(product.description ? { description: product.description } : {}),
            ...(medusaVariantId ? { medusaVariantId } : {}),
          } as any,
        })
      }

      return Response.json({ success: true, action: existing.docs.length > 0 ? 'updated' : 'created' })
    }

    return Response.json({ success: true, action: 'ignored' })
  } catch (error) {
    console.error('Webhook error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
