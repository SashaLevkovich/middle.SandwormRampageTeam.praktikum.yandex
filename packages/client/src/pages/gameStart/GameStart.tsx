import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'

import { authRequests, oAuthRequests } from 'app/api'

import linesImg from 'shared/assets/images/Lines.svg'
import moonsImg from 'shared/assets/images/Moons.svg'

import classes from './GameStart.module.scss'
import { setLocalStorageUser } from 'shared/utils/userLocalStorage'

export const GameStart: FC = () => {
  const [isFullScreen, setFullScreen] = useState(false)

  useEffect(() => {
    if (window && window.location.search.match('code') !== null) {
      const data: { [index: string]: string } = {}
      const oAuthParamsStringsArr = window.location.search.slice(1).split('&')
      oAuthParamsStringsArr.forEach(item => {
        const [name, value] = item.split('=')
        data[name] = value
      })

      const getUser = () => {
        authRequests.getUser().then(resp => {
          setLocalStorageUser(resp.data)
        })
      }

      oAuthRequests
        .oAuthSignIn(data['code'])
        .then(resp => {
          if (resp.status === 200) {
            getUser()
          }
        })
        .catch(error => {
          if (error.response.status === 400) {
            getUser()
          }
        })
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
