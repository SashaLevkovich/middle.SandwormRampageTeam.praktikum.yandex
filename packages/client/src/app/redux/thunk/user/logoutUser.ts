import { deleteLocalStorageUser } from 'shared/helpers/userLocalStorage'
import { createAppAsyncThunk } from 'shared/redux'

export const logoutUserThunk = createAppAsyncThunk(
  'user/logoutUser',
  async (_, thunkApi) => {
    await thunkApi.extra.authRequests.logout()
    deleteLocalStorageUser()
    await thunkApi.extra.appRouter().navigate('/login')

    return
  }
)
