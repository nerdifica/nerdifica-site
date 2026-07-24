import type { ToolConfig } from '~/types/niche'

export default {
  id: 'jogo-da-velha',
  nicheId: 'jogos',
  slug: {
    'pt-br': 'jogo-da-velha',
    es: 'tres-en-raya',
    en: 'tic-tac-toe',
  },
  name: {
    'pt-br': 'Jogo da Velha',
    es: 'Tres en Raya',
    en: 'Tic-Tac-Toe',
  },
  description: {
    'pt-br': 'Jogue o clássico jogo da velha (X e O) contra um amigo no mesmo dispositivo.',
    es: 'Juega al clásico tres en raya (X y O) contra un amigo en el mismo dispositivo.',
    en: 'Play the classic tic-tac-toe (X and O) against a friend on the same device.',
  },
  keywords: {
    'pt-br': ['jogo da velha', 'jogo da velha online', 'x e o'],
    es: ['tres en raya', 'tres en raya online'],
    en: ['tic-tac-toe', 'tic-tac-toe online', 'noughts and crosses'],
  },
  faq: [
    {
      question: {
        'pt-br': 'Como funciona o jogo da velha?',
        es: '¿Cómo funciona el tres en raya?',
        en: 'How does tic-tac-toe work?',
      },
      answer: {
        'pt-br':
          'Dois jogadores se revezam marcando X ou O em um tabuleiro 3x3. Vence quem completar primeiro uma linha, coluna ou diagonal.',
        es: 'Dos jugadores se turnan marcando X u O en un tablero 3x3. Gana quien complete primero una línea, columna o diagonal.',
        en: 'Two players take turns marking X or O on a 3x3 board. Whoever completes a row, column or diagonal first wins.',
      },
    },
  ],
  component: () => import('./JogoDaVelha.vue'),
} satisfies ToolConfig