import { render, screen } from '@testing-library/react'
import { GameEngine } from 'features/GameEngine'
import '@testing-library/jest-dom'

describe('Testing GameEngine feature', () => {
  it('GameEngine component renders correctly', () => {
    render(<GameEngine />)
    const canvas = screen.getByRole('gameEngine')

    expect(canvas).toBeInTheDocument()
    expect(canvas.getAttribute('height')).toBe('800')
    expect(canvas.getAttribute('width')).toBe('800')
  })
})
