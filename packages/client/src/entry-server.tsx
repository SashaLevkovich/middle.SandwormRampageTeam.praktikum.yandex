import React from 'react'
import ReactDOM from 'react-dom/server'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from 'app/redux/store'
import { fetchUserThunk } from 'app/redux/slice/user'
import { Provider } from 'react-redux'
import { Request as ExpressRequest } from 'express'
import AppProviders from 'app/appProviders'

export const render = async (req: ExpressRequest) => {
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
