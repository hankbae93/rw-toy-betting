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
