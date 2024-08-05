import { rootApiLocalhost } from 'app/api'

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
      id = user && user !== 'undefined' && JSON.parse(user).id
    }
    this.token = String(id)
  }

  getTopics() {
    return rootApiLocalhost.get<ITopic[]>(`${TopicsRequests.baseUrl}`, {
      headers: this.getHeaders(),
    })
  }

  createTopic(data: Partial<ITopic>) {
    return rootApiLocalhost.post(`${TopicsRequests.baseUrl}`, data, {
      headers: this.getHeaders(),
    })
  }

  updateTopic(id: number, data: Partial<ITopic>) {
    return rootApiLocalhost.put(`${TopicsRequests.baseUrl}/${id}`, data, {
      headers: this.getHeaders(),
    })
  }

  deleteTopic(id: number) {
    return rootApiLocalhost.delete(`${TopicsRequests.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    })
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    }
  }
}

export default TopicsRequests
