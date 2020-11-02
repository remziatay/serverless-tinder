import React, { useContext } from 'react'
import PrefForm from '../Components/PrefForm/PrefForm'
import { UserContext } from '../firebase'

const Profile = (props) => {
  const { user, userInfo } = useContext(UserContext)

  // const name = user.displayName || user.email || user.phoneNumber || user.uid
  return (
    <>
      {user.isAnonymous &&
      <h2 className='text-xlg text-center pt-2 pr-4'>Please remember that guests can't save any data or match with anyone<span role='img' aria-label='sad-face'>🤷‍♂️ </span></h2>
      }
      <PrefForm user={user} userInfo={userInfo}/>

      {/* <div className='grid grid-rows-2 md:grid-cols-2'>
        <div className='border-4 border-black shadow'>{name}</div>
        <PrefForm user={user}/>
      </div> */}
    </>
  )
}

export default Profile
