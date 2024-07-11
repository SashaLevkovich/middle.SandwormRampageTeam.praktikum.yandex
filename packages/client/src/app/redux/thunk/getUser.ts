import { createAppAsyncThunk } from 'shared/redux'

export const getUserThunk = createAppAsyncThunk(
  'user/getUser',
  async (_, thunkApi) => {
    return thunkApi.extra.authRequests.getUser()
  }
)
