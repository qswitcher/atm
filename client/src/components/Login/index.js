import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useHistory } from 'react-router-dom'

const LOGIN = gql`
  mutation login($username: ID!, $pin: String!) {
    login(username: $username, pin: $pin)
  }
`

const Login = props => {
  const [pin, setPin] = useState('')
  const [username, setUsername] = useState('')
  const history = useHistory()
  let errorMsg = ''

  const [login, { loading, error, data }] = useMutation(LOGIN, {
    errorPolicy: 'all',
    onError: () => {}, // don't blow up on errors
    onCompleted: data => {
      localStorage.setItem('user_id', data.login)
      console.log(props)
      const { state } = props
      if (state && state.from) {
        history.push(state.from)
      } else {
        history.push('/')
      }
    },
  })

  if (error) {
    errorMsg = 'Invalid username or pin'
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const onSubmit = event => {
    event.preventDefault()
    login({
      variables: {
        username,
        pin,
      },
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div>{errorMsg}</div>
      <div>{loading}</div>
      <div>{JSON.stringify(data)}</div>
      <label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={event => setUsername(event.target.value)}
          placeholder="Username"
        />
      </label>
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
