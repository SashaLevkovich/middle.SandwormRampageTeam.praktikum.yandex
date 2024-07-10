import { lazy } from 'react'

export { default as GameEngine } from './GameEngine'

const LazyGameEngine = lazy(() => import('./GameEngine'))

export default LazyGameEngine
