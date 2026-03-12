import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL || 'https://cah-assignment.onrender.com'
const MEDUSA_ADMIN_TOKEN = process.env.MEDUSA_ADMIN_TOKEN || ''

/** Sync product data from Payload CMS → Medusa after create/update */
async function syncProductToMedusa(doc: any) {
  if (!MEDUSA_ADMIN_TOKEN) return
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MEDUSA_ADMIN_TOKEN}`,
    }
    const medusaProduct = {
      title: doc.name,
      description: doc.description || '',
      handle: doc.slug,
      status: 'published',
    }

    // Try to find existing product by handle
    const searchRes = await fetch(`${MEDUSA_BACKEND_URL}/admin/products?handle=${doc.slug}`, { headers })
    const searchData = await searchRes.json()
    const existing = searchData?.products?.[0]

    if (existing) {
      // Update existing product
      await fetch(`${MEDUSA_BACKEND_URL}/admin/products/${existing.id}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(medusaProduct),
      })
    } else {
      // Create new product
      await fetch(`${MEDUSA_BACKEND_URL}/admin/products`, {
        method: 'POST',
        headers,
        body: JSON.stringify(medusaProduct),
      })
    }
  } catch (error) {
    console.error('Failed to sync product to Medusa:', error)
  }
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: [
    'https://cah-assignment-m5rh.vercel.app',
    'http://localhost:3000',
  ],
  collections: [
    Users,
    Media,
    {
      slug: 'hero',
      access: { read: () => true },
      admin: { useAsTitle: 'heading' },
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'subtext', type: 'textarea' },
        { name: 'quoteOne', type: 'text' },
        { name: 'quoteOneSource', type: 'text' },
        { name: 'quoteTwo', type: 'text' },
        { name: 'quoteTwoSource', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      slug: 'products',
      access: { read: () => true },
      admin: { useAsTitle: 'name' },
      hooks: {
        afterChange: [
          async ({ doc }) => {
            syncProductToMedusa(doc)
            return doc
          },
        ],
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'price', type: 'number', required: true },
        { name: 'buttonText', type: 'text' },
        { name: 'buttonLink', type: 'text' },
        { name: 'tagline', type: 'text' },
        { name: 'medusaVariantId', type: 'text' },
        {
          name: 'images',
          type: 'array',
          fields: [
            { name: 'imageUrl', type: 'text' },
            { name: 'alt', type: 'text' },
          ],
        },
        {
          name: 'bulletPoints',
          type: 'array',
          fields: [
            { name: 'point', type: 'text' },
          ],
        },
      ],
    },
    {
      slug: 'faqs',
      access: { read: () => true },
      admin: { useAsTitle: 'question' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
        { name: 'order', type: 'number' },
      ],
    },
    {
      slug: 'steal-section',
      access: { read: () => true },
      admin: { useAsTitle: 'title' },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'note', type: 'text' },
        { name: 'buttonOneText', type: 'text' },
        { name: 'buttonTwoText', type: 'text' },
      ],
    },
    {
      slug: 'footer',
      access: { read: () => true },
      admin: { useAsTitle: 'copyright' },
      fields: [
        { name: 'copyright', type: 'text' },
        {
          name: 'shopLinks',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
        {
          name: 'infoLinks',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [],
})