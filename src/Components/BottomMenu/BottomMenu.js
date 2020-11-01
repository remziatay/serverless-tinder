import { ArrowLeftOutlined, ArrowRightOutlined, LogoutOutlined } from '@ant-design/icons'
import { useToggle } from 'ahooks'
import clsx from 'clsx'
import React, { useContext } from 'react'
import { auth, UserContext } from '../../firebase'
import styles from './BottomMenu.module.css'
import MenuItem from './MenuItem'

const BottomMenu = (props) => {
  const [collapsed, { toggle: toggleCollapse }] = useToggle(true)
  const user = useContext(UserContext)
  return (
    <div className={clsx(styles.Menu, collapsed && styles.Collapsed)}>
      {props.children}
      { user &&
        <MenuItem className="text-red-700" onClick={() => auth.signOut()}
          text="Logout" icon={<LogoutOutlined/>}
        />
      }
      <MenuItem className={clsx(styles.Collapse, 'justify-center')} onClick={toggleCollapse}
        icon={collapsed ? <ArrowLeftOutlined/> : <ArrowRightOutlined/>}
      />
    </div>
  )
}

export default BottomMenu
