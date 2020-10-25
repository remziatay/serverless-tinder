import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import Profile from './Pages/Profile'
import PrivateRoute from './Components/PrivateRoute'

function App () {
  return (
    <Router>
      <Switch>

        <Route path="/signin">
          <SignIn/>
        </Route>

        <PrivateRoute path="/profile">
          <Profile/>
        </PrivateRoute>

        <Route path="/">
          <Home/>
        </Route>

      </Switch>
    </Router>
  )
}

export default App
