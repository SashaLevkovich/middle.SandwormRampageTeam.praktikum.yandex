import { ownershipMiddleware } from './middlewares/ownershipMiddleware'
import { authMiddleware } from './middlewares/authMiddleware'
import {
  createTopic,
  deleteTopic,
  getTopics,
  updateTopic,
} from './controllers/topicController'
import {
  getComments,
  createComment,
  deleteComment,
  updateComment,
} from './controllers/commentController'
import {
  getReplies,
  createReply,
  deleteReply,
  updateReply,
} from './controllers/replyController'
import express from 'express'

const router = express.Router()

router.get('/topics', authMiddleware, getTopics)
router.post('/topics', authMiddleware, createTopic)
router.delete('/topics/:id', authMiddleware, ownershipMiddleware, deleteTopic)
router.put('/topics/:id', authMiddleware, ownershipMiddleware, updateTopic)

router.get('/topics/:topicId/comments', authMiddleware, getComments)
router.post('/topics/:topicId/comments', authMiddleware, createComment)
router.delete(
  '/comments/:id',
  authMiddleware,
  ownershipMiddleware,
  deleteComment
)
router.put('/comments/:id', authMiddleware, ownershipMiddleware, updateComment)

router.get('/comments/:commentId/replies', authMiddleware, getReplies)
router.post('/comments/:commentId/replies', authMiddleware, createReply)
router.delete('/replies/:id', authMiddleware, ownershipMiddleware, deleteReply)
router.put('/replies/:id', authMiddleware, ownershipMiddleware, updateReply)

export default router
