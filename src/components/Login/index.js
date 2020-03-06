import React, { useState } from 'react'

const Login = ({ onLogin }) => {
  const [pin, setPin] = useState('')

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        onLogin({ user: 'bob' })
      }}
    >
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
