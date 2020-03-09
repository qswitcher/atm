import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import useUser from '../../hooks/user'
import { useHistory } from 'react-router-dom'

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
    <div>
      <div>How much to withdraw?</div>
      <div>{errorMsg}</div>
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

export default Withdraw
