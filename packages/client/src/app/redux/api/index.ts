import { authRequests } from 'app/api'
import { AxiosError } from 'axios'
import { createApi } from '../create-api'

const DEFAULT_ERROR = 'Something went wrong'
export const apiSlice = createApi({
  name: 'api',
  endpoints: builder => ({
    getUser: builder.query(authRequests.getUser),
    signUp: builder.mutation(authRequests.signUp),
    signIn: builder.mutation(authRequests.signIn),
  }),
  onError: cause => {
    const { response } = cause as AxiosError
    console.log(response?.statusText ?? DEFAULT_ERROR, response)
  },
})
