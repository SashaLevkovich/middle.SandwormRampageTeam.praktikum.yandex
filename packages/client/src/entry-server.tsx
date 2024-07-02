import { TestSSR } from 'pages/testSSR'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from 'app/redux/store'
import { fetchUserThunk } from 'app/redux/slice/user'
import { Provider } from 'react-redux'
import AppProviders from 'app/appProviders'

// export const render = () => ReactDOM.renderToString(<TestSSR />)
export const render = async () => {
  const store = configureStore({
    reducer,
  })

  await store.dispatch(fetchUserThunk())

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <AppProviders />
      </Provider>
    ),
    initialState: store.getState(),
  }
}
