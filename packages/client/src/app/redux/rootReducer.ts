import { combineSlices } from '@reduxjs/toolkit'
import { userSlice } from './slice/user'

const rootReducer = combineSlices(userSlice)

export default rootReducer
