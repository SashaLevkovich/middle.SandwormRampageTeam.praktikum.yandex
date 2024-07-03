import React from 'react'
import ReactDOM from 'react-dom/server'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from 'app/redux/store'
import { fetchUserThunk } from 'app/redux/slice/user'
import { Provider } from 'react-redux'
import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { routes } from 'app/appRoutes'
import { createFetchRequest } from './entry-server.utils'
import { theme } from 'app/appProviders'
import { ConfigProvider } from 'antd'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)
  const store = configureStore({
    reducer,
  })

  await store.dispatch(fetchUserThunk())

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <StaticRouterProvider router={router} context={context} />
        </ConfigProvider>
      </Provider>
    ),
    initialState: store.getState(),
  }
}
