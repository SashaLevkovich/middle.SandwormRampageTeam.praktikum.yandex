import { lazy } from 'react'

const LazyGameEngine = lazy(() => import('./GameEngine'))

export default LazyGameEngine
