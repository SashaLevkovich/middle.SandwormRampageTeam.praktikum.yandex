import { createAppAsyncThunk } from 'shared/redux'

export const getUserThunk = createAppAsyncThunk<User>(
  'user/getUser',
  async (_, thunkApi) => {
    const response = await thunkApi.extra.authRequests.getUser()
    return response.data
  }
)
