import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import Profile from './Pages/Profile'
import PrivateRoute from './Components/PrivateRoute'
import BottomMenu from './Components/BottomMenu/BottomMenu'
import MenuItem from './Components/BottomMenu/MenuItem'
import { HeartFilled, HomeFilled, SmileFilled } from '@ant-design/icons'

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

      <BottomMenu>
        <MenuItem to='/' active icon={<HomeFilled/>} text='Home'/>
        <MenuItem to='/profile' icon={<SmileFilled/>} text='Profile'/>
        <MenuItem to='/matches' icon={<HeartFilled/>} text='Matches'/>
      </BottomMenu>

    </Router>
  )
}

export default App
