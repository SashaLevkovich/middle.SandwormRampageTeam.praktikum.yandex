import { render, renderHook } from '@testing-library/react'
import useGameEngine from 'shared/hooks/useGameEngine'
import { GameEngine } from 'features/GameEngine'
import { MutableRefObject } from 'react'
import {
  CANVAS_SIZE,
  CELL_SIZE,
  INITIAL_FOOD,
  INITIAL_SNAKE,
  MARGIN_IMAGE,
} from 'shared/hooks/constants'

describe('Testing useGameEngine', () => {
  it('useGameEngine returns correct values', () => {
    const { container } = render(<GameEngine />)
    const canvasRef = {
      current: container.firstChild,
    }
    const imagesRef = {
      current: {
        headImage: new Image(),
        bodyImage: new Image(),
        tailImage: new Image(),
      },
    }
    const { result } = renderHook(() =>
      useGameEngine(
        INITIAL_SNAKE,
        INITIAL_FOOD,
        CELL_SIZE,
        CANVAS_SIZE,
        MARGIN_IMAGE,
        imagesRef,
        canvasRef as MutableRefObject<HTMLCanvasElement | null>,
        true
      )
    )
    expect(result.current.snake).toBe(INITIAL_SNAKE)
    expect(result.current.food).toBe(INITIAL_FOOD)
  })
})
