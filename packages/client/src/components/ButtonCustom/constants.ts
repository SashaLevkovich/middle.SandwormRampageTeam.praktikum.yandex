import { CSSProperties } from 'react'

const defaultStyles: CSSProperties = {
  padding: '12px 0',
  boxSizing: 'content-box',
  border: '0px',
}

export const BUTTON_TYPES: Record<string, CSSProperties> = {
  default: {
    ...defaultStyles,
  },
  white: {
    color: '#000',
    backgroundColor: '#fff',
    ...defaultStyles,
  },
  sand: {
    color: '#000',
    backgroundColor: '#d4be97',
    ...defaultStyles,
  },
}
