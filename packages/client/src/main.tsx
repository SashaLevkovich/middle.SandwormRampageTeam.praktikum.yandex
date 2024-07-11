import { store } from 'app/redux/store'

import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { registerServiceWorker } from 'shared/helpers/registerServiceWorker'

import { ConfigProvider } from 'antd'
import { theme } from 'app/appProviders'
import { router } from 'app/appRoutes'
import { Provider } from 'react-redux'
import './index.scss'

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.hydrateRoot(
  rootElement,
  <Provider store={store}>
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
)

const init = () => {
  if (process.env.NODE_ENV === 'production') {
    registerServiceWorker()
  }
}

init()
