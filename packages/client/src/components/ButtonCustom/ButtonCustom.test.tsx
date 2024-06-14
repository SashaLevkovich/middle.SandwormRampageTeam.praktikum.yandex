import { render, screen } from '@testing-library/react'
import { ButtonCustom } from 'components/ButtonCustom'
import '@testing-library/jest-dom'

describe('Testing ButtonCustom component', () => {
  it('Button customType sets correctly', () => {
    render(<ButtonCustom customType="white">Test</ButtonCustom>)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button.style.color).toBe('rgb(0, 0, 0)')
    expect(button.style.backgroundColor).toBe('rgb(255, 255, 255)')
  })
})
