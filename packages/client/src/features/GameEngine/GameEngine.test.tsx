import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'

import GameEngine from './GameEngine'

describe('Testing GameEngine feature', () => {
  it('GameEngine component renders correctly', () => {
    render(<GameEngine />)
    const canvas = screen.getByRole('gameEngineCanvas')

    expect(canvas).toBeInTheDocument()
    expect(canvas.getAttribute('height')).toBe('800')
    expect(canvas.getAttribute('width')).toBe('800')
  })
})
