import { FC } from 'react'
import classes from './GameOver.module.scss'
import { Button } from 'antd'

export const GameOver: FC = () => {
  return (
    <div className={classes.gameOverPageWrapper}>
      <h1 className={classes.gameOverPageWrapperTitle}>Game Over</h1>
      <h3 className={classes.gameOverPageWrapperScore}>Score: 228</h3>
      <div className={classes.gameOverPageWrapperButtons}>
        <Button shape="round" size="large">
          Retry
        </Button>
        <Button shape="round" size="large">
          Back to menu
        </Button>
      </div>
    </div>
  )
}
