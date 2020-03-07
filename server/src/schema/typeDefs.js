const { gql } = require('apollo-server')

module.exports = gql`
  scalar Date

  type User {
    _id: ID!
    name: String!
    account: Account
  }

  type Deposit {
    amount: Int!
  }

  type Withdrawal {
    amount: Int!
  }

  type Account {
    _id: ID!
    balance: Int!
  }

  type Mutation {
    login(pin: String!): ID!
    deposit(amount: Int!, account_id: ID!): Deposit
    withdrawal(amount: Int!, account_id: ID!): Withdrawal
  }

  type Query {
    user(id: ID!): User
  }
`
