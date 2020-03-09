import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import useUser from '../../hooks/user'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Deposit.css'

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
    <div className="Deposit">
      <div className="Deposit__row">How much to deposit?</div>
      <form className="Deposit__form" onSubmit={onSubmit}>
        <input
          className="Form__item"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={event => setAmount(event.target.value)}
        />
        <input
          className="Form__item Form__button"
          type="submit"
          value="Submit"
        />
      </form>
      <Link className="Deposit__link" to="/">
        Cancel
      </Link>
    </div>
  )
}

export default Deposit
