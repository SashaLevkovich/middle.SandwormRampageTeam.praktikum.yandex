import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './Navbar.module.scss'
import { items } from './constants'

/**
 *
 * isAuth will be refactor in future
 *
 */

export const Navbar: FC<{ isAuth?: boolean }> = ({ isAuth = true }) => {
  const [currentTab, setCurrentTab] = useState('game')

  function onClick(tab: string) {
    setCurrentTab(tab)
  }

  return (
    <nav className={classes.navbarWrapper}>
      <ul className={classes.navbarList}>
        {items.map(item => (
          <li key={item.key}>
            <Link
              onClick={() => onClick(item.key)}
              className={`${classes.tab} ${
                currentTab === item.key ? classes.tabActive : ''
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
