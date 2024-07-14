import { createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'

import { extraArgument, store } from 'app/redux/store'

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppSelector = createSelector.withTypes<AppState>()
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState
  dispatch: AppDispatch
  extra: typeof extraArgument
}>()
