import { render, screen } from '@testing-library/react'
import { GameOver } from 'components/GameOver'
import '@testing-library/jest-dom'

describe('Testing GameOver component', () => {
  it('GameOver component renders scores correctly', () => {
    render(<GameOver score={228} resetGame={jest.fn()} />)
    const scoreElement = screen.getByText('Score: 228')

    expect(scoreElement).toBeInTheDocument()
  })
})
