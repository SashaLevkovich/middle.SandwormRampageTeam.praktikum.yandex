import { Position } from 'features/GameEngine/GameEngine'

type FoodProps = {
  snake: Position[]
  canvasSize: number
  cellSize: number
}

export const generateFoodPosition = ({
  snake,
  canvasSize,
  cellSize,
}: FoodProps): Position => {
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

export const getAngle = (segment1: Position, segment2: Position) => {
  // Необходимо для игнорирования поворота при телепортации
  const dx = segment1.x - segment2.x
  const dy = segment1.y - segment2.y
  if (Math.abs(dx) > 2) {
    return dx > 0 ? Math.PI : 0
  }
  if (Math.abs(dy) > 2) {
    return dy > 0 ? -Math.PI / 2 : Math.PI / 2
  }

  // Поворот картинок при поворотах
  if (segment1.x < segment2.x) return Math.PI
  if (segment1.x > segment2.x) return 0
  if (segment1.y < segment2.y) return -Math.PI / 2
  if (segment1.y > segment2.y) return Math.PI / 2
  return 0
}
