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
      res.status(500).json({ error: 'Server error' })
    }
  }
}

export const createReply = async (req: Request, res: Response) => {
  try {
    const { content } = req.body
    const userId = req.user
    const { commentId } = req.params

    const reply = await Reply.create({ content, userId, commentId })
    res.status(201).json(reply)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export const deleteReply = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const reply = await Reply.findByPk(id)
    if (reply) {
      await reply.destroy()
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Reply not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export const updateReply = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const reply = await Reply.findByPk(id)
    if (reply) {
      await reply.update(req.body)
      res.json(reply)
    } else {
      res.status(404).json({ error: 'Reply not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}
