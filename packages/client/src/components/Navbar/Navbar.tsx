import { FC, useEffect, useState } from 'react'
import { Switch } from 'antd'
import { MoonFilled, SunFilled } from '@ant-design/icons'

import { Link, useLocation } from 'react-router-dom'

import { NAVIGATION_LINKS } from './constants'

import { logoutUserThunk } from 'app/redux/thunk/user/logoutUser'
import { useAppDispatch } from 'shared/redux'
import classes from './Navbar.module.scss'
import { THEME } from 'shared/constants/theme'

/**
 *
 * isAuth will be refactor in future
 *
 */

export const Navbar: FC<{ isAuth?: boolean }> = ({ isAuth = true }) => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const [currentTab, setCurrentTab] = useState(pathname.slice(1) || 'game')
  const [theme, setTheme] = useState('light')

  const onClick = (tab: string) => {
    setCurrentTab(tab)
  }

  useEffect(() => {
    const lsTheme = localStorage.getItem('theme')
    if (lsTheme !== null) {
      setTheme(lsTheme)
    } else {
      localStorage.setItem('theme', theme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const onChangeTheme = (value: boolean) => {
    setTheme(value ? THEME.DARK : THEME.LIGHT)
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

      <Switch
        onChange={onChangeTheme}
        checkedChildren={<MoonFilled />}
        unCheckedChildren={<SunFilled />}
        checked={theme === THEME.DARK}
      />

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
