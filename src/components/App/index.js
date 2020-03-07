import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from '../Login'
import Home from '../Home'
import Deposit from '../Deposit'

function App() {
  const [user, setUser] = useState()
  return (
    <Router>
      {user && (
        <Switch>
          <Route path="/deposit">
            <Deposit />
          </Route>
          <Route>
            <Home user={user} onLogout={() => setUser(null)} />
          </Route>
        </Switch>
      )}
      {!user && <Login onLogin={u => setUser(u)} />}
    </Router>
  )
}

export default App
