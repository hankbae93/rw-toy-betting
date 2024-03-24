import { CellSuccessProps, useMutation } from '@redwoodjs/web'
import {
  FindBetQuery as FindBetQueryType,
  FindBetQueryVariables,
} from 'types/graphql'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'
import { useParams } from '@redwoodjs/router'
import { QUERY as FindBetQuery } from 'src/components/Bet/BetCell/BetCell'

const BET_MONEY_MUTATION = gql`
  mutation BetMoney($input: BetMoneyInput) {
    betMoney(input: $input) {
      id
      amount
    }
  }
`

const BetDetail = ({
  bet,
}: CellSuccessProps<FindBetQueryType, FindBetQueryVariables>) => {
  const { id } = useParams()
  const [betAmounts, setBetAmounts] = useState<Record<number, number>>({})
  const [betMoney, { loading, error }] = useMutation(BET_MONEY_MUTATION, {
    onCompleted: () => {
      toast.success('Bet Money Success')
      // navigate(routes.betList())
    },
    onError: (error) => toast.error(error.message),
    refetchQueries: [{ query: FindBetQuery, variables: { id } }],
  })

  const handleInputChange = (optionId: number, value: string) => {
    setBetAmounts((prevState) => ({
      ...prevState,
      [optionId]: Number(value),
    }))
  }

  const handleBet = async (optionId: number) => {
    await betMoney({
      variables: {
        input: {
          amount: betAmounts[optionId],
          optionId,
          id: Number(id),
        },
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-center text-4xl font-semibold">{bet.title}</h1>
        <div className="rounded-lg bg-white p-8 shadow-md">
          <p className="mb-4 text-gray-600">Category: {bet.category}</p>
          <p className="mb-4 text-gray-600">
            Start Time: {new Date(bet.startTime).toLocaleString()}
          </p>
          <p className="mb-4 text-gray-600">
            End Time: {new Date(bet.endTime).toLocaleString()}
          </p>
          <p className="mb-4 text-gray-600">Total Volume: {bet.totalVolume}</p>
          <p className="mb-4 text-gray-600">Bet Mode: {bet.betMode}</p>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">Bet Options</h2>
          {bet.betOptions.map((option) => (
            <div
              key={option.id}
              className="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow-md"
            >
              <div>
                <p className="text-lg">{option.content}</p>
                <p className="text-gray-600">Average: {option.average}</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  className="rw-input"
                  type="number"
                  onChange={(e) => handleInputChange(option.id, e.target.value)}
                />
                <button
                  className="rw-button-blue rw-button items-center"
                  disabled={loading}
                  onClick={() => handleBet(option.id)}
                >
                  Bet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BetDetail
