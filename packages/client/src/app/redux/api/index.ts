import { createApi } from '@reduxjs/toolkit/query/react'
import { authRequests, rootApi } from 'app/api'
import { SignInLoginParams } from 'app/api/requests/auth'
import { AxiosError, AxiosResponse } from 'axios'

interface QueryParams {
  url: string
  config: AxiosResponse
}

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, config }: QueryParams) => {
    try {
      const result = await rootApi({
        url: baseUrl + url,
        ...config,
      })
      return Promise.resolve(result)
    } catch (error) {
      const axiosError = error as AxiosError
      return Promise.reject(axiosError?.response?.data)
    }
  }

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      queryFn: authRequests.getUser,
    }),
    signIn: builder.mutation<User, SignInLoginParams>({
      queryFn: params => authRequests.signIn({ params }),
    }),
  }),
})
