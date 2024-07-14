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
      console.error('Unexpected error:', error)
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
      console.error('Unexpected error:', error)
    }
  }
}
