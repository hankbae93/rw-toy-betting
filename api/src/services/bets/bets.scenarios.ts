import type { Prisma, Bet } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BetCreateArgs>({
  bet: {
    one: {
      data: {
        startTime: '2024-03-21T07:46:38.834Z',
        endTime: '2024-03-21T07:46:38.834Z',
        isComplete: true,
        category: 'String',
        totalVolume: 3490590,
        betMode: 'String',
      },
    },
    two: {
      data: {
        startTime: '2024-03-21T07:46:38.834Z',
        endTime: '2024-03-21T07:46:38.834Z',
        isComplete: true,
        category: 'String',
        totalVolume: 8008744,
        betMode: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Bet, 'bet'>
