const { AuthenticationError, UserInputError } = require('apollo-server')
const transactions = require('../data/transactions')
const accounts = require('../data/accounts')
const isToday = require('date-fns/isToday')
const users = require('../data/users')
const bcrypt = require('bcrypt')

const mutations = {
  Mutation: {
    login(_, { username, pin }) {
      const user = users.filter(u => u.username === username)[0]
      if (!user) {
        throw new AuthenticationError('Unauthorized')
      }
      // check pin
      return new Promise((resolve, reject) => {
        bcrypt.compare(pin, user.pin).then(result => {
          if (result) {
            resolve(user._id)
          } else {
            reject(new AuthenticationError('Unauthorizaed'))
          }
        })
      })
    },
    withdrawal(_, { amount, account_id }) {
      // lookup account, you would do this with a database
      const account = accounts.filter(({ _id }) => account_id === _id)[0]
      if (!account) {
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
      const account = accounts.filter(({ _id }) => account_id === _id)[0]
      if (!account) {
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
