import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import useUser from '../../hooks/user'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Withdraw.css'

const WITHDRAW = gql`
  mutation Withdraw($amount: Int!, $account_id: ID!) {
    withdrawal(amount: $amount, account_id: $account_id) {
      amount
    }
  }
`

const Withdraw = () => {
  const [amount, setAmount] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [deposit] = useMutation(WITHDRAW)
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
      .catch(err => {
        if (err.graphQLErrors) {
          setErrorMsg(err.graphQLErrors[0].message)
        } else {
          setErrorMsg('Unexpected error')
        }
      })
  }

  return (
    <div className="Withdraw">
      <div className="Withdraw__row">How much to withdraw?</div>
      {errorMsg && <div className="Withdraw__row">{errorMsg}</div>}
      <form className="Withdraw__form" onSubmit={onSubmit}>
        <input
          placeholder="Amount to withdraw"
          className="Form__item"
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
      <Link className="Withdraw__link" to="/">
        Cancel
      </Link>
    </div>
  )
}

export default Withdraw
