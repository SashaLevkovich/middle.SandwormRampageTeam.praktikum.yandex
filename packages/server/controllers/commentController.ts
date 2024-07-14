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
      console.error('Unexpected error:', error)
    }
  }
}

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.create(req.body)
    res.status(201).json(comment)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      console.error('Unexpected error:', error)
    }
  }
}
