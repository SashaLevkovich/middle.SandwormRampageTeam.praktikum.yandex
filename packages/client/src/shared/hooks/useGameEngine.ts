import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { drawGame } from 'shared/helpers/game/drawGame'
import { resetGame } from 'shared/helpers/game/resetGames'
import { updateGame } from 'shared/helpers/game/updateGame'

import { Position } from 'shared/hooks/types'

export const useGameEngine = (
  initialSnake: Position[],
  initialFood: Position,
  cellSize: number,
  canvasSize: number,
  marginImage: number,
  imagesRef: MutableRefObject<{ [key: string]: HTMLImageElement | null }>,
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  isImagesLoaded: boolean,
  setScore: Dispatch<SetStateAction<number>>
) => {
  const [snake, setSnake] = useState<Position[]>(initialSnake)
  const [food, setFood] = useState<Position>(initialFood)
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 })
  const [isGameOver, setIsGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const gameInterval = useRef<number>()

  const handleGameUpdate = useCallback(() => {
    if (!isGameOver && isImagesLoaded && !isPaused) {
      updateGame(
        snake,
        direction,
        setIsGameOver,
        setScore,
        setFood,
        setSnake,
        canvasSize,
        cellSize,
        food
      )

      const canvas = canvasRef.current
      const context = canvas?.getContext('2d')
      if (context) {
        drawGame(
          context,
          imagesRef,
          food,
          cellSize,
          marginImage,
          snake,
          canvasSize
        )
      }
    }
  }, [
    snake,
    food,
    direction,
    isGameOver,
    isImagesLoaded,
    isPaused,
    imagesRef,
    canvasRef,
    setScore,
  ])

  useEffect(() => {
    gameInterval.current = window.setInterval(handleGameUpdate, 100)
    return () => clearInterval(gameInterval.current)
  }, [handleGameUpdate])

  const resetGameCallback = useCallback(() => {
    resetGame(
      initialSnake,
      initialFood,
      setDirection,
      setIsGameOver,
      setIsPaused,
      setScore,
      setSnake,
      setFood
    )
  }, [
    initialSnake,
    initialFood,
    setDirection,
    setIsGameOver,
    setIsPaused,
    setScore,
    setSnake,
    setFood,
  ])

  return {
    snake,
    food,
    direction,
    isGameOver,
    isPaused,
    setDirection,
    setIsPaused,
    resetGame: resetGameCallback,
  }
}
