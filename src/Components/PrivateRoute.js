import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from '../firebase'

const PrivateRoute = ({ children, ...rest }) => {
  const user = useContext(UserContext)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user
          ? children
          : (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: location }
              }}
            />
          )
      }
    />
  )
}

export default PrivateRoute
