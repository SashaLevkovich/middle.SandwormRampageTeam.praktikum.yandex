import { ConfigProvider, ThemeConfig } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRoutes'
import ErrorBoundary from 'shared/utils/error-boundary/ErrorBoundary'

const theme: ThemeConfig = {
  components: {
    Button: {
      defaultBg: 'orange',
    },
  },
}

function AppProviders() {
  return (
    <ErrorBoundary>
      <ConfigProvider theme={theme}>
        <RouterProvider router={appRouter()} />
      </ConfigProvider>
    </ErrorBoundary>
  )
}

export default AppProviders
