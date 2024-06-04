# Логика игры

## Инициализация
- Змейка инициализируется с начальной длиной (например, три сегмента) и начальной позицией.
- Еда инициализируется в случайной позиции на игровом поле.
- Змейка и еда отображаются на игровом поле.

## Основной игровой цикл

### Обновление состояния игры
1. Вычисляется новая позиция головы змейки на основе текущего направления движения.
2. Проверяется пересечение с границами поля и телепортация змейки при необходимости.
3. Проверяется столкновение головы змейки с телом. Если произошло столкновение, игра заканчивается.
4. Проверяется съедание еды. Если еда съедена:
    - Змейка становится длиннее.
    - Генерируется новая еда в случайной позиции.
5. Если еда не съедена, удаляется последний сегмент змейки (змейка "движется").

### Отрисовка игры
1. Очищается игровое поле.
2. Отрисовывается еда.
3. Отрисовываются сегменты змейки:
    - Голова змейки.
    - Тело змейки.
    - Хвост змейки.

За отрисовкой следит хук **useLoadImages**
```typescript
import { MutableRefObject, useEffect, useRef, useState } from 'react'

type ImageSources = {
  [key: string]: string
}

type ImagesRef = MutableRefObject<{ [key: string]: HTMLImageElement | null }>

const useLoadImages = (imageSources: ImageSources): [ImagesRef, boolean] => {
  const [isImagesLoaded, setIsImagesLoaded] = useState(false)
  const imagesRef = useRef<{ [key: string]: HTMLImageElement | null }>({})

  useEffect(() => {
    const loadImages = () => {
      const images: { [key: string]: HTMLImageElement } = {}
      let imagesLoaded = 0
      const totalImages = Object.keys(imageSources).length

      Object.entries(imageSources).forEach(([key, src]) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          images[key] = img
          imagesLoaded++
          if (imagesLoaded === totalImages) {
            imagesRef.current = images
            setIsImagesLoaded(true)
          }
        }
      })
    }
    loadImages()
  }, [imageSources])

  return [imagesRef, isImagesLoaded]
}

export default useLoadImages

```

### Интервал обновления
- Основной игровой цикл повторяется через заданный интервал времени (например, каждые 100 мс).

```typescript
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
```

## Обработка пользовательского ввода

### Обработчик событий клавиатуры
- Изменение направления движения змейки при нажатии клавиш со стрелками.
- Постановка игры на паузу и возобновление игры при нажатии клавиши пробела.

```typescript
import { Dispatch, SetStateAction, useEffect } from 'react'

type Position = {
  x: number
  y: number
}

const useKeyboardControls = (
  setDirection: Dispatch<SetStateAction<Position>>,
  setIsPaused: Dispatch<SetStateAction<boolean>>,
  direction: Position
) => {
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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [direction])
}

export default useKeyboardControls

```