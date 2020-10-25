import { Button } from 'antd'
import React, { useContext, useEffect } from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { useHistory, useLocation } from 'react-router-dom'
import { auth, uiConfig, UserContext } from '../firebase'

const SignIn = () => {
  const user = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (!user || !location?.state) return
    const { from } = location.state
    if (from) history.replace(from)
  }, [history, location.state, user])

  return (
    user
      ? <>
        <p>You are already signed in!</p>
        <Button danger type="primary" size="large" shape="round" onClick={() => auth.signOut()}>Signout</Button>
      </>
      : <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
  )
}

export default SignIn
