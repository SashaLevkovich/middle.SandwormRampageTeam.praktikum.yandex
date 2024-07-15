import { rootApi } from 'app/api'
import jwt from 'jsonwebtoken'

export interface ITopic {
  title: string
  content: string
}

class TopicsRequests {
  private static baseUrl: string
  private static token: string

  constructor() {
    TopicsRequests.baseUrl = '/topics'
    TopicsRequests.token = jwt.sign({ id: 1 }, 'jsonwebtoken', {
      expiresIn: '240h',
    })
  }

  getTopics() {
    return rootApi.get<ITopic>(`${TopicsRequests.baseUrl}`, this.getHeaders())
  }

  createTopic(data: ITopic) {
    return rootApi.post(`${TopicsRequests.baseUrl}`, data, this.getHeaders())
  }

  updateTopic(id: number, data: ITopic) {
    return rootApi.put(
      `${TopicsRequests.baseUrl}/${id}`,
      data,
      this.getHeaders()
    )
  }

  deleteTopic(id: number) {
    return rootApi.delete(`${TopicsRequests.baseUrl}/${id}`, this.getHeaders())
  }

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${TopicsRequests.token}`,
      },
    }
  }
}

export default TopicsRequests
