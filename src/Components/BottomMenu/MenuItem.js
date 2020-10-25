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

  const go = useCallback(() => match || history.push(props.to), [history, match, props.to])

  return (
    <div role='button' tabIndex={0} onKeyPress={go} onClick={go}
      className={clsx(styles.MenuItem, match && styles.Active)}>
      {props.icon}
      <p>{props.text}</p>
    </div>
  )
}

export default MenuItem
