import React from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../queries/user'

const Home = ({ user_id, onLogout }) => {
  const { loading, error, user } = useUser(user_id)
  if (loading) {
    return <div>{'Loading....'}</div>
  }
  if (error) {
    return <div>{'Whoopsie!'}</div>
  }

  const { balance } = user.account

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
