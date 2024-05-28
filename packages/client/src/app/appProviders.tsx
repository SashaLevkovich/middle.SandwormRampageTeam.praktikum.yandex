import { ConfigProvider, ThemeConfig } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRoutes'
import ErrorBoundary from 'shared/utils/error-boundary/ErrorBoundary'

const theme: ThemeConfig = {
  token: {
    fontFamily: 'Kumbh Sans Regular',
  },
  components: {
    Button: {
      defaultBg: '#f48014',
      defaultColor: '#fff',
      fontWeight: 'bold',
      defaultHoverBg: '#d46b09',
      defaultHoverColor: '#fff',
      defaultActiveBg: '#d46b09',
      defaultActiveBorderColor: 'transparent',
      defaultActiveColor: '#fff',
      contentFontSizeLG: 24,
      defaultHoverBorderColor: 'transparent',
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
