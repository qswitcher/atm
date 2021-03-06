import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from '../Login'
import Home from '../Home'
import Deposit from '../Deposit'
import Withdraw from '../Withdraw'
import PrivateRoute from '../PrivateRoute'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/deposit">
            <Deposit />
          </PrivateRoute>
          <PrivateRoute path="/withdraw">
            <Withdraw />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  )
}

export default App
