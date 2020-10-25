import React, { useContext } from 'react'
import { UserContext } from '../firebase'

const Profile = (props) => {
  const user = useContext(UserContext)
  return (
    <p>{`Signed in as ${user.displayName || user.email || user.phoneNumber || user.uid}`}</p>
  )
}

export default Profile
