import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRoutes'

function AppProviders() {
  return <RouterProvider router={appRouter()} />
}

export default AppProviders
