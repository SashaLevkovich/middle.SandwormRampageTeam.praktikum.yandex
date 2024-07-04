import React, { createContext } from 'react'
import ReactDOM from 'react-dom/server'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from 'app/redux/store'
import { Provider } from 'react-redux'
import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { PageInitContext, routes } from 'app/appRoutes'
import { createFetchRequest, createUrl } from './entry-server.utils'
import { theme } from 'app/appProviders'
import { ConfigProvider } from 'antd'
import { matchRoutes } from 'react-router-dom'
import { setPageHasBeenInitializedOnServer } from 'app/redux/slice/ssr'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const store = configureStore({
    reducer,
  })
  const url = createUrl(req)
  const foundRoutes = matchRoutes(routes, url)
  if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }

  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes
  store.dispatch(setPageHasBeenInitializedOnServer(true))
  try {
    if (fetchData) {
      await fetchData({
        dispatch: store.dispatch,
        state: store.getState(),
        ctx: createContext(req) as PageInitContext,
      })
    }
  } catch (e) {
    console.log('Инициализация страницы произошла с ошибкой', e)
  }

  const router = createStaticRouter(dataRoutes, context)

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
