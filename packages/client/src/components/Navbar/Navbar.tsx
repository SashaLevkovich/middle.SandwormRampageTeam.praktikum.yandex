import { FC } from 'react'
import { Link } from 'react-router-dom'
import classes from './Navbar.module.scss'

/**
 *
 * isAuth will be refactor in future
 *
 */

export const Navbar: FC<{ isAuth?: boolean }> = ({ isAuth = true }) => {
  return (
    <nav className={classes.navbarWrapper}>
      <ul className={classes.navbarList}>
        <li>
          <Link className={classes.tab} to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className={classes.tab} to="/">
            Game
          </Link>
        </li>
        <li>
          <Link className={classes.tab} to="/forum">
            Forum
          </Link>
        </li>
        <li>
          <Link className={classes.tab} to="/leaderboard">
            Leaderboard
          </Link>
        </li>
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
