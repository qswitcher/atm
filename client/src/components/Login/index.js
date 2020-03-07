import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const LOGIN = gql`
  query Login($pin: ID!) {
    User(id: $pin) {
      name
      id
    }
  }
`

const Login = ({ onLogin }) => {
  const [pin, setPin] = useState('')
  const [getUser, { loading, data }] = useLazyQuery(LOGIN, {
    onCompleted: data => {
      onLogin(data.User)
    },
  })

  const onSubmit = event => {
    event.preventDefault()
    getUser({
      variables: {
        pin,
      },
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div>{loading}</div>
      <div>{JSON.stringify(data)}</div>
      <label>
        <input
          type="password"
          name="pin"
          value={pin}
          onChange={event => setPin(event.target.value)}
          placeholder="Enter pin..."
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Login
