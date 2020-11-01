import clsx from 'clsx'
import React, { useCallback } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import styles from './BottomMenu.module.css'

const MenuItem = (props) => {
  const history = useHistory()
  const match = useRouteMatch({
    path: props.to,
    exact: true
  })

  const go = useCallback(() => props.onClick?.() || match || history.push(props.to), [history, match, props])

  return (
    <div role='button' tabIndex={0} onKeyPress={go} onClick={go}
      className={clsx(styles.MenuItem, match && styles.Active, props.className)}>
      {props.icon}
      {props.text && <p>{props.text}</p>}
    </div>
  )
}

export default MenuItem
