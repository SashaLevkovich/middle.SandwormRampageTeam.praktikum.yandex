import { ConfigProvider, ThemeConfig } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRoutes'

const theme: ThemeConfig = {
  components: {
    Button: {
      defaultBg: 'orange',
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
