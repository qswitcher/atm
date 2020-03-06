import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ onLogout }) => {
  const balance = 100
  return (
    <div>
      <div>{`Balance: ${balance}`}</div>
      <Link to="/withdraw">Withdraw</Link>
      <Link to="/deposit">Deposit</Link>
      <button onClick={() => onLogout()}>Logout</button>
    </div>
  )
}

export default Home
