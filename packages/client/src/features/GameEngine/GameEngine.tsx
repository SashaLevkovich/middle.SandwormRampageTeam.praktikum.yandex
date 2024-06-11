import { GameInfo } from 'components/GameInfo'
import { useRef, useState } from 'react'
import { Flex } from 'antd'
import useGameEngine from 'shared/hooks/useGameEngine'
import useKeyboardControls from 'shared/hooks/useKeyboardControls'
import useLoadImages from 'shared/hooks/useLoadImages'
import styles from './GameEngine.module.scss'
import { GameOver } from 'components/GameOver'

type Position = {
  x: number
  y: number
}

export const GameEngine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)

  const imageSources = {
    headImage: '../assets/head.png',
    bodyImage: '../assets/body.png',
    tailImage: '../assets/tail.png',
    foodImage: '../assets/tank.png',
  }

  const [imagesRef, isImagesLoaded] = useLoadImages(imageSources)

  const initialSnake: Position[] = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]

  const initialFood: Position = { x: 15, y: 15 }

  const cellSize = 40
  const canvasSize = 800
  const marginImage = 8

  const {
    direction,
    isGameOver,
    isPaused,
    setDirection,
    setIsPaused,
    resetGame,
  } = useGameEngine(
    initialSnake,
    initialFood,
    cellSize,
    canvasSize,
    marginImage,
    imagesRef,
    canvasRef,
    isImagesLoaded,
    setScore
  )

  useKeyboardControls(setDirection, setIsPaused, direction)

  return (
    <>
      <div className={styles.gameInfoContainer}>
        <GameInfo score={score} isPaused={isPaused} setIsPaused={setIsPaused} />
      </div>
      <Flex align="center" justify="center">
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className={styles.canvas}
        />
        {isGameOver && <GameOver score={score} resetGame={resetGame} />}
      </Flex>
    </>
  )
}
