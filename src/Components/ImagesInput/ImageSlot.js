import React from 'react'
import styles from './ImagesInput.module.css'

const emptyBackground = 'radial-gradient(circle, rgba(66,153,225,1) 0%, rgba(43,108,176,1) 100%)'

const ImageSlot = ({ picture, setPicture }) => {
  const backgroundImage = picture ? `url(${picture})` : emptyBackground

  return (
    <button
      className={styles.Image}
      style={{ backgroundImage, paddingBottom: '100%' }}
    >
      <input type="file" onChange={e => setPicture(URL.createObjectURL(e.target.files[0])) }/>
    </button>
  )
}

// URL.createObjectURL(img)

export default ImageSlot
