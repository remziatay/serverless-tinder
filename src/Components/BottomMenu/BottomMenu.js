import React from 'react'
import styles from './BottomMenu.module.css'

const BottomMenu = (props) => {
  return (
    <div className={styles.Menu}>
      {props.children}
    </div>
  )
}

export default BottomMenu
