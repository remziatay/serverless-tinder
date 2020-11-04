import React, { useState } from 'react'
import styles from './ImagesInput.module.css'

const ImageSlot = ({ image }) => {
  const [img, setImg] = useState(null)

  const backgroundImage = (img || image) ? `url(${(img && URL.createObjectURL(img)) || image}`
    : 'radial-gradient(circle, rgba(66,153,225,1) 0%, rgba(43,108,176,1) 100%)'

  return (
    <button
      className={styles.Image}
      style={{ backgroundImage, paddingBottom: '100%' }}
    >
      <input type="file" onChange={e => setImg(e.target.files[0]) }/>
    </button>
  )
}

export default ImageSlot
