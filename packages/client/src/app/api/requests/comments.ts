import { rootApiLocalhost } from 'app/api'
import jwt from 'jsonwebtoken'

export interface IComment {
  topicId: number
  content: string
  id: number
  userId?: number
  createdAt?: string
}

class CommentsRequests {
  private static baseUrl: string
  private static baseUrlTopics: string
  private readonly token: string

  constructor() {
    CommentsRequests.baseUrl = '/comments'
    CommentsRequests.baseUrlTopics = '/topics'
    let id = 0
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user')!
      id = user && user !== 'undefined' && JSON.parse(user).id
    }
    this.token = jwt.sign({ id }, 'myjwtsecretkey', { expiresIn: '240h' })
  }

  getComments(topicId: number) {
    return rootApiLocalhost.get<IComment[]>(
      `${CommentsRequests.baseUrlTopics}/${topicId}/comments`,
      this.getHeaders()
    )
  }

  createComment(topicId: number, data: Partial<IComment>) {
    return rootApiLocalhost.post(
      `${CommentsRequests.baseUrlTopics}/${topicId}/comments`,
      data,
      this.getHeaders()
    )
  }

  updateComment(id: number, data: IComment) {
    return rootApiLocalhost.put(
      `${CommentsRequests.baseUrl}/${id}`,
      data,
      this.getHeaders()
    )
  }

  deleteComment(id: number) {
    return rootApiLocalhost.delete(
      `${CommentsRequests.baseUrl}/${id}`,
      this.getHeaders()
    )
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

export default CommentsRequests
