import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import linesImg from 'shared/assets/images/Lines.svg'
import moonsImg from 'shared/assets/images/Moons.svg'

import classes from './GameStart.module.scss'

import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { fetchUserThunk, selectUser } from 'app/redux/slice/user'
import { PageInitArgs } from 'app/appRoutes'

export const GameStart: FC = () => {
  const [isFullScreen, setFullScreen] = useState(false)

  const onFullScreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      setFullScreen(true)
    } else {
      await document.exitFullscreen()
      setFullScreen(false)
    }
  }

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

      {isFullScreen ? (
        <FullscreenExitOutlined
          onClick={onFullScreen}
          className={classes.fullScreen}
        />
      ) : (
        <FullscreenOutlined
          onClick={onFullScreen}
          className={classes.fullScreen}
        />
      )}
    </div>
  )
}
