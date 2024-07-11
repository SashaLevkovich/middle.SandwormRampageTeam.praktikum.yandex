import { store } from 'app/redux/store'

import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { registerServiceWorker } from 'shared/utils/registerServiceWorker'

import { ConfigProvider } from 'antd'
import { theme } from 'app/appProviders'
import { routes } from 'app/appRoutes'
import { getUserThunk } from 'app/redux/thunk/getUser'
import { Provider } from 'react-redux'
import './index.scss'

const router = createBrowserRouter(routes)

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.hydrateRoot(
  rootElement,
  <Provider store={store}>
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
)

const init = async () => {
  try {
    const result = await store.dispatch(getUserThunk())

    const user = result.payload

    // if (user) {
    //   setLocalStorageUser(user)
    // }
  } catch (e) {
    console.log(e)
  }

  if (process.env.NODE_ENV === 'production') {
    registerServiceWorker()
  }
}

init()
