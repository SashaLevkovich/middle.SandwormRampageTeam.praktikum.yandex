import { api } from 'app/api'

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
    return api.post(`${AuthRequests.baseUrl}/signin`, params, config)
  }

  signUp({ params, config }: SignUpRequestConfig) {
    return api.post(`${AuthRequests.baseUrl}/signup`, params, config)
  }

  getUser() {
    return api.get<User>(`${AuthRequests.baseUrl}/user`)
  }
}

export default AuthRequests
