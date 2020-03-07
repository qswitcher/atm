import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_ACCOUNTS = gql`
  query GetAccount($user_id: ID) {
    allAccounts(filter: { user_id: $user_id }) {
      balance
    }
  }
`

const Home = ({ user, onLogout }) => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS, {
    variables: { user_id: user.id },
  })
  if (loading) {
    return <div>{'Loading....'}</div>
  }
  if (error) {
    return <div>{'Whoopsie!'}</div>
  }
  if (data.allAccounts.length === 0) {
    return <div>{'No accounts found!'}</div>
  }

  const { balance } = data.allAccounts[0]

  return (
    <div>
      <div>{`Hello ${user.name}!`}</div>
      <div>{`Balance: ${balance}`}</div>
      <Link to="/withdraw">Withdraw</Link>
      <Link to="/deposit">Deposit</Link>
      <button onClick={() => onLogout()}>Logout</button>
    </div>
  )
}

export default Home
