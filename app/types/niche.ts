export type Locale = 'pt-br' | 'es' | 'en'

export type LocalizedText = Record<Locale, string>

export interface NicheConfig {
  id: string
  icon: string
  slug: LocalizedText
  name: LocalizedText
  description: LocalizedText
}

export interface ToolFaqEntry {
  question: LocalizedText
  answer: LocalizedText
}

export interface ToolConfig {
  id: string
  nicheId: string
  slug: LocalizedText
  name: LocalizedText
  description: LocalizedText
  keywords: Record<Locale, string[]>
  faq: ToolFaqEntry[]
  component: () => Promise<unknown>
}