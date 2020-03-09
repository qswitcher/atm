const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const accounts = require('../data/accounts')
const transactions = require('../data/transactions')
const users = require('../data/users')

const resolvers = {
  Query: {
    user(obj, { id }) {
      return users.filter(u => u._id === id)[0]
    },
  },
  User: {
    account(obj) {
      return accounts.filter(({ user_id }) => user_id === obj._id)[0]
    },
  },
  Account: {
    balance({ _id }) {
      return transactions
        .filter(({ account_id }) => account_id === _id)
        .reduce((sum, { amount, type }) => {
          return sum + (type === 'WITHDRAWAL' ? -1 : 1) * amount
        }, 0)
    },
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() //value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value)
      }
      return null
    },
  }),
}

module.exports = resolvers
