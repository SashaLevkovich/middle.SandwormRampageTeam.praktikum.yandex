import { fireEvent, render, screen } from '@testing-library/react'
import { shallow } from 'enzyme'
import { GameEngine } from 'features/GameEngine'
import React from 'react'
import '@testing-library/jest-dom'

describe('Testing GameEngine feature', () => {
  it('GameEngine component renders correctly', () => {
    render(<GameEngine />)
    const canvas = screen.getByRole('gameEngineCanvas')

    // expect(canvas).toBeInTheDocument()
    // expect(canvas.getAttribute('height')).toBe('800')
    // expect(canvas.getAttribute('width')).toBe('800')
  })

  it('GameOver component gets called', () => {
    render(<GameEngine />)
    const canvas = screen.getByRole('gameEngineCanvas')
    fireEvent.keyDown(canvas, {
      key: 'ArrowUp',
    })
    fireEvent.keyDown(canvas, {
      key: 'ArrowLeft',
    })
    fireEvent.keyDown(canvas, {
      key: 'ArrowDown',
    })
    fireEvent.keyDown(canvas, {
      key: 'ArrowRight',
    })
    const wrapper = screen.getByRole('gameEngine')
    console.log(wrapper.innerHTML)
  }, 10000)

  it('joj', () => {
    const mockChildMethod = jest.fn()
    jest.spyOn(React, 'useRef').mockReturnValue({
      current: {
        childMethod: mockChildMethod,
      },
    })
  })
})
