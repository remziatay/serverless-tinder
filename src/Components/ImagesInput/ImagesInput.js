import clsx from 'clsx'
import React from 'react'
import styles from './ImagesInput.module.css'

const randomImage = () => {
  const link = `https://via.placeholder.com/${300 + Math.round(Math.random() * 1000)}x${300 + Math.round(Math.random() * 1000)}.png`
  const image = new Image()
  image.src = link
  return link
}

const ImagesInput = () => {
  return (
    <div className={'grid grid-cols-3 grid-rows-3'}>
      <div className={clsx(styles.Image, 'col-span-2 row-span-2')} style={{ backgroundImage: `url(${randomImage()})` }}/>
      <div className={styles.Image} style={{ backgroundImage: `url(${randomImage()})` }}/>
      <div className={styles.Image} style={{ backgroundImage: `url(${randomImage()})` }}/>
      <div className={styles.Image} style={{ backgroundImage: `url(${randomImage()})` }}/>
      <div className={styles.Image} style={{ backgroundImage: `url(${randomImage()})` }}/>
      <div className={styles.Image} style={{ backgroundImage: `url(${randomImage()})` }}/>
    </div>
  )
}

export default ImagesInput
