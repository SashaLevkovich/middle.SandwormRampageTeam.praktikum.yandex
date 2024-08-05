import { Position } from 'shared/hooks/types'

export const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
]
export const INITIAL_FOOD: Position = { x: 15, y: 15 }

export const IMAGE_SOURCES = {
  headImage: '../assets/head.png',
  bodyImage: '../assets/body.png',
  tailImage: '../assets/tail.png',
  foodImage: '../assets/tank.png',
}

export const CELL_SIZE = 40
export const CANVAS_SIZE = 800
export const MARGIN_IMAGE = 8
