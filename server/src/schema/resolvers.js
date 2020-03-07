const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const account = require('../data/account')
const transactions = require('../data/transactions')

const resolvers = {
  Query: {
    user(obj, args) {
      return { _id: 123, name: 'Bob', account }
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
