import { Comment, Reply, Topic } from '../db'
import { Request, Response, NextFunction } from 'express'
import { Model } from 'sequelize-typescript'

export const ownershipMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const resourceType = req.originalUrl.split('/')[2]

  if (!req.user) {
    return res.status(403).json({ error: 'Forbidden: User not authenticated' })
  }

  const userId = req.user
  try {
    let resource: Model | null = null
    switch (resourceType) {
      case 'topics':
        resource = await Topic.findByPk(id)
        break
      case 'comments':
        resource = await Comment.findByPk(id)
        break
      case 'replies':
        resource = await Reply.findByPk(id)
        break
      default:
        throw new Error('Invalid resource type')
    }

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' })
    }
    if ((resource as any).userId === Number(userId)) {
      next()
    } else {
      return res
        .status(403)
        .json({ error: 'Forbidden: Not the owner of the comment' })
    }
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
  return
}
