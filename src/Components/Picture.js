import React from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './Picture.module.css'
import './PictureAnimations.css'

function Picture (props) {
  console.log(props)

  return (
    <div role='button' tabIndex='0' onKeyDown={null} onClick={props.newLink} className={styles.Picture}>
      <CSSTransition
        in={ !props.liked && !props.disliked }
        timeout={500}
        classNames={`fade-out-to-${props.liked ? 'right' : 'left'}`}
        onExited={props.newLink}
      >
        <img alt='' src={props.link}/>
      </CSSTransition>
    </div>
  )
}

export default React.memo(Picture)
