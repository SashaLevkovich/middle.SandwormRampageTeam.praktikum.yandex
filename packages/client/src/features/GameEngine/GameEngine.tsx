import { useRef } from 'react'
import { Flex } from 'antd'
import useGameEngine from 'shared/hooks/useGameEngine'
import useKeyboardControls from 'shared/hooks/useKeyboardControls'
import useLoadImages from 'shared/hooks/useLoadImages'
import styles from './GameEngine.module.scss'
import { GameOver } from 'components/GameOver'
import {
  CANVAS_SIZE,
  CELL_SIZE,
  IMAGE_SOURCES,
  INITIAL_FOOD,
  INITIAL_SNAKE,
  MARGIN_IMAGE,
} from 'shared/hooks/constants'

export const GameEngine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [imagesRef, isImagesLoaded] = useLoadImages(IMAGE_SOURCES)

  const { direction, isGameOver, isPaused, setDirection, setIsPaused } =
    useGameEngine(
      INITIAL_SNAKE,
      INITIAL_FOOD,
      CELL_SIZE,
      CANVAS_SIZE,
      MARGIN_IMAGE,
      imagesRef,
      canvasRef,
      isImagesLoaded
    )

  useKeyboardControls(setDirection, setIsPaused, direction)

  return (
    <Flex role="gameEngine" align="center" justify="center">
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className={styles.canvas}
        role="gameEngineCanvas"
      />
      {isGameOver && <GameOver />}
      {isPaused && <div>Paused</div>}
    </Flex>
  )
}
