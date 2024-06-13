import { combineSlices } from '@reduxjs/toolkit'
import { userApi } from './api'
import { userSlice } from './slice/user'

const rootReducer = combineSlices(userSlice, {
  [userApi.reducerPath]: userApi.reducer,
})

export default rootReducer
