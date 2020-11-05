import React, { useContext, useEffect, useState } from 'react'
import ImageSlot from './ImageSlot'
import styles from './ImagesInput.module.css'
import { LoadingOutlined } from '@ant-design/icons'
import { firestore, storage, UserContext } from '../../firebase'
import { v4 as uuidV4 } from 'uuid'
import TitleWithButton from '../TitleWithButton'
import ErrorDiv from '../PrefForm/ErrorDiv'

function storePictures (user, pictures) {
  if (user.isAnonymous) return
  const userRef = firestore.doc(`users/${user.uid}`)
  return userRef.update({ pictures })
}

const ImagesInput = (props) => {
  const { user, userInfo } = useContext(UserContext)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pictures, setPictures] = useState(new Array(6).fill(''))

  useEffect(() => {
    if (userInfo.pictures) setPictures(pictures => pictures.map((_, i) => userInfo.pictures[i]))
  }, [userInfo.pictures])

  const setPictureByIndex = (index) => (picture) => {
    setPictures(pictures => [...pictures.slice(0, index), picture, ...pictures.slice(index + 1)])
  }

  const save = async () => {
    setLoading(true)
    try {
      const ref = storage.ref('userPictures/')
      const randomFilename = type => `${user.uid}/${uuidV4()}.${type.match(/image\/(.*)/)[1]}`
      let pics = pictures.map(pic => {
        if (!pic.startsWith('blob')) return Promise.resolve(pic)
        return fetch(pic).then(r => r.blob())
          .then(blob => ref.child(randomFilename(blob.type)).put(blob))
      })
      pics = await Promise.all(pics)
        .then(pics => Promise.all(pics.map(pic => pic.ref?.getDownloadURL() || Promise.resolve(pic))))
      await storePictures(user, pics)
    } catch (error) {
      setError(error)
      setTimeout(() => setError(false), 2500)
      console.error('Something went wrong!', error)
    } finally {
      setLoading(false)
    }
  }

  const button = (
    <button onClick={save} disabled={loading}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 w-1/5 rounded focus:outline-none focus:shadow-outline' >
      {loading ? <LoadingOutlined spin style={{ color: 'red' }}/> : 'Save'}
    </button>
  )

  return (
    <>
      <TitleWithButton title='Your Pictures' button={button}/>
      {error && <ErrorDiv>{error.message}</ErrorDiv>}
      <div className={styles.Container}>
        {pictures.map((picture, i) => <ImageSlot key={picture || i} picture={picture} setPicture={setPictureByIndex(i)} />)}
      </div>
    </>
  )
}

export default ImagesInput
