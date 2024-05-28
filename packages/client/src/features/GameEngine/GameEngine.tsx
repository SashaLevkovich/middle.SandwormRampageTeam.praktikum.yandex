import { useRef } from 'react'
import { Flex } from 'antd'
import useGameEngine from 'shared/hooks/useGameEngine'
import useKeyboardControls from 'shared/hooks/useKeyboardControls'
import useLoadImages from 'shared/hooks/useLoadImages'
import styles from './GameEngine.module.scss'

type Position = {
  x: number
  y: number
}

export const GameEngine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const imageSources = {
    headImage: '../public/head.png',
    bodyImage: '../public/body.png',
    tailImage: '../public/tail.png',
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

  const { direction, isGameOver, isPaused, setDirection, setIsPaused } =
    useGameEngine(
      initialSnake,
      initialFood,
      cellSize,
      canvasSize,
      marginImage,
      imagesRef,
      isImagesLoaded
    )

  useKeyboardControls(setDirection, setIsPaused, direction)

  return (
    <Flex align="center" justify="center">
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className={styles.canvas}
      />
      {isGameOver && <div>Game Over</div>}
      {isPaused && <div>Paused</div>}
    </Flex>
  )
}
