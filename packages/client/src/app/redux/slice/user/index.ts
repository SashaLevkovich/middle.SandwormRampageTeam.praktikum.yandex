import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/redux/store'
import { getUserThunk } from 'app/redux/thunk/user/getUser'
import { logoutUserThunk } from 'app/redux/thunk/user/logoutUser'
import { signInThunk } from 'app/redux/thunk/user/signInUser'

export interface UserState {
  userInfo: User | undefined
  fetchUserStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: UserState = { userInfo: undefined, fetchUserStatus: 'idle' }

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
        state.fetchUserStatus = 'pending'
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.fetchUserStatus = 'succeeded'
        state.userInfo = action.payload
      })
      .addCase(getUserThunk.rejected, state => {
        state.fetchUserStatus = 'failed'
      })
      .addCase(logoutUserThunk.pending, state => {
        state.fetchUserStatus = 'pending'
        state.userInfo = undefined
      })
      .addCase(logoutUserThunk.fulfilled, state => {
        state.fetchUserStatus = 'succeeded'
      })
      .addCase(logoutUserThunk.rejected, state => {
        state.fetchUserStatus = 'failed'
      })
      .addCase(signInThunk.pending, state => {
        state.fetchUserStatus = 'pending'
        state.userInfo = undefined
      })
      .addCase(signInThunk.fulfilled, state => {
        state.fetchUserStatus = 'succeeded'
      })
      .addCase(signInThunk.rejected, state => {
        state.fetchUserStatus = 'failed'
      })
  },
  selectors: {
    selectUser: state => state.userInfo,
    selectFetchUserStatusSucceeded: state => state.fetchUserStatus,
  },
})

export const selectUser = (state: RootState) => state.user.userInfo
