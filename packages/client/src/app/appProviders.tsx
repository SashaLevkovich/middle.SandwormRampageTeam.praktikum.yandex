import { ConfigProvider, ThemeConfig } from 'antd'
import { RouterProvider } from 'react-router-dom'
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
    <ConfigProvider theme={theme}>
      <RouterProvider router={appRouter()} />
    </ConfigProvider>
  )
}

export default AppProviders
