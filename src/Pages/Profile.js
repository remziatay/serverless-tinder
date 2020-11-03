import React, { useContext } from 'react'
import PrefForm from '../Components/PrefForm/PrefForm'
import { UserContext } from '../firebase'

const Profile = (props) => {
  const { user, userInfo } = useContext(UserContext)

  const name = userInfo.name || user.displayName || user.email || user.phoneNumber || user.uid
  return (
    <>
      {user.isAnonymous &&
      <h2 className='text-xlg text-center'>Please remember that guests can't save any data or match with anyone<span role='img' aria-label='sad-face'>🤷‍♂️ </span></h2>
      }
      <PrefForm user={user} userInfo={userInfo}/>

      {/* <div className='w-full flex gap-2 py-5 flex-col md:flex-row mx-auto'>
        <div className='border-4 border-black shadow flex-1'>{name}</div>
        <PrefForm user={user} userInfo={userInfo}/>
      </div> */}
    </>
  )
}

export default Profile
