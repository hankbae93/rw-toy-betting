export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    tokenBalance: Int!
  }

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

  type UserBetOption {
    id: Int!
    amount: Int!
    betOption: BetOption!
    user: User!
  }

  type Query {
    bets: [Bet] @skipAuth
    bet(id: Int!): Bet @skipAuth
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

  input StartBetInput {
    id: Int!
    startTime: DateTime!
    endTime: DateTime!
  }

  input BetMoneyInput {
    id: Int!
    optionId: Int!
    amount: Int!
  }

  type Mutation {
    createBet(input: CreateBetInput): Bet! @requireAuth
    startBet(input: StartBetInput): Boolean! @requireAuth
    betMoney(input: BetMoneyInput): UserBetOption! @requireAuth
  }
`
