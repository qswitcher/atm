const subDays = require('date-fns/subDays')

module.exports = [
  {
    account_id: '456',
    amount: 12000,
    type: 'DEPOSIT',
    date: subDays(new Date(), 5),
  },
  {
    account_id: '456',
    amount: 200,
    type: 'WITHDRAWAL',
    date: subDays(new Date(), 4),
  },
  {
    account_id: '456',
    amount: 300,
    type: 'DEPOSIT',
    date: subDays(new Date(), 1),
  },
  {
    account_id: '456',
    amount: 10,
    type: 'DEPOSIT',
    date: subDays(new Date(), 1),
  },
]
