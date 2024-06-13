import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { GameOver } from 'components/GameOver'
import { BrowserRouter } from 'react-router-dom'

describe('Testing GameOver component', () => {
  it('GameOver component renders scores correctly', () => {
    render(
      <BrowserRouter>
        <GameOver score={228} resetGame={jest.fn()} />
      </BrowserRouter>
    )
    const scoreElement = screen.getByText('Score: 228')

    expect(scoreElement).toBeInTheDocument()
  })

  it('GameOver component reset button works', () => {
    const resetGameMock = jest.fn()
    render(
      <BrowserRouter>
        <GameOver score={228} resetGame={resetGameMock} />
      </BrowserRouter>
    )
    const resetButton = screen.getByText('Retry')
    fireEvent.click(resetButton)
    expect(resetGameMock).toHaveBeenCalled()
  })
})
