import { rootApi } from 'app/api'
import jwt from 'jsonwebtoken'

export interface ITopic {
  id: number
  title: string
  content: string
}

class TopicsRequests {
  private static baseUrl: string
  private readonly token: string

  constructor() {
    TopicsRequests.baseUrl = '/topics'
    let id = 0
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user')!
      id = user && user !== 'undefined' ? JSON.parse(user)?.id : null
    }
    this.token = jwt.sign({ id }, 'myjwtsecretkey', { expiresIn: '240h' })
  }

  getTopics() {
    return rootApi.get<ITopic[]>(`${TopicsRequests.baseUrl}`, this.getHeaders())
  }

  createTopic(data: Partial<ITopic>) {
    return rootApi.post(`${TopicsRequests.baseUrl}`, data, this.getHeaders())
  }

  updateTopic(id: number, data: Partial<ITopic>) {
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
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    }
  }
}

export default TopicsRequests
