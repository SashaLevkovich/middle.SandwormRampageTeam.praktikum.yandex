import { rootApi } from 'app/api'

const REDIRECT_URL =
  typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:3000'

type GetServiceIdResponse = {
  service_id: string
}

class OAuthRequests {
  private static baseUrl: string

  constructor() {
    OAuthRequests.baseUrl = '/oauth'
  }

  public getServiceId() {
    return rootApi.get<GetServiceIdResponse>(
      `${OAuthRequests.baseUrl}/yandex/service-id`,
      {
        params: { redirect_uri: REDIRECT_URL },
      }
    )
  }

  public getOAuthUrl(serviceId: string) {
    return `${
      import.meta.env.VITE_OAUTH_URL
    }/?response_type=code&client_id=${serviceId}&redirect_uri=${encodeURIComponent(
      REDIRECT_URL
    )}`
  }

  public oAuthSignIn(code: string) {
    return rootApi.post(`${OAuthRequests.baseUrl}/yandex/`, {
      code,
      redirect_uri: REDIRECT_URL,
    })
  }
}

export default OAuthRequests
