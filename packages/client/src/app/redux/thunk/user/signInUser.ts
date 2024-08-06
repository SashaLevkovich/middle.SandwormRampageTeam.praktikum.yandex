import { SignInLoginParams } from 'app/api/requests/auth'
import axios from 'axios'
import { setLocalStorageUser } from 'shared/helpers/userLocalStorage'
import { createAppAsyncThunk } from 'shared/redux'
import { getUserThunk } from './getUser'

export const signInThunk = createAppAsyncThunk(
  'user/signInUser',
  async (data: SignInLoginParams, thunkApi) => {
    try {
      const response = await thunkApi.extra.authRequests.signIn({
        params: data,
      })
      const user = response.data

      if (!user) {
        throw new Error('User not found')
      }

      await thunkApi.dispatch(getUserThunk())
      setLocalStorageUser(user)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.response?.data || error.message)
      }

      return thunkApi.rejectWithValue('An unknown error occurred')
    }
  }
)
