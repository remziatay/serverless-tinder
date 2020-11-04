import React, { useContext } from 'react'
import ImagesInput from '../Components/ImagesInput/ImagesInput'
import PrefForm from '../Components/PrefForm/PrefForm'
import { UserContext } from '../firebase'

const Profile = (props) => {
  const { user, userInfo } = useContext(UserContext)

  // const name = userInfo.name || user.displayName || user.email || user.phoneNumber || user.uid
  return (
    <>
      {user.isAnonymous &&
      <h2 className='text-xlg text-center'>Please remember that guests can't save any data or match with anyone<span role='img' aria-label='sad-face'>🤷‍♂️ </span></h2>
      }

      <div className='w-full flex gap-5 py-5 flex-col md:flex-row justify-center items-center md:items-start'>
        <div className='flex-1 max-w-lg w-full'>
          <h2 className='text-2xl font-semibold border-b tracking-wide'>Your Pictures</h2>
          <ImagesInput/>
        </div>
        <div className='flex-1 w-full max-w-xl'>
          <h2 className='text-2xl font-semibold border-b tracking-wide'>Your Data</h2>
          <PrefForm user={user} userInfo={userInfo}/>
        </div>
      </div>
    </>
  )
}

export default Profile
