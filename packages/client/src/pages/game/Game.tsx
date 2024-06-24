import { GameEngine } from 'features/GameEngine'
import { FC } from 'react'
import styles from './Game.module.scss'
import sandGrey from 'shared/assets/images/SandGrey.svg'
import sandYellow from 'shared/assets/images/SandYellow.svg'
import sandOrange from 'shared/assets/images/SandOrange.svg'

export const Game: FC = () => {
  return (
    <div className={styles.gameContainer}>
      <GameEngine />
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
