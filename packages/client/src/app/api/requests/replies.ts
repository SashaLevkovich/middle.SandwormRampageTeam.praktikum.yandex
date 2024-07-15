import { rootApi } from 'app/api'

export interface IReply {
  commentId: number
  content: string
}

class RepliesRequests {
  private static commentsBaseUrl: string
  private static repliesBaseUrl: string

  constructor() {
    RepliesRequests.commentsBaseUrl = 'comments'
    RepliesRequests.repliesBaseUrl = 'replies'
  }

  getReplies(replyId: number) {
    return rootApi.get<IReply>(
      `${RepliesRequests.commentsBaseUrl}/${replyId}/replies`
    )
  }

  createReply(replyId: number, data: IReply) {
    return rootApi.post(
      `${RepliesRequests.commentsBaseUrl}/${replyId}/replies`,
      data
    )
  }

  updateReply(id: number, data: IReply) {
    return rootApi.put(`${RepliesRequests.repliesBaseUrl}/${id}`, data)
  }

  deleteReply(id: number) {
    return rootApi.delete(`${RepliesRequests.repliesBaseUrl}/${id}`)
  }
}

export default RepliesRequests
