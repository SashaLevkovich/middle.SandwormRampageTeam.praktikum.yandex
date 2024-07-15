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
      res.status(500).json({ error: 'Server error' })
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
      res.status(500).json({ error: 'Server error' })
    }
  }
}

export const deleteTopic = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const topic = await Topic.findByPk(id)
    console.log(topic, id)
    if (topic) {
      await topic.destroy()
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Topic not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server error' })
    }
  }
}

export const updateTopic = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const topic = await Topic.findByPk(id)
    if (topic) {
      await topic.update(req.body)
      res.json(topic)
    } else {
      res.status(404).json({ error: 'Topic not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server error' })
    }
  }
}
