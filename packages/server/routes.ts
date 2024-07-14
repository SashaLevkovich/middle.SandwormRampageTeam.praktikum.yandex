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

router.get('/topics', getTopics)
router.post('/topics', createTopic)
router.delete('/topics/:id', deleteTopic)
router.put('/topics/:id', updateTopic)

router.get('/topics/:topicId/comments', getComments)
router.post('/topics/:topicId/comments', createComment)
router.delete('/comments/:id', deleteComment)
router.put('/comments/:id', updateComment)

router.get('/comments/:commentId/replies', getReplies)
router.post('/comments/:commentId/replies', createReply)
router.delete('/replies/:id', deleteReply)
router.put('/replies/:id', updateReply)

export default router
