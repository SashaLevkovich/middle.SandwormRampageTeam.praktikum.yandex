import { ConfigProvider, ThemeConfig } from 'antd'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRoutes'
import { store as defaultStore } from './redux/store'

export const theme: ThemeConfig = {
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

function AppProviders({ store = defaultStore }) {
  if (typeof document === 'undefined') {
    // Чтобы избежать ReferenceError
    return null
  }

  return (
    // <ErrorBoundary>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <RouterProvider router={appRouter()} />
      </ConfigProvider>
    </Provider>
    // </ErrorBoundary>
  )
}

export default AppProviders
