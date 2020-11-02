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
import Matches from './Pages/Matches'

function App () {
  const user = useContext(UserContext)

  return (
    <Router basename="serverless-tinder">
      <div className='flex flex-col max-h-screen h-screen md:flex-row'>
        <div className='flex-auto overflow-y-auto py-2 px-1'>
          <Switch>
            <Route path="/signin">
              <SignIn/>
            </Route>
            <PrivateRoute path="/profile">
              <Profile/>
            </PrivateRoute>
            <PrivateRoute path="/matches">
              <Matches/>
            </PrivateRoute>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
        <BottomMenu>
          { user
            ? <MenuItem to={'/profile'} icon={<SmileFilled/>} text='Profile'/>
            : <MenuItem to={'/signin'} icon={<LoginOutlined/>} text='Login'/>
          }
          <MenuItem to='/' active icon={<HomeFilled/>} text='Home'/>
          <MenuItem to='/matches' icon={<HeartFilled/>} text='Matches'/>
        </BottomMenu>
      </div>

    </Router>
  )
}

export default App
