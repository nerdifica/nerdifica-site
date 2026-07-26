import { defineSitemapEventHandler } from '#imports'
import { niches, tools } from '#niches-sitemap-data'
import type { SitemapUrlInput } from '@nuxtjs/sitemap'
import type { Locale } from '~/types/niche'

const locales: Locale[] = ['pt-br', 'es', 'en']
const hreflangByLocale: Record<Locale, string> = {
  'pt-br': 'pt-BR',
  es: 'es-ES',
  en: 'en-US',
}

const collectionByLocale: Record<Locale, 'blog_ptbr' | 'blog_es' | 'blog_en'> = {
  'pt-br': 'blog_ptbr',
  es: 'blog_es',
  en: 'blog_en',
}

function alternativesFor(pathByLocale: Record<Locale, string>) {
  return locales.map((locale) => ({
    hreflang: hreflangByLocale[locale],
    href: pathByLocale[locale],
  }))
}

export default defineSitemapEventHandler(async (event) => {
  const urls: SitemapUrlInput[] = []

  for (const niche of niches) {
    const nichePathByLocale = Object.fromEntries(
      locales.map((locale) => [locale, `/${locale}/${niche.slug[locale]}`])
    ) as Record<Locale, string>

    for (const locale of locales) {
      urls.push({
        loc: nichePathByLocale[locale],
        alternatives: alternativesFor(nichePathByLocale),
      })
    }

    for (const tool of tools.filter((t) => t.nicheId === niche.id)) {
      const toolPathByLocale = Object.fromEntries(
        locales.map((locale) => [
          locale,
          `/${locale}/${niche.slug[locale]}/tool/${tool.slug[locale]}`,
        ])
      ) as Record<Locale, string>

      for (const locale of locales) {
        urls.push({
          loc: toolPathByLocale[locale],
          alternatives: alternativesFor(toolPathByLocale),
        })
      }
    }
  }

  for (const locale of locales) {
    const articles = await queryCollection(event, collectionByLocale[locale]).all()
    for (const article of articles) {
      urls.push({ loc: article.path })
    }
  }

  return urls
})
