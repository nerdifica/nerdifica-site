import type { ToolConfig } from '~/types/niche'

export default {
  id: 'gerador-dados',
  nicheId: 'gerador-de-dados',
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
    'pt-br': 'Escolha os campos (CPF, telefone, nome) e gere quantos registros fictícios precisar.',
    es: 'Elige los campos (CPF, teléfono, nombre) y genera los registros ficticios que necesites.',
    en: 'Pick the fields (CPF, phone, name) and generate as many fake records as you need.',
  },
  keywords: {
    'pt-br': ['gerador de cpf', 'gerador de telefone', 'gerador de nome', 'cpf válido', 'gerador de dados falsos'],
    es: ['generador de cpf', 'generador de telefono', 'generador de nombre', 'cpf valido'],
    en: ['cpf generator', 'fake phone number generator', 'fake name generator', 'test data generator'],
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
    {
      question: {
        'pt-br': 'Posso escolher só alguns dos campos?',
        es: '¿Puedo elegir solo algunos de los campos?',
        en: 'Can I choose only some of the fields?',
      },
      answer: {
        'pt-br':
          'Sim. Marque os campos que quiser (CPF, telefone, nome) antes de gerar — pelo menos um precisa ficar selecionado.',
        es: 'Sí. Marca los campos que quieras (CPF, teléfono, nombre) antes de generar — al menos uno debe quedar seleccionado.',
        en: 'Yes. Check the fields you want (CPF, phone, name) before generating — at least one must stay selected.',
      },
    },
  ],
  component: () => import('./GeradorDeDados.vue'),
} satisfies ToolConfig