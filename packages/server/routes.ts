import { createTopic, getTopics } from './controllers/topicController'
import { getComments, createComment } from './controllers/commentController'
import { getReplies, createReply } from './controllers/replyController'
import express from 'express'

const router = express.Router()

router.get('/topics', getTopics)
router.post('/topics', createTopic)

router.get('/topics/:topicId/comments', getComments)
router.post('/topics/:topicId/comments', createComment)

router.get('/comments/:commentId/replies', getReplies)
router.post('/comments/:commentId/replies', createReply)

export default router
