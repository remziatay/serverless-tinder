import React from 'react'
import ImageSlot from './ImageSlot'
import styles from './ImagesInput.module.css'

const ImagesInput = () => {
  return (
    <div className={styles.Container}>
      {new Array(6).fill().map((image, i) => <ImageSlot key={i} />)}
    </div>
  )
}

export default ImagesInput
