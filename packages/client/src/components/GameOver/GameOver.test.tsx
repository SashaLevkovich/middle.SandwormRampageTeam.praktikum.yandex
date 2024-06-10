import { render, screen } from '@testing-library/react'
import { GameOver } from 'components/GameOver'
import '@testing-library/jest-dom'

describe('Testing GameOver component', () => {
  it('GameOver component renders scores correctly', () => {
    render(<GameOver score="228" />)
    const h3 = screen.getAllByRole('heading')[1]

    expect(h3).toBeInTheDocument()
    expect(h3.textContent).toBe('Score: 228')
  })
})
