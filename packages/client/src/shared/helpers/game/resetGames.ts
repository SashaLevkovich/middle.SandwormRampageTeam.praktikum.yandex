import { Dispatch, SetStateAction } from 'react'
import { Position } from 'shared/hooks/types'

type ResetGame = (
  initialSnake: Position[],
  initialFood: Position,
  setDirection: Dispatch<SetStateAction<Position>>,
  setIsGameOver: Dispatch<SetStateAction<boolean>>,
  setIsPaused: Dispatch<SetStateAction<boolean>>,
  setScore: Dispatch<SetStateAction<number>>,
  setSnake: Dispatch<SetStateAction<Position[]>>,
  setFood: Dispatch<SetStateAction<Position>>
) => void

export const resetGame: ResetGame = (
  initialSnake,
  initialFood,
  setDirection,
  setIsGameOver,
  setIsPaused,
  setScore,
  setSnake,
  setFood
) => {
  setSnake(initialSnake)
  setFood(initialFood)
  setDirection({ x: 1, y: 0 })
  setIsGameOver(false)
  setIsPaused(false)
  setScore(0)
}
