import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  niche: z.string(),
  keywords: z.array(z.string()).default([]),
  faq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .default([]),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    blog_ptbr: defineCollection({
      type: 'page',
      source: 'pt-br/*/blog/**/*.md',
      schema: articleSchema,
    }),
    blog_es: defineCollection({
      type: 'page',
      source: 'es/*/blog/**/*.md',
      schema: articleSchema,
    }),
    blog_en: defineCollection({
      type: 'page',
      source: 'en/*/blog/**/*.md',
      schema: articleSchema,
    }),
  },
})