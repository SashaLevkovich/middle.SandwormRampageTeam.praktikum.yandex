import { Position } from 'shared/hooks/types'

type GenerateFoodPosition = (
  snake: Position[],
  canvasSize: number,
  cellSize: number
) => Position

export const generateFoodPosition: GenerateFoodPosition = (
  snake,
  canvasSize,
  cellSize
) => {
  let newFoodPosition: Position
  let collision: boolean

  do {
    collision = false
    newFoodPosition = {
      x: Math.floor(Math.random() * (canvasSize / cellSize)),
      y: Math.floor(Math.random() * (canvasSize / cellSize)),
    }

    for (const segment of snake) {
      if (newFoodPosition.x === segment.x && newFoodPosition.y === segment.y) {
        collision = true
        break
      }
    }
  } while (collision)

  return newFoodPosition
}
