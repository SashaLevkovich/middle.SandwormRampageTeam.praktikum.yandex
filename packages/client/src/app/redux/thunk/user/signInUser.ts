import { SignInLoginParams } from 'app/api/requests/auth'
import axios from 'axios'
import { createAppAsyncThunk } from 'shared/redux'
import { getUserThunk } from './getUser'

export const signInThunk = createAppAsyncThunk(
  'user/signInUser',
  async (data: SignInLoginParams, thunkApi) => {
    try {
      await thunkApi.extra.authRequests.signIn({ params: data })
      await thunkApi.dispatch(getUserThunk())
      await thunkApi.extra.appRouter().navigate('/landing')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.response?.data || error.message)
      }

      return thunkApi.rejectWithValue('An unknown error occurred')
    }
  }
)
