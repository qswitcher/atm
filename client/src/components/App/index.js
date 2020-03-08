import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from '../Login'
import Home from '../Home'
import Deposit from '../Deposit'
import Withdraw from '../Withdraw'

function App() {
  const [user_id, setUserID] = useState()
  return (
    <Router>
      {user_id && (
        <Switch>
          <Route path="/deposit">
            <Deposit user_id={user_id} />
          </Route>
          <Route path="/withdraw">
            <Withdraw user_id={user_id} />
          </Route>
          <Route path="/login">
            <Login onLogin={u => setUserID(u)} />
          </Route>
          <Route>
            <Home user_id={user_id} onLogout={() => setUserID(null)} />
          </Route>
        </Switch>
      )}
      {!user_id && <Login onLogin={u => setUserID(u)} />}
    </Router>
  )
}

export default App
