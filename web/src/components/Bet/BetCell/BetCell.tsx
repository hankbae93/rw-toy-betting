import type { FindBetQuery, FindBetQueryVariables } from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import BetDetail from 'src/components/Bet/BetCell/BetDetail'

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
        id
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
  return <BetDetail bet={bet} />
}
