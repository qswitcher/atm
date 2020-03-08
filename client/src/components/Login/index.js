import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const LOGIN = gql`
  mutation login($pin: String!) {
    login(pin: $pin)
  }
`

const Login = ({ onLogin }) => {
  const [pin, setPin] = useState('')
  const [login, { loading, data }] = useMutation(LOGIN, {
    onCompleted: data => {
      onLogin(data.login)
    },
  })

  if (loading) {
    return <div>Loading...</div>
  }

  const onSubmit = event => {
    event.preventDefault()
    login({
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
