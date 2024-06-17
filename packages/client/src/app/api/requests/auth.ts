import { rootApi } from 'app/api'

export interface SignInLoginParams {
  login: string
  password?: string
}
export type SignInLoginRequestConfig = AxiosRequestConfig<SignInLoginParams>

export interface SignUpParams {
  firstName: string
  secondName: string
  login: string
  email: string
  password: string
  phone: string
}

export type SignUpRequestConfig = AxiosRequestConfig<SignUpParams>

class AuthRequests {
  private static baseUrl: string

  constructor() {
    AuthRequests.baseUrl = '/auth'
  }

  signIn({ params, config }: SignInLoginRequestConfig) {
    return rootApi.post(`${AuthRequests.baseUrl}/signin`, params, config)
  }

  signUp({ params, config }: SignUpRequestConfig) {
    return rootApi.post(`${AuthRequests.baseUrl}/signup`, params, config)
  }

  getUser() {
    return rootApi.get<User>(`${AuthRequests.baseUrl}/user`)
  }

  logout() {
    return rootApi.post(`${AuthRequests.baseUrl}/logout`)
  }
}

export default AuthRequests
