import { Image, Spin } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './Picture.module.css'
import './PictureAnimations.css'

function Picture (props) {
  const [animation, setAnimation] = useState('')
  const [animating, setAnimating] = useState(true)

  useEffect(() => {
    if (!props.disliked && !props.liked) return setAnimating(false)
    setAnimation(`fade-out-to-${props.liked ? 'right' : 'left'}`)
  }, [props.liked, props.disliked])

  const _newLink = props.newLink
  const newLink = useCallback(() => {
    setAnimating(true)
    _newLink()
  }, [_newLink])

  const lastTouch = useRef(null)

  const touchStart = useCallback(evt => {
    lastTouch.current = { x: evt.changedTouches[0].clientX, y: evt.changedTouches[0].clientY }
  }, [])

  const { like, dislike } = props
  const touchEnd = useCallback(evt => {
    const dx = evt.changedTouches[0].clientX - lastTouch.current.x
    const dy = evt.changedTouches[0].clientY - lastTouch.current.y
    lastTouch.current = null

    if (Math.abs(dy) < window.innerHeight / 30) {
      const slideLimit = window.innerWidth / 10
      dx > slideLimit ? like() : dx < -slideLimit && dislike()
    } else {
      /* const slideLimit = window.innerHeight / 10
      dy < -slideLimit ? slideNext() : dy > slideLimit && slidePrevious() */
    }
  }, [like, dislike])

  return (props.link &&
    <div className={styles.Picture} onTouchStart={touchStart} onTouchEnd={touchEnd} >
      <CSSTransition
        in={ !props.liked && !props.disliked }
        timeout={500}
        classNames={animation}
        onExited={newLink}
      >
        {animating ? <p>☺</p> /* Dummy element */
          : <Image
            alt=''
            className={styles.Container}
            src={props.link}
            preview={false}
            placeholder={<Spin tip='Loading...'/>}
          />
        }
      </CSSTransition>
    </div>
  )
}

export default React.memo(Picture)
