import type { NicheConfig, ToolConfig } from '~/types/niche'

declare module '#niches-sitemap-data' {
  export const niches: NicheConfig[]
  export const tools: Array<Omit<ToolConfig, 'component'>>
}