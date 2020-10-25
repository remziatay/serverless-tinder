import { Button } from 'antd'
import React, { useContext } from 'react'
import { auth, UserContext } from '../firebase'

const Profile = (props) => {
  const user = useContext(UserContext)
  return (
    <>
      <p>{`Signed in as ${user.displayName || user.email || user.phoneNumber || user.uid}`}</p>
      <Button danger type="primary" size="large" shape="round" onClick={() => auth.signOut()}>Signout</Button>
    </>
  )
}

export default Profile
