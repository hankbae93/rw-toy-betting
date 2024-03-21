export const schema = gql`
  type BetOption {
    id: Int!
    content: String!
    average: Int
    betId: Int!
  }

  type Bet {
    id: Int!
    title: String!
    startTime: DateTime
    endTime: DateTime
    isComplete: Boolean
    category: String
    totalVolume: Int
    betMode: String!
    betOptions: [BetOption!]
  }

  type Query {
    bets: [Bet] @skipAuth
  }

  input CreateBetInput {
    title: String!
    category: String!
    betMode: String!
    betOptions: [CreateBetOptionInput!]!
  }

  input CreateBetOptionInput {
    content: String!
  }

  type Mutation {
    createBet(input: CreateBetInput): Bet! @requireAuth
  }
`
