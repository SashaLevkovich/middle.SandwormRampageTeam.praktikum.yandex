import { rootApi } from 'app/api'
import jwt from 'jsonwebtoken'

export interface IComment {
  topicId: number
  content: string
}

class CommentsRequests {
  private static baseUrl: string
  private static baseUrlTopics: string
  private readonly token: string

  constructor() {
    CommentsRequests.baseUrl = '/api/comments'
    CommentsRequests.baseUrlTopics = '/api/topics'
    this.token = jwt.sign({ id: 887 }, 'myjwtsecretkey', { expiresIn: '240h' })
  }

  getComments(commentId: number) {
    return rootApi.get<IComment>(
      `${CommentsRequests.baseUrlTopics}/${commentId}/comments`,
      this.getHeaders()
    )
  }

  createComment(commentId: number, data: IComment) {
    return rootApi.post(
      `${CommentsRequests.baseUrl}/${commentId}/comment`,
      data,
      this.getHeaders()
    )
  }

  updateComment(id: number, data: IComment) {
    return rootApi.put(
      `${CommentsRequests.baseUrl}/${id}`,
      data,
      this.getHeaders()
    )
  }

  deleteComment(id: number) {
    return rootApi.delete(
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
