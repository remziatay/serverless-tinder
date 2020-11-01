import React, { useContext } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import Profile from './Pages/Profile'
import PrivateRoute from './Components/PrivateRoute'
import BottomMenu from './Components/BottomMenu/BottomMenu'
import MenuItem from './Components/BottomMenu/MenuItem'
import { HeartFilled, HomeFilled, LoginOutlined, SmileFilled } from '@ant-design/icons'
import { UserContext } from './firebase'

function App () {
  const user = useContext(UserContext)

  return (
    <Router basename="serverless-tinder">
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
        { user
          ? <MenuItem to={'/profile'} icon={<SmileFilled/>} text='Profile'/>
          : <MenuItem to={'/signin'} icon={<LoginOutlined/>} text='Login'/>
        }
        <MenuItem to='/' active icon={<HomeFilled/>} text='Home'/>
        <MenuItem to='/matches' icon={<HeartFilled/>} text='Matches'/>
      </BottomMenu>

    </Router>
  )
}

export default App
