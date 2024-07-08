import { FC, Suspense, useEffect, useState } from 'react'

import { geolocationApi } from 'app/api'

import LazyGameEngine from 'features/GameEngine'

import CrossImg from 'shared/assets/icons/cross.svg'
import sandGrey from 'shared/assets/images/SandGrey.svg'
import sandOrange from 'shared/assets/images/SandOrange.svg'
import sandYellow from 'shared/assets/images/SandYellow.svg'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import styles from './Game.module.scss'

export const Game: FC = () => {
  const [geolocation, setGeolocation] = useState([''])
  const [isGeolocationOpened, setIsGeolocationOpened] = useState(true)

  const onSuccess = async (position: GeolocationPosition) => {
    const res = await geolocationApi({
      params: {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        format: 'json',
      },
    })
    const {
      address: { city, country, road, house_number, postcode },
    } = res.data
    setGeolocation([
      `Country: ${country}`,
      `City: ${city}`,
      `Address: ${road}, ${house_number}`,
      `Postcode: ${postcode}`,
    ])
  }

  const onError = (error: unknown) => {
    console.error(error)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [isGeolocationOpened])

  return (
    <div className={styles.gameContainer}>
      {geolocation.length > 1 && isGeolocationOpened && (
        <div className={styles.geolocation}>
          <h3>Your position:</h3>
          {geolocation.map(row => (
            <p>{row}</p>
          ))}
          <img
            className={styles.geolocationCross}
            src={CrossImg}
            alt="cross"
            onClick={() => setIsGeolocationOpened(false)}
          />
        </div>
      )}

      <Suspense
        fallback={
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        }>
        <LazyGameEngine />
      </Suspense>

      <div className={styles.greySandImage}>
        <img src={sandGrey} alt="sandGrey" />
      </div>
      <div className={styles.yellowSandImage}>
        <img src={sandYellow} alt="sandYellow" />
      </div>
      <div className={styles.orangeSandImage}>
        <img src={sandOrange} alt="sandOrange" />
      </div>
    </div>
  )
}
