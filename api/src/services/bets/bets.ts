//
// export const bets: QueryResolvers['bets'] = () => {
//   return db.bet.findMany()
// }

import { db } from 'src/lib/db'
import { MutationResolvers, QueryResolvers } from 'types/graphql'

export const bets: QueryResolvers['bets'] = () => {
  return db.bet.findMany({
    include: {
      betOptions: true,
    },
  })
}

export const bet: QueryResolvers['bet'] = ({ id }) => {
  return db.bet.findUnique({
    where: {
      id,
    },
    include: {
      betOptions: true,
    },
  })
}

export const createBet: MutationResolvers['createBet'] = async ({ input }) => {
  const { betOptions, ...betData } = input

  return db.bet.create({
    data: {
      ...betData,
      betOptions: {
        create: betOptions,
      },
    },
  })
}

export const startBet: MutationResolvers['startBet'] = async ({ input }) => {
  const { id, startTime, endTime } = input

  try {
    await db.bet.update({
      where: {
        id,
      },
      data: {
        startTime,
        endTime,
      },
    })
  } catch (err) {
    console.error(err)
    return false
  }

  return true
}

// export const betMoney: MutationResolvers['betMoney'] = async ({ input }) => {
//   const { id, optionId, amount } = input
//   await db.$transaction([
//     db.userBetOption.create({
//
//     })
//   ])
// }
