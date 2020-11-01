import React, { useContext } from 'react'
import PrefForm from '../Components/PrefForm/PrefForm'
import { UserContext } from '../firebase'

const Profile = (props) => {
  const user = useContext(UserContext)
  const name = user.displayName || user.email || user.phoneNumber || user.uid
  return (
    <>
      <PrefForm user={user}/>
    </>
  )
}

export default Profile
