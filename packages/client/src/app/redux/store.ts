import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  TypedUseSelectorHook,
  useStore as useStoreBase,
} from 'react-redux'
import userReducer from './slice/user/index'

export const reducer = combineReducers({
  user: userReducer,
})
export type RootState = ReturnType<typeof reducer>

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

export const store = configureStore({
  reducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})

export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = useDispatchBase
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase
export const useStore: () => typeof store = useStoreBase
