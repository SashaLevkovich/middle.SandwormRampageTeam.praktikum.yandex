import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { RootState } from 'app/redux/store'
import { SERVER_HOST } from '../../../../constants'

interface UserState {
  value: User | null
  isLoading: boolean
}

const initialState: UserState = { value: null, isLoading: false }

export const fetchUserThunk = createAsyncThunk(
  'user/fetchUserThunk',
  async () => {
    const url = `${SERVER_HOST}/user`
    return fetch(url).then(res => res.json())
  }
)

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
  extraReducers: builder => {
    builder
      .addCase(fetchUserThunk.pending.type, state => {
        state.value = null
        state.isLoading = true
      })
      .addCase(
        fetchUserThunk.fulfilled.type,
        (state, { payload }: PayloadAction<User>) => {
          console.log('payload', payload)
          state.value = payload
          state.isLoading = false
        }
      )
      .addCase(fetchUserThunk.rejected.type, state => {
        state.isLoading = false
      })
  },
})

export const selectUser = (state: RootState) => state.user.value

export default userSlice.reducer
