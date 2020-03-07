module.exports = {
  accounts: [{ id: 1, balance: 123, dailyLimit: 500, user_id: 123 }],
  transactions: [
    { account_id: 1, type: 'WITHDRAW', amount: 100 },
    { account_id: 1, type: 'DEPOSIT', amount: 200 },
  ],
  users: [{ id: 123, name: 'John Doe' }],
}
