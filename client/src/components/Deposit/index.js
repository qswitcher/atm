import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import useUser from '../../queries/user'
import { useHistory } from 'react-router-dom'

const DEPOSIT = gql`
  mutation Deposit($amount: Int!, $account_id: ID!) {
    deposit(amount: $amount, account_id: $account_id) {
      amount
    }
  }
`

const Deposit = () => {
  const [amount, setAmount] = useState('')
  const [deposit] = useMutation(DEPOSIT)
  const { loading, user, refetch } = useUser()

  const history = useHistory()

  if (loading) {
    return <div>Loading...</div>
  }

  const onSubmit = event => {
    event.preventDefault()
    deposit({
      variables: {
        account_id: user.account._id,
        amount: parseInt(amount, 10),
      },
    })
      .then(() => refetch())
      .then(() => history.push('/'))
  }

  return (
    <div>
      <h1>Enter Amount</h1>
      <form onSubmit={onSubmit}>
        <input
          type="number"
          value={amount}
          onChange={event => setAmount(event.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Deposit
