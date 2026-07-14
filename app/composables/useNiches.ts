import type { Locale, NicheConfig, ToolConfig } from '~/types/niche'

const nicheModules = import.meta.glob<{ default: NicheConfig }>(
  '../niches/*/niche.config.ts',
  { eager: true }
)

const toolModules = import.meta.glob<{ default: ToolConfig }>(
  '../niches/*/tools/*/index.ts',
  { eager: true }
)

const niches: NicheConfig[] = Object.values(nicheModules).map((m) => m.default)
const tools: ToolConfig[] = Object.values(toolModules).map((m) => m.default)

export function useNiches() {
  function getAllNiches() {
    return niches
  }

  function getNicheBySlug(locale: Locale, slug: string) {
    return niches.find((niche) => niche.slug[locale] === slug)
  }

  function getToolsByNiche(nicheId: string) {
    return tools.filter((tool) => tool.nicheId === nicheId)
  }

  function getToolBySlug(locale: Locale, nicheId: string, slug: string) {
    return tools.find((tool) => tool.nicheId === nicheId && tool.slug[locale] === slug)
  }

  return { getAllNiches, getNicheBySlug, getToolsByNiche, getToolBySlug }
}