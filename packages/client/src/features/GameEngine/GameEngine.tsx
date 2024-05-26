import React, { useEffect, useRef, useState } from 'react'
import styles from './gameEngine.module.scss'

type Position = {
  x: number
  y: number
}

export const GameEngine = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [snake, setSnake] = useState<Position[]>([
    { x: 10, y: 10 }, // Head
    { x: 9, y: 10 }, // Body
    { x: 8, y: 10 }, // Tail
  ])
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 })
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [isImagesLoaded, setIsImagesLoaded] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)

  const cellSize = 20
  const canvasSize = 800

  const headImage = useRef<HTMLImageElement | null>(null)
  const bodyImage = useRef<HTMLImageElement | null>(null)
  const tailImage = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    // Загружаем изображения
    const loadImages = () => {
      const headImg = new Image()
      const bodyImg = new Image()
      const tailImg = new Image()

      headImg.src = '../public/head.png'
      bodyImg.src = '../public/body.png'
      tailImg.src = '../public/tail.png'

      let imagesLoaded = 0
      const onLoad = () => {
        imagesLoaded++
        if (imagesLoaded === 3) {
          headImage.current = headImg
          bodyImage.current = bodyImg
          tailImage.current = tailImg
          setIsImagesLoaded(true)
        }
      }

      headImg.onload = onLoad
      bodyImg.onload = onLoad
      tailImg.onload = onLoad
    }

    loadImages()

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    const interval = setInterval(() => {
      if (!isGameOver && context && isImagesLoaded && !isPaused) {
        updateGame()
        drawGame(context)
      }
    }, 100)

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      clearInterval(interval)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [snake, food, direction, isGameOver, isImagesLoaded, isPaused])

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
    if (headImage.current && bodyImage.current && tailImage.current) {
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
          context.drawImage(
            headImage.current,
            -cellSize / 2,
            -cellSize / 2,
            cellSize,
            cellSize
          )
        } else if (i === snake.length - 1) {
          const angle = getAngle(prevSegment, segment)
          context.rotate(angle)
          context.drawImage(
            tailImage.current,
            -cellSize / 2,
            -cellSize / 2,
            cellSize,
            cellSize
          )
        } else {
          const angle = getAngle(nextSegment, prevSegment)
          context.rotate(angle)
          context.drawImage(
            bodyImage.current,
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

  const getAngle = (segment1: Position, segment2: Position) => {
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

  const handleKeyPress = (event: KeyboardEvent) => {
    const { key } = event
    if (key === ' ') {
      setIsPaused(prevPaused => !prevPaused)
    } else {
      switch (key) {
        case 'ArrowLeft': // Left arrow
          if (direction.x !== 1) setDirection({ x: -1, y: 0 })
          break
        case 'ArrowUp': // Up arrow
          if (direction.y !== 1) setDirection({ x: 0, y: -1 })
          break
        case 'ArrowRight': // Right arrow
          if (direction.x !== -1) setDirection({ x: 1, y: 0 })
          break
        case 'ArrowDown': // Down arrow
          if (direction.y !== -1) setDirection({ x: 0, y: 1 })
          break
        default:
          break
      }
    }
  }

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

  return (
    <div className={styles.gameContainer}>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className={styles.canvas}
      />
      {isGameOver && <div>Game Over</div>}
      {isPaused && <div>Paused</div>}
    </div>
  )
}
