import { Request, Response } from 'express'
import { Comment } from '../db'

export const getComments = async (_req: Request, res: Response) => {
  try {
    const comments = await Comment.findAll()
    res.status(200).json(comments)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body
    const userId = req.user
    const { topicId } = req.params
    const comment = await Comment.create({ content, userId, topicId })
    res.status(201).json(comment)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const comment = await Comment.findByPk(id)
    if (comment) {
      await comment.destroy()
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Comment not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const comment = await Comment.findByPk(id)
    if (comment) {
      await comment.update(req.body)
      res.json(comment)
    } else {
      res.status(404).json({ error: 'Comment not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}
