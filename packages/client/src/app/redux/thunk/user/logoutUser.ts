import { deleteLocalStorageUser } from 'shared/helpers/userLocalStorage'
import { createAppAsyncThunk } from 'shared/redux'

export const logoutUserThunk = createAppAsyncThunk(
  'user/logoutUser',
  async (_, thunkApi) => {
    thunkApi.extra.authRequests.logout()
    deleteLocalStorageUser()

    return
  }
)
