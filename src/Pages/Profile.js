import React, { useContext } from 'react'
import ImagesInput from '../Components/ImagesInput/ImagesInput'
import PrefForm from '../Components/PrefForm/PrefForm'
import { UserContext } from '../firebase'

const Profile = () => {
  const { user, userInfo } = useContext(UserContext)

  return (
    <>
      {user.isAnonymous &&
      <h2 className='text-xlg text-center'>Please remember that guests can't save any data or match with anyone<span role='img' aria-label='sad-face'>🤷‍♂️ </span></h2>
      }

      <div className='w-full flex gap-5 py-5 flex-col md:flex-row justify-center items-center md:items-start'>
        <div className='flex-1 max-w-lg w-full'>
          <ImagesInput/>
        </div>
        <div className='flex-1 w-full max-w-xl'>
          <PrefForm user={user} userInfo={userInfo}/>
        </div>
      </div>
    </>
  )
}

export default Profile
