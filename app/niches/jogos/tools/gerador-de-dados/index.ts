import type { ToolConfig } from '~/types/niche'

export default {
  id: 'gerador-dados',
  nicheId: 'jogos',
  slug: {
    'pt-br': 'gerador-de-dados',
    es: 'generador-de-datos',
    en: 'data-generator',
  },
  name: {
    'pt-br': 'Gerador de Dados',
    es: 'Generador de Datos',
    en: 'Data Generator',
  },
  description: {
    'pt-br': 'Gere CPFs válidos e números de telefone fictícios para testar seus sistemas.',
    es: 'Genera CPFs válidos y números de teléfono ficticios para probar tus sistemas.',
    en: 'Generate valid CPFs and fake phone numbers to test your systems.',
  },
  keywords: {
    'pt-br': ['gerador de cpf', 'gerador de telefone', 'cpf válido', 'gerador de dados falsos'],
    es: ['generador de cpf', 'generador de telefono', 'cpf valido'],
    en: ['cpf generator', 'fake phone number generator', 'test data generator'],
  },
  faq: [
    {
      question: {
        'pt-br': 'Os CPFs gerados são reais?',
        es: '¿Los CPF generados son reales?',
        en: 'Are the generated CPFs real?',
      },
      answer: {
        'pt-br':
          'Não. Os números seguem o algoritmo oficial de validação de CPF, mas são gerados aleatoriamente e servem apenas para testes de sistemas.',
        es: 'No. Los números siguen el algoritmo oficial de validación de CPF, pero se generan aleatoriamente y sirven solo para pruebas de sistemas.',
        en: 'No. The numbers follow the official CPF validation algorithm, but are generated randomly and are meant only for system testing.',
      },
    },
  ],
  component: () => import('./GeradorDeDados.vue'),
} satisfies ToolConfig