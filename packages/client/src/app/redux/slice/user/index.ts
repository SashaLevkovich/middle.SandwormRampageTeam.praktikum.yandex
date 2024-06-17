import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  value: User
}

const initialState: UserState = { value: {} } as UserState

export const name = 'user'

export const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.value = action.payload
    },
  },
  selectors: {
    selectUser: state => state.value,
  },
})
