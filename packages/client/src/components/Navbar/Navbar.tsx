import { FC, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { NAVIGATION_LINKS } from './constants'

import classes from './Navbar.module.scss'

/**
 *
 * isAuth will be refactor in future
 *
 */

export const Navbar: FC<{ isAuth?: boolean }> = ({ isAuth = true }) => {
  const { pathname } = useLocation()

  const [currentTab, setCurrentTab] = useState(pathname.slice(1) || 'game')

  function onClick(tab: string) {
    setCurrentTab(tab)
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
        <Link className={classes.exit} to="/">
          Exit
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  )
}
