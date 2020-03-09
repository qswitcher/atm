import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) => {
      const user_id = localStorage.getItem('user_id')
      return user_id ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )
    }}
  />
)

export default PrivateRoute
