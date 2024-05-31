import { api } from 'app/api'

export interface SignInParams {
  login: string
  password: string
}

class AuthService {
  signIn(data: SignInParams, requestConfig?: AxiosRequestConfig) {
    return api.post('/auth/signin', data, requestConfig?.config)
  }

  getUser(requestConfig?: AxiosRequestConfig) {
    return api.get<User>('/auth/user', requestConfig?.config)
  }
}

export default AuthService
