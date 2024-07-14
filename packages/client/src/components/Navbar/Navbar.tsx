import { FC, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { NAVIGATION_LINKS } from './constants'

import { logoutUserThunk } from 'app/redux/thunk/user/logoutUser'
import { useAppDispatch } from 'shared/redux'
import classes from './Navbar.module.scss'

/**
 *
 * isAuth will be refactor in future
 *
 */

export const Navbar: FC<{ isAuth?: boolean }> = ({ isAuth = true }) => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const [currentTab, setCurrentTab] = useState(pathname.slice(1) || 'game')

  const onClick = (tab: string) => {
    setCurrentTab(tab)
  }

  const onLogout = () => {
    dispatch(logoutUserThunk())
  }

  return (
    <nav className={classes.navbarWrapper}>
      <ul className={classes.navbarList}>
        {NAVIGATION_LINKS.map(item => (
          <li key={item.key}>
            <Link
              onClick={() => onClick(item.key)}
              className={`${classes.tab} ${
                currentTab && currentTab === item.key ? classes.tabActive : ''
              }`}
              to={item.link}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>

      {isAuth ? (
        <Link className={classes.exit} onClick={onLogout} to={'/login'}>
          Exit
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  )
}
