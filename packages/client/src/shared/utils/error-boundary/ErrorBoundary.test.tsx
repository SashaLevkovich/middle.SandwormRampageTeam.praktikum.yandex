import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ErrorBoundary from 'shared/utils/error-boundary/ErrorBoundary'

const originalError = console.error.bind(console.error)
beforeEach(() => {
  console.error = () => false
})
afterEach(() => {
  console.error = originalError
})

describe('Testing ErrorBoundary', () => {
  it('Element inside of ErrorBoundary is rendered correctly before error thrown', () => {
    render(
      <ErrorBoundary>
        <div>Test</div>
      </ErrorBoundary>
    )
    const element = screen.getByText('Test')
    expect(element).toBeInTheDocument()
  })
  it('ErrorBoundary is rendered correctly after error thrown', () => {
    const ThrowError = () => {
      throw new Error('Test')
    }
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    const element = screen.getByText('Something went wrong')
    expect(element).toBeInTheDocument()
  })
})
