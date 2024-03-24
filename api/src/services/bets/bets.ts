//
// export const bets: QueryResolvers['bets'] = () => {
//   return db.bet.findMany()
// }

import { db } from 'src/lib/db'
import { MutationResolvers, QueryResolvers } from 'types/graphql'
import { RedwoodGraphQLError } from '@redwoodjs/graphql-server'

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

export const betMoney: MutationResolvers['betMoney'] = ({ input }) => {
  const { id, optionId, amount } = input

  return db.$transaction(async (prisma) => {
    const user = await prisma.user.findUnique({ where: { id } })
    if (amount > user.tokenBalance) {
      throw new RedwoodGraphQLError('토큰이 부족합니다.')
    }

    let userBetOption = await prisma.userBetOption.findFirst({
      where: {
        betOptionId: optionId,
        userId: context.currentUser.id,
      },
    })
    userBetOption = userBetOption
      ? await prisma.userBetOption.update({
          where: {
            id: userBetOption.id,
            userId: context.currentUser.id,
          },
          data: { amount: { increment: amount } },
        })
      : await prisma.userBetOption.create({
          data: {
            amount,
            BetOption: { connect: { id: optionId } },
            User: { connect: { id } },
          },
        })

    // 2. BetOption의 average 및 volume 업데이트
    const userBetOptions = await prisma.userBetOption.findMany({
      where: { betOptionId: optionId },
    })

    const totalAmount = userBetOptions.reduce(
      (total, bet) => total + bet.amount,
      0
    )
    const average = totalAmount / userBetOptions.length

    await prisma.betOption.update({
      where: { id: optionId },
      data: {
        average,
        volume: totalAmount,
      },
    })

    // 3. Bet의 totalVolume 업데이트
    const betOption = await prisma.betOption.findUnique({
      where: { id: optionId },
      include: { Bet: true },
    })

    const betId = betOption?.Bet.id
    if (betId) {
      const bet = await prisma.bet.findUnique({ where: { id: betId } })
      if (bet) {
        await prisma.bet.update({
          where: { id: betId },
          data: {
            totalVolume: bet.totalVolume + amount,
          },
        })
      }
    }

    // 4. 사용자의 tokenBalance 업데이트
    await prisma.user.update({
      where: { id },
      data: {
        tokenBalance: user.tokenBalance - amount,
      },
    })

    return userBetOption
  })
}
