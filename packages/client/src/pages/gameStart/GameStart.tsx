import { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { userIsAuth } from 'shared/utils/userLocalStorage'

import classes from './GameStart.module.scss'
import linesImg from '../../shared/assets/images/Lines.svg'
import moonsImg from '../../shared/assets/images/Moons.svg'

export const GameStart: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!userIsAuth()) {
      navigate('/login')
    }
  }, [localStorage])

  return (
    <div className={classes.startPageWrapper}>
      <div className={classes.absoluteWrapper}>
        <div className={classes.blackCircle} />
        <div className={classes.orangeCircle} />
        <div className={classes.orangeCircleThin} />
        <div className={classes.orangeCircleThinBig} />
        <img className={classes.lines} src={linesImg} alt="pattern" />
        <img className={classes.moons} src={moonsImg} alt="moons" />
      </div>
      <Link className={classes.startPageWrapperTitle} to="game">
        Start
      </Link>
    </div>
  )
}
