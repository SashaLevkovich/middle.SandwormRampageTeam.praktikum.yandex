import { userSlice } from 'app/redux/slice/user'
import { store } from 'app/redux/store'

import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { userApi } from 'app/redux/api'
import { registerServiceWorker } from 'shared/utils/registerServiceWorker'

import { setLocalStorageUser } from 'shared/utils/userLocalStorage'
import './index.scss'
import { routes } from 'app/appRoutes'
import { Provider } from 'react-redux'

const router = createBrowserRouter(routes)

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.hydrateRoot(
  rootElement,
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

const init = async () => {
  try {
    const result = await store
      .dispatch(userApi.endpoints.getUser.initiate())
      .unwrap()

    if (result) {
      store.dispatch(userSlice.actions.setUser(result))

      setLocalStorageUser(result)
    }
  } catch (e) {
    console.log(e)
  }

  if (process.env.NODE_ENV === 'production') {
    registerServiceWorker()
  }
}

init()
