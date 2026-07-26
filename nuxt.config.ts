import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { createJiti } from 'jiti'

const dirsIn = (path: string) =>
  readdirSync(path).filter((name) => statSync(join(path, name)).isDirectory())

// Niche/tool configs are discovered via `import.meta.glob` for the Vue app (see
// `app/composables/useNiches.ts`), a Vite-only macro that isn't available inside Nitro
// server routes. This mirrors that same discovery at build time using jiti (the same
// loader Nuxt itself uses for `nuxt.config.ts`) and bakes the result into a virtual
// module (`#niches-sitemap-data`) that the sitemap server route can import directly.
async function buildNichesSitemapData() {
  const jiti = createJiti(import.meta.url)
  const nichesDir = fileURLToPath(new URL('./app/niches', import.meta.url))

  const niches: unknown[] = []
  const tools: unknown[] = []

  for (const nicheDir of dirsIn(nichesDir)) {
    niches.push(
      await jiti.import(join(nichesDir, nicheDir, 'niche.config.ts'), { default: true })
    )

    const toolsDir = join(nichesDir, nicheDir, 'tools')
    for (const toolDir of dirsIn(toolsDir)) {
      const { component: _component, ...tool } = (await jiti.import(
        join(toolsDir, toolDir, 'index.ts'),
        { default: true }
      )) as Record<string, unknown>
      tools.push(tool)
    }
  }

  return { niches, tools }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  hooks: {
    'nitro:config': async (nitroConfig) => {
      const { niches, tools } = await buildNichesSitemapData()
      nitroConfig.virtual ||= {}
      nitroConfig.virtual['#niches-sitemap-data'] = () =>
        `export const niches = ${JSON.stringify(niches)}\nexport const tools = ${JSON.stringify(tools)}\n`
    },
  },

  modules: ['@nuxtjs/i18n', '@nuxt/content', '@nuxtjs/seo', '@nuxt/icon'],

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },

  site: {
    url: 'https://nerdifica.com',
    name: 'Nerdifica',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  i18n: {
    baseUrl: 'https://nerdifica.com',
    experimental: { strictSeo: true },
    locales: [
      { code: 'pt-br', language: 'pt-BR', name: 'Português', file: 'pt-br.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'pt-br',
    strategy: 'prefix',
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000',
      adsensePublisherId: process.env.NUXT_PUBLIC_ADSENSE_ID || '',
    },
  },
})