import React from 'react'
import styles from './Picture.module.css'

function Picture (props) {
  const width = props.width || 300
  const height = props.height || width
  return (
    <div className={styles.Picture}>
      <img alt='' src={`https://via.placeholder.com/${width}x${height}.png`}/>
    </div>
  )
}

export default Picture
