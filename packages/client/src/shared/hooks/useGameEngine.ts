import { useState, useEffect, MutableRefObject } from 'react'
import { Position } from 'shared/hooks/types'

const useGameEngine = (
  initialSnake: Position[],
  initialFood: Position,
  cellSize: number,
  canvasSize: number,
  marginImage: number,
  imagesRef: MutableRefObject<{ [key: string]: HTMLImageElement | null }>,
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  isImagesLoaded: boolean
) => {
  const [snake, setSnake] = useState<Position[]>(initialSnake)
  const [food, setFood] = useState<Position>(initialFood)
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 })
  const [isGameOver, setIsGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const updateGame = () => {
      const newSnake = [...snake]
      const head = {
        x: newSnake[0].x + direction.x,
        y: newSnake[0].y + direction.y,
      }

      // Проверка на столкновение с границами
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

      // Проверка на столкновение с собой
      for (const segment of newSnake) {
        if (head.x === segment.x && head.y === segment.y) {
          setIsGameOver(true)
          return
        }
      }

      newSnake.unshift(head)

      // Проверка на съедание еды
      if (head.x === food.x && head.y === food.y) {
        setFood(generateFoodPosition(newSnake))
      } else {
        newSnake.pop()
      }

      setSnake(newSnake)
    }

    const drawGame = (context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, canvasSize, canvasSize)

      // Рисуем еду
      context.fillStyle = 'red'
      context.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize)

      // Рисуем змейку
      if (
        imagesRef.current.headImage &&
        imagesRef.current.bodyImage &&
        imagesRef.current.tailImage
      ) {
        for (let i = 0; i < snake.length; i++) {
          const segment = snake[i]
          const nextSegment = i === 0 ? snake[i + 1] : snake[i - 1]
          const prevSegment =
            i === snake.length - 1 ? snake[i - 1] : snake[i + 1]

          context.save()
          context.translate(
            segment.x * cellSize + cellSize / 2,
            segment.y * cellSize + cellSize / 2
          )

          if (i === 0) {
            const angle = getAngle(segment, nextSegment)
            context.rotate(angle)
            context.drawImage(
              imagesRef.current.headImage,
              -cellSize / 2 - marginImage,
              -cellSize / 2,
              cellSize,
              cellSize
            )
          } else if (i === snake.length - 1) {
            const angle = getAngle(prevSegment, segment)
            context.rotate(angle)
            context.drawImage(
              imagesRef.current.tailImage,
              -cellSize / 2 + marginImage * 2,
              -cellSize / 2,
              cellSize,
              cellSize
            )
          } else {
            const angle = getAngle(nextSegment, prevSegment)
            context.rotate(angle)
            context.fillStyle = '#b0703a'
            context.fillRect(
              -cellSize / 2,
              -cellSize / 4,
              cellSize,
              cellSize / 3
            )
            context.drawImage(
              imagesRef.current.bodyImage,
              -cellSize / 2,
              -cellSize / 2,
              cellSize,
              cellSize
            )
          }

          context.restore()
        }
      }
    }

    const interval = setInterval(() => {
      if (!isGameOver && isImagesLoaded && !isPaused) {
        updateGame()
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (context) {
          drawGame(context)
        }
      }
    }, 100)

    return () => clearInterval(interval)
  }, [snake, food, direction, isGameOver, isImagesLoaded, isPaused])

  const generateFoodPosition = (snake: Position[]): Position => {
    let newFoodPosition: Position
    let collision: boolean

    do {
      collision = false
      newFoodPosition = {
        x: Math.floor(Math.random() * (canvasSize / cellSize)),
        y: Math.floor(Math.random() * (canvasSize / cellSize)),
      }

      for (const segment of snake) {
        if (
          newFoodPosition.x === segment.x &&
          newFoodPosition.y === segment.y
        ) {
          collision = true
          break
        }
      }
    } while (collision)

    return newFoodPosition
  }

  const getAngle = (segment1: Position, segment2: Position) => {
    const dx = segment1.x - segment2.x
    const dy = segment1.y - segment2.y
    if (Math.abs(dx) > 2) {
      return dx > 0 ? Math.PI : 0
    }
    if (Math.abs(dy) > 2) {
      return dy > 0 ? -Math.PI / 2 : Math.PI / 2
    }

    if (segment1.x < segment2.x) return Math.PI
    if (segment1.x > segment2.x) return 0
    if (segment1.y < segment2.y) return -Math.PI / 2
    if (segment1.y > segment2.y) return Math.PI / 2
    return 0
  }

  return {
    snake,
    food,
    direction,
    isGameOver,
    isPaused,
    setDirection,
    setIsPaused,
  }
}

export default useGameEngine
