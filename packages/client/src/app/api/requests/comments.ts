import { rootApi } from 'app/api'

export interface IComment {
  topicId: number
  content: string
}

class CommentsRequests {
  private static baseUrl: string

  constructor() {
    CommentsRequests.baseUrl = '/comments'
  }

  getComments(commentId: number) {
    return rootApi.get<IComment>(
      `${CommentsRequests.baseUrl}/${commentId}/comments`
    )
  }

  createComment(commentId: number, data: IComment) {
    return rootApi.post(
      `${CommentsRequests.baseUrl}/${commentId}/comment`,
      data
    )
  }

  updateComment(id: number, data: IComment) {
    return rootApi.put(`${CommentsRequests.baseUrl}/${id}`, data)
  }

  deleteComment(id: number) {
    return rootApi.delete(`${CommentsRequests.baseUrl}/${id}`)
  }
}

export default CommentsRequests
