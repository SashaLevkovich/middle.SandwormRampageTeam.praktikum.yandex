import { FC } from 'react'
import classes from './GameOver.module.scss'
import { ButtonCustom } from 'components/ButtonCustom'

type GameOverProps = {
  score: number
  resetGame: () => void
}

export const GameOver: FC<GameOverProps> = ({ score, resetGame }) => {
  return (
    <div className={classes.gameOverPageWrapper}>
      <h1 className={classes.gameOverPageWrapperTitle}>Game Over</h1>
      <h3 className={classes.gameOverPageWrapperScore}>Score: {score}</h3>
      <div className={classes.gameOverPageWrapperButtons}>
        <ButtonCustom customType="white" size="large" onClick={resetGame}>
          Retry
        </ButtonCustom>
        <ButtonCustom customType="sand" size="large">
          Back to menu
        </ButtonCustom>
      </div>
    </div>
  )
}
