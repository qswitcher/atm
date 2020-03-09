import React from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../hooks/user'
import useLogout from '../../hooks/logout'
import './Home.css'

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
    <div className="Home">
      <div className="Home__row">{`Hello ${user.name}!`}</div>
      <div className="Home__row">{`Balance: $${balance}`}</div>
      <Link className="Home__link" to="/withdraw">
        Withdraw
      </Link>
      <Link className="Home__link" to="/deposit">
        Deposit
      </Link>
      <button className="Home__link" onClick={() => logout()}>
        Logout
      </button>
    </div>
  )
}

export default Home
