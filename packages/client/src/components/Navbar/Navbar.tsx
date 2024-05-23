import { FC } from 'react'
import { Link } from 'react-router-dom'

/**
 *
 * isAuth will be refactor in future
 *
 */

export const Navbar: FC<{ isAuth?: boolean }> = ({ isAuth = true }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/">Game</Link>
        </li>
        <li>
          <Link to="/forum">Forum</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
      </ul>

      {isAuth ? <button>Exit</button> : <Link to="/login">Login</Link>}
    </nav>
  )
}
