import type { FindBetQuery, FindBetQueryVariables } from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  FindBetQuery,
  FindBetQueryVariables
> = gql`
  query FindBetQuery($id: Int!) {
    bet: bet(id: $id) {
      id
      title
      category
      betMode
      isComplete
      totalVolume
      startTime
      endTime
      betOptions {
        content
        average
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<FindBetQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  bet,
}: CellSuccessProps<FindBetQuery, FindBetQueryVariables>) => {
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
              className="mb-4 rounded-lg bg-white p-4 shadow-md"
            >
              <p className="text-lg">{option.content}</p>
              <p className="text-gray-600">Average: {option.average}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
