import { Request, Response } from 'express'
import { Topic } from '../db'

export const getTopics = async (_req: Request, res: Response) => {
  try {
    const topics = await Topic.findAll()
    res.status(200).json(topics)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      console.error('Unexpected error:', error)
    }
  }
}

export const createTopic = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.create(req.body)
    res.status(201).json(topic)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      console.error('Unexpected error:', error)
    }
  }
}
