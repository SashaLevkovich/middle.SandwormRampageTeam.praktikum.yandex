import { isArrayLike } from './isArrayLike'

export function isEmpty(value: unknown) {
  if (!value) {
    return true
  }

  if (value instanceof Set || value instanceof Map) {
    return !value.size
  }

  if (isArrayLike(value)) {
    return !(value as unknown[]).length
  }

  if (typeof value === 'object') {
    return !Object.keys(value).length
  }

  return false
}
