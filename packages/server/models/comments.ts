import { Topic } from '../db'
import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IComment {
  topicId: number
  content: string
}

export const commentModel: ModelAttributes<Model, IComment> = {
  content: {
    type: DataType.TEXT,
    allowNull: false,
  },
  topicId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: Topic,
      key: 'id',
    },
  },
}
