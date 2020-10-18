import React from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import styles from './Picture.module.css'
import './PictureAnimations.css'

function Picture (props) {
  return (
    <div role='button' tabIndex='0' onKeyDown={null} onClick={props.newLink} className={styles.Picture}>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={props.link}
          timeout={500}
          classNames="fade"
        >
          <img alt='' src={props.link}/>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

export default Picture
