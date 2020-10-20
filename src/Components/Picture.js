import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './Picture.module.css'
import './PictureAnimations.css'
import SlidingImages from './SlidingImages'

function Picture (props) {
  const [animation, setAnimation] = useState('')

  useEffect(() => {
    if (!props.disliked && !props.liked) return
    setAnimation(`fade-out-to-${props.liked ? 'right' : 'left'}`)
  }, [props.liked, props.disliked])

  return (props.link &&
    <div role='button' tabIndex='0' onKeyDown={null} onClick={props.newLink} className={styles.Picture}>
      <CSSTransition
        in={ !props.liked && !props.disliked }
        timeout={500}
        classNames={animation}
        onExited={props.newLink}
      >
        <SlidingImages link={props.link}
          previous={props.previous}
          next={props.next}
          slide={props.slide}/>
      </CSSTransition>
    </div>
  )
}

export default React.memo(Picture)
