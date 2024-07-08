import { Dispatch, SetStateAction } from 'react'
import { Position } from 'shared/hooks/types'
import { generateFoodPosition } from './generateFoodPosition'

type UpdateGame = (
  snake: Position[],
  direction: Position,
  setIsGameOver: Dispatch<SetStateAction<boolean>>,
  setScore: Dispatch<SetStateAction<number>>,
  setFood: Dispatch<SetStateAction<Position>>,
  setSnake: Dispatch<SetStateAction<Position[]>>,
  canvasSize: number,
  cellSize: number,
  food: Position
) => void

export const updateGame: UpdateGame = (
  snake,
  direction,
  setIsGameOver,
  setScore,
  setFood,
  setSnake,
  canvasSize,
  cellSize,
  food
) => {
  const newSnake = [...snake]
  const head = {
    x: newSnake[0].x + direction.x,
    y: newSnake[0].y + direction.y,
  }

  if (head.x < 0) {
    head.x = canvasSize / cellSize - 1
  } else if (head.x >= canvasSize / cellSize) {
    head.x = 0
  }

  if (head.y < 0) {
    head.y = canvasSize / cellSize - 1
  } else if (head.y >= canvasSize / cellSize) {
    head.y = 0
  }

  for (const segment of newSnake) {
    if (head.x === segment.x && head.y === segment.y) {
      setIsGameOver(true)
      return
    }
  }

  newSnake.unshift(head)

  if (head.x === food.x && head.y === food.y) {
    setScore(prev => prev + 1)
    setFood(generateFoodPosition(newSnake, canvasSize, cellSize))
  } else {
    newSnake.pop()
  }

  setSnake(newSnake)
}
