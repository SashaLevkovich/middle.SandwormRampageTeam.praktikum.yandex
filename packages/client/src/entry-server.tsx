import { configureStore } from '@reduxjs/toolkit'
import { ConfigProvider } from 'antd'
import { theme } from 'app/appProviders'
import { routes } from 'app/appRoutes'
import { reducer } from 'app/redux/store'
import { Request as ExpressRequest } from 'express'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-dom'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { createFetchRequest, createUrl } from './entry-server.utils'

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
