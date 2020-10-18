import React, { useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './Picture.module.css'
import './PictureAnimations.css'

function Picture (props) {
  useEffect(() => console.log(props), [props])

  return (
    <div role='button' tabIndex='0' onKeyDown={null} onClick={props.newLink} className={styles.Picture}>
      <CSSTransition
        in={ !props.liked && !props.disliked }
        timeout={500}
        classNames={`fade-out-to-${props.liked ? 'right' : 'left'}`}
        onExited={props.newLink}
        unmountOnExit
      >
        {/* <p>{props.link}</p> */}
        <img style={{ border: '1px solid red', minWidth: '200px', minHeight: '200px' }} alt='' src={props.link}/>
      </CSSTransition>
    </div>
  )
}

export default Picture
