import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getUserThunk } from 'app/redux/thunk/getUser'

export interface UserState {
  userInfo: User | null
  fetchUserStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: UserState = { userInfo: null, fetchUserStatus: 'idle' }

export const name = 'user'

export const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.userInfo = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserThunk.pending, state => {
        state.userInfo = null
        state.fetchUserStatus = 'pending'
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.fetchUserStatus = 'succeeded'
        state.userInfo = action.payload.data
      })
      .addCase(getUserThunk.rejected, state => {
        state.fetchUserStatus = 'failed'
      })
  },
  selectors: {
    selectUser: state => state.userInfo,
  },
})
