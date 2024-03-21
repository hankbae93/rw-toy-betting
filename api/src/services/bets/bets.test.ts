import type { Bet } from '@prisma/client'

import { bets, bet, createBet, updateBet, deleteBet } from './bets'
import type { StandardScenario } from './bets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('bets', () => {
  scenario('returns all bets', async (scenario: StandardScenario) => {
    const result = await bets()

    expect(result.length).toEqual(Object.keys(scenario.bet).length)
  })

  scenario('returns a single bet', async (scenario: StandardScenario) => {
    const result = await bet({ id: scenario.bet.one.id })

    expect(result).toEqual(scenario.bet.one)
  })

  scenario('creates a bet', async () => {
    const result = await createBet({
      input: {
        startTime: '2024-03-21T07:46:38.820Z',
        endTime: '2024-03-21T07:46:38.820Z',
        isComplete: true,
        category: 'String',
        totalVolume: 9514278,
        betMode: 'String',
      },
    })

    expect(result.startTime).toEqual(new Date('2024-03-21T07:46:38.820Z'))
    expect(result.endTime).toEqual(new Date('2024-03-21T07:46:38.820Z'))
    expect(result.isComplete).toEqual(true)
    expect(result.category).toEqual('String')
    expect(result.totalVolume).toEqual(9514278)
    expect(result.betMode).toEqual('String')
  })

  scenario('updates a bet', async (scenario: StandardScenario) => {
    const original = (await bet({ id: scenario.bet.one.id })) as Bet
    const result = await updateBet({
      id: original.id,
      input: { startTime: '2024-03-22T07:46:38.820Z' },
    })

    expect(result.startTime).toEqual(new Date('2024-03-22T07:46:38.820Z'))
  })

  scenario('deletes a bet', async (scenario: StandardScenario) => {
    const original = (await deleteBet({ id: scenario.bet.one.id })) as Bet
    const result = await bet({ id: original.id })

    expect(result).toEqual(null)
  })
})
