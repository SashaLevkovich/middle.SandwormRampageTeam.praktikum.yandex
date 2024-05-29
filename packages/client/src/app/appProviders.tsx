import { ConfigProvider, ThemeConfig } from 'antd'
import { RouterProvider } from 'react-router-dom'
import ErrorBoundary from 'shared/utils/error-boundary/ErrorBoundary'
import { appRouter } from './appRoutes'

const theme: ThemeConfig = {
  token: {
    fontFamily: 'Kumbh Sans Regular',
  },
  components: {
    Button: {
      defaultBg: '#f48014',
      defaultColor: '#fff',
      fontWeight: 'bold',
    },
    Form: {
      itemMarginBottom: 15,
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
