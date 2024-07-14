import { Request, Response } from 'express'
import { Reply } from '../db'

export const getReplies = async (_req: Request, res: Response) => {
  try {
    const replies = await Reply.findAll()
    res.status(200).json(replies)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      console.error('Unexpected error:', error)
    }
  }
}

export const createReply = async (req: Request, res: Response) => {
  try {
    const reply = await Reply.create(req.body)
    res.status(201).json(reply)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      console.error('Unexpected error:', error)
    }
  }
}
