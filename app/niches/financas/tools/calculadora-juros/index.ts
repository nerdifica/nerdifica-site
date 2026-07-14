import type { ToolConfig } from '~/types/niche'

export default {
  id: 'calculadora-juros',
  nicheId: 'financas',
  slug: {
    'pt-br': 'calculadora-juros',
    es: 'calculadora-interes',
    en: 'interest-calculator',
  },
  name: {
    'pt-br': 'Calculadora de Juros Compostos',
    es: 'Calculadora de Interés Compuesto',
    en: 'Compound Interest Calculator',
  },
  description: {
    'pt-br': 'Calcule juros compostos informando capital, taxa e tempo.',
    es: 'Calcula el interés compuesto informando capital, tasa y tiempo.',
    en: 'Calculate compound interest from principal, rate and time.',
  },
  keywords: {
    'pt-br': ['calculadora de juros', 'juros compostos', 'matemática financeira'],
    es: ['calculadora de interes', 'interes compuesto'],
    en: ['compound interest calculator', 'interest calculator'],
  },
  faq: [
    {
      question: {
        'pt-br': 'Como funciona o cálculo?',
        es: '¿Cómo funciona el cálculo?',
        en: 'How does the calculation work?',
      },
      answer: {
        'pt-br': 'Aplicamos a fórmula M = C x (1 + i)^t sobre os valores informados.',
        es: 'Aplicamos la fórmula M = C x (1 + i)^t sobre los valores informados.',
        en: 'We apply the formula M = C x (1 + i)^t to the values provided.',
      },
    },
  ],
  component: () => import('./CalculadoraJuros.vue'),
} satisfies ToolConfig