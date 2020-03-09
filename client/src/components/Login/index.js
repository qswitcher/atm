import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useHistory } from 'react-router-dom'

const LOGIN = gql`
  mutation login($pin: String!) {
    login(pin: $pin)
  }
`

const Login = props => {
  const [pin, setPin] = useState('')
  const [username, setUsername] = useState('')
  const history = useHistory()

  const [login, { loading, data }] = useMutation(LOGIN, {
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
