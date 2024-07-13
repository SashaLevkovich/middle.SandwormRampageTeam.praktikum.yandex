import { Comment } from '../db'
import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IReply {
  commentId: number
  content: string
}

export const replyModel: ModelAttributes<Model, IReply> = {
  content: {
    type: DataType.TEXT,
    allowNull: false,
  },
  commentId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: Comment,
      key: 'id',
    },
  },
}
