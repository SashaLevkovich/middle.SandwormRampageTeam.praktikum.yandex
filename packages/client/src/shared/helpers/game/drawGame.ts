import { MutableRefObject } from 'react'
import { Position } from 'shared/hooks/types'
import { getAngle } from './getAngle'

type DrawGame = (
  context: CanvasRenderingContext2D,
  imagesRef: MutableRefObject<{ [key: string]: HTMLImageElement | null }>,
  food: Position,
  cellSize: number,
  marginImage: number,
  snake: Position[],
  canvasSize: number
) => void

const drawImageIfExists = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement | null,
  x: number,
  y: number,
  cellSize: number
) => {
  if (image) {
    context.drawImage(image, x, y, cellSize, cellSize)
  }
}

export const drawGame: DrawGame = (
  context,
  imagesRef,
  food,
  cellSize,
  marginImage,
  snake,
  canvasSize
) => {
  context.clearRect(0, 0, canvasSize, canvasSize)

  drawImageIfExists(
    context,
    imagesRef.current.foodImage,
    food.x * cellSize,
    food.y * cellSize,
    cellSize
  )

  if (
    imagesRef.current.headImage &&
    imagesRef.current.bodyImage &&
    imagesRef.current.tailImage
  ) {
    for (let i = 0; i < snake.length; i++) {
      const segment = snake[i]
      const nextSegment = i === 0 ? snake[i + 1] : snake[i - 1]
      const prevSegment = i === snake.length - 1 ? snake[i - 1] : snake[i + 1]

      context.save()
      context.translate(
        segment.x * cellSize + cellSize / 2,
        segment.y * cellSize + cellSize / 2
      )

      if (i === 0) {
        const angle = getAngle(segment, nextSegment)
        context.rotate(angle)
        drawImageIfExists(
          context,
          imagesRef.current.headImage,
          -cellSize / 2 - marginImage,
          -cellSize / 2,
          cellSize
        )
      } else if (i === snake.length - 1) {
        const angle = getAngle(prevSegment, segment)
        context.rotate(angle)
        drawImageIfExists(
          context,
          imagesRef.current.tailImage,
          -cellSize / 2 + marginImage * 2,
          -cellSize / 2,
          cellSize
        )
      } else {
        const angle = getAngle(nextSegment, prevSegment)
        context.rotate(angle)
        context.fillStyle = '#b0703a'
        context.fillRect(-cellSize / 2, -cellSize / 4, cellSize, cellSize / 3)
        drawImageIfExists(
          context,
          imagesRef.current.bodyImage,
          -cellSize / 2,
          -cellSize / 2,
          cellSize
        )
      }

      context.restore()
    }
  }
}
