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

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    {
      slug: 'hero',
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
      admin: { useAsTitle: 'name' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'price', type: 'number', required: true },
        { name: 'buttonText', type: 'text' },
        { name: 'buttonLink', type: 'text' },
        { name: 'tagline', type: 'text' },
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
      admin: { useAsTitle: 'question' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
        { name: 'order', type: 'number' },
      ],
    },
    {
      slug: 'steal-section',
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