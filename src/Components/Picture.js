import React from 'react'
import styles from './Picture.module.css'

function Picture (props) {
  return (
    <div role='button' tabIndex='0' onKeyDown={null} onClick={props.newLink} className={styles.Picture}>
      <img alt='' src={props.link}/>
    </div>
  )
}

export default Picture
