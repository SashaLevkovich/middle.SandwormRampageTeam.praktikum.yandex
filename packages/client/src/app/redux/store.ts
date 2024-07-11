import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authRequests } from 'app/api'
import { router } from 'app/appRoutes'
import ssrReducer from './slice/ssr/index'
import { userSlice } from './slice/user'

export const reducer = combineReducers({
  user: userSlice.reducer,
  ssr: ssrReducer,
})

export type RootState = ReturnType<typeof reducer>

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

export const extraArgument = {
  authRequests,
  router,
}

export const store = configureStore({
  reducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: { extraArgument },
    }),
})
