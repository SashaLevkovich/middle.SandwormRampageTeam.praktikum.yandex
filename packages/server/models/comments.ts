import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IComment {
  topicId: number
  content: string
  userId: number
}

export const commentModel: ModelAttributes<Model, IComment> = {
  content: {
    type: DataType.TEXT,
    allowNull: false,
  },
  topicId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: true,
  },
}
