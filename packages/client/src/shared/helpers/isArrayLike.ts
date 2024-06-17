export function isArrayLike<T>(value: T): boolean {
  return (
    value != null &&
    typeof value !== 'function' &&
    typeof (value as unknown[]).length === 'number'
  )
}
