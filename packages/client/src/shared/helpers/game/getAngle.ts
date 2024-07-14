import { Position } from 'shared/hooks/types'

type GetAngle = (segment1: Position, segment2: Position) => number

export const getAngle: GetAngle = (segment1, segment2) => {
  const dx = segment1.x - segment2.x
  const dy = segment1.y - segment2.y
  if (Math.abs(dx) > 2) {
    return dx > 0 ? Math.PI : 0
  }
  if (Math.abs(dy) > 2) {
    return dy > 0 ? -Math.PI / 2 : Math.PI / 2
  }

  if (segment1.x < segment2.x) return Math.PI
  if (segment1.x > segment2.x) return 0
  if (segment1.y < segment2.y) return -Math.PI / 2
  if (segment1.y > segment2.y) return Math.PI / 2
  return 0
}
