const { AuthenticationError, UserInputError } = require('apollo-server')
const transactions = require('../data/transactions')
const account = require('../data/account')
const isToday = require('date-fns/isToday')

const mutations = {
  Mutation: {
    login(_, { pin }) {
      if (pin === '1234') {
        return 123
      } else {
        throw new AuthenticationError('Unauthorized')
      }
    },
    withdrawal(_, { amount, account_id }) {
      // lookup account, you would do this with a database
      if (account._id !== account_id) {
        throw new Error('Account not found')
      }

      // check limit
      const total = transactions
        .filter(({ date, type }) => type === 'WITHDRAWAL' && isToday(date))
        .map(({ amount }) => amount)
        .reduce((sum, value) => sum + value, 0)

      if (total + amount > account.limit) {
        throw new UserInputError(
          `Daily limit exceeded by ${total + amount - account.limit}`,
          {
            accountLimit: account.limit,
            withdrawalTotal: total,
          },
        )
      }

      // record transaction, this would be done in a database
      transactions.push({
        account_id,
        amount,
        date: new Date(),
        type: 'WITHDRAWAL',
      })

      return { amount }
    },
    deposit(_, { amount, account_id }) {
      // lookup account, you would do this with a database
      if (account._id !== account_id) {
        throw new Error('Account not found')
      }

      // record transaction, this would be done in a database
      transactions.push({
        account_id,
        amount,
        date: new Date(),
        type: 'DEPOSIT',
      })

      return { amount }
    },
  },
}

module.exports = mutations
