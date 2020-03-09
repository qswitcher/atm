import React from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../hooks/user'
import useLogout from '../../hooks/logout'

const Home = () => {
  const { loading, error, user } = useUser()
  const logout = useLogout()
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
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default Home
