import type { BetsQuery, BetsQueryVariables } from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

export const QUERY: TypedDocumentNode<BetsQuery, BetsQueryVariables> = gql`
  query BetsQuery {
    bets {
      id
      title
      startTime
      endTime
      betMode
      category
      betOptions {
        content
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ bets }: CellSuccessProps<BetsQuery>) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {bets.map((item) => (
        <Link key={item.id} to={routes.betDetail({ id: item.id })}>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="mb-2 text-lg font-semibold">{item.title}</p>

            {/*<p className="mb-2 text-gray-600">ID: {item.id}</p>*/}
            {/*<p className="mb-2 text-gray-600">Start Time: {item.startTime}</p>*/}
            {/*<p className="mb-2 text-gray-600">End Time: {item.endTime}</p>*/}
            <p className="mb-2 text-gray-600">Bet Mode: {item.betMode}</p>
            <p className="mb-2 text-gray-600">Category: {item.category}</p>
            <div>
              <ul className="flex gap-1">
                {item.betOptions.map((option, index) => (
                  <li
                    key={index}
                    className="rounded-md bg-green-200 px-1 text-gray-600"
                  >
                    {option.content}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
