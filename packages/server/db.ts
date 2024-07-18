import { commentModel } from './models/comments'
import { replyModel } from './models/reply'
import { topicModel } from './models/topic'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_INTERNAL_PORT,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST || 'localhost',
  port: Number(POSTGRES_INTERNAL_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

export const Topic = sequelize.define('Topic', topicModel, {})
export const Comment = sequelize.define('Comment', commentModel, {})
export const Reply = sequelize.define('Reply', replyModel, {})

Topic.hasMany(Comment, { foreignKey: 'topicId' })
Comment.belongsTo(Topic, { foreignKey: 'topicId' })

Comment.hasMany(Reply, { foreignKey: 'commentId' })
Reply.belongsTo(Comment, { foreignKey: 'commentId' })

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
