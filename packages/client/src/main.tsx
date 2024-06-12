import { apiSlice } from 'app/redux/api'
import { userSlice } from 'app/redux/slice/user'
import { store } from 'app/redux/store'
import ReactDOM from 'react-dom/client'

import { registerServiceWorker } from 'shared/utils/registerServiceWorker'
import { setLocalStorageUser } from 'shared/utils/userLocalStorage'
import AppProviders from './app/appProviders'
import './index.scss'

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

const init = async () => {
  try {
    const getProfileApiResponse = await apiSlice.endpoints.getUser.initiate()

    if (getProfileApiResponse) {
      store.dispatch(userSlice.actions.setUser(getProfileApiResponse.data))
      setLocalStorageUser(getProfileApiResponse.data)
    }
  } catch (e) {
    console.log(e)
  }

  root.render(<AppProviders />)

  if (process.env.NODE_ENV === 'production') {
    registerServiceWorker()
  }
}

init()
