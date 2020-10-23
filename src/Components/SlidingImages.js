import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './SlidingImages.module.css'
import './PictureAnimations.css'
import { Image, Spin } from 'antd'

function SlidingImages (props) {
  const [animation, setAnimation] = useState('')

  useEffect(() => {
    if (!props.previous && !props.next) return
    setAnimation(`fade-out-to-${props.next ? 'top' : 'bottom'}`)
  }, [props.next, props.previous])

  return (
    <CSSTransition
      in={ !props.previous && !props.next }
      timeout={250}
      classNames={animation}
      onExited={props.slide}
    >
      <Image
        alt=''
        className={styles.Container}
        src={props.link}
        preview={false}
        placeholder={<Spin tip='Loading...'/>}
      />
    </CSSTransition>
  )
}

export default SlidingImages
