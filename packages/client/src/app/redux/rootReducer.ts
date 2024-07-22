import { combineSlices } from '@reduxjs/toolkit'
import { userSlice } from './slice/user'

const rootReducer = combineSlices(userSlice, {
  [userSlice.reducerPath]: userSlice.reducer,
})

export default rootReducer
