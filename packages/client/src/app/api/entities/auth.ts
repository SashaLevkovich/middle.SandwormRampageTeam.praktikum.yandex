import { api } from 'app/api/index'
import { AxiosRequestConfig } from 'axios'

export interface SignInParams {
  login: string
  password: string
}

class AuthService {
  signIn(data: SignInParams, requestConfig?: AxiosRequestConfig) {
    return api.post('/auth/signin', data, requestConfig)
  }

  getUser(requestConfig?: AxiosRequestConfig) {
    return api.get<User>('/auth/user', requestConfig)
  }
}

export default AuthService
