import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IReply {
  commentId: number
  content: string
  userId: number
}

export const replyModel: ModelAttributes<Model, IReply> = {
  content: {
    type: DataType.TEXT,
    allowNull: false,
  },
  commentId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: true,
  },
}
