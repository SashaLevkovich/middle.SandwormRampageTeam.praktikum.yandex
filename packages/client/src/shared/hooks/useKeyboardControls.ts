import { Dispatch, SetStateAction, useEffect } from 'react'
import { Position } from 'shared/hooks/types'

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
