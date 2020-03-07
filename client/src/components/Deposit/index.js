import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const UPDATE_ACCOUNT = gql`
  mutation UpdateAccount($id: ID!, $balance: Int!) {
    updateAccount(id: $id, balance: $balance) {
      id
      balance
    }
  }
`

const Deposit = () => {
  const [amount, setAmount] = useState('')
  const [updateAccount, data] = useMutation(UPDATE_ACCOUNT)

  const onSubmit = event => {
    event.preventDefault()
    const id = 123
    const balance = 123
    updateAccount({
      variables: {
        id,
        balance,
      },
    })
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
