import { GameEngine } from 'features/GameEngine'
import { FC } from 'react'
import styles from './Game.module.scss'

export const Game: FC = () => {
  return (
    <div className={styles.gameContainer}>
      <GameEngine />
    </div>
  )
}
