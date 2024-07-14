import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'

import { authRequests, oAuthRequests } from 'app/api'
import { setLocalStorageUser } from 'shared/utils/userLocalStorage'
import { getOAuthCodeFromUrl } from 'shared/helpers/getOAuthCodeFromUrl'
import { HttpStatuses } from 'shared/constants/httpStatuses'
import linesImg from 'shared/assets/images/Lines.svg'
import moonsImg from 'shared/assets/images/Moons.svg'

import classes from './GameStart.module.scss'
import { AxiosError } from 'axios'

export const GameStart: FC = () => {
  const [isFullScreen, setFullScreen] = useState(false)

  useEffect(() => {
    if (window?.location.search.match('code')) {
      const getUser = async () => {
        try {
          const { data } = await authRequests.getUser()
          setLocalStorageUser(data)
        } catch (ex) {
          console.log(ex)
        }
      }

      const oAuthSignIn = async () => {
        try {
          const response = await oAuthRequests.oAuthSignIn(
            getOAuthCodeFromUrl(window.location.search)
          )
          if (response.status === HttpStatuses.OK) {
            getUser()
          }
        } catch (ex) {
          if (
            ex instanceof AxiosError &&
            ex?.response?.status === HttpStatuses.BAD_REQUEST
          ) {
            getUser()
          }
        }
      }

      oAuthSignIn()
    }
  }, [])

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
