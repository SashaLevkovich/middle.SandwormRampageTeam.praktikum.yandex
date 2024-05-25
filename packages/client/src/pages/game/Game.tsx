import { Button } from 'antd'
import { GameEngine } from 'features/GameEngine'
import { FC } from 'react'

export const Game: FC = () => {
  return (
    <>
      <Button>Log</Button>
      <GameEngine />
    </>
  )
}
