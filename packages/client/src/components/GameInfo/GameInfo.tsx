import { Flex } from 'antd'
import { Dispatch, FC, SetStateAction } from 'react'
import styles from './GameInfo.module.scss'

type GameInfoProps = {
  score: number
  isPaused: boolean
  setIsPaused: Dispatch<SetStateAction<boolean>>
}

export const GameInfo: FC<GameInfoProps> = ({
  score,
  isPaused,
  setIsPaused,
}) => {
  const handlePause = () => {
    setIsPaused(prevPaused => !prevPaused)
  }

  return (
    <Flex align="center" className={styles.container}>
      <div className={styles.score}>{score}</div>
      <div className={styles.title}>Arrakis</div>
      <div
        className={isPaused ? styles.play : styles.pause}
        onClick={handlePause}
      />
    </Flex>
  )
}
