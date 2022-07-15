import express, { Request, Response } from 'express'
import { Comment } from '../models/comment'
import { requireAuth, validateRequest } from '@fan-todo/common'
import { body } from 'express-validator'

const router = express()

router.post('/api/todo/:todoId/comment',
  requireAuth,
  [
    body('content')
      .not()
      .isEmpty()
      .withMessage('Content is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { todoId } = req.params
    const { content } = req.body
    const comment = Comment.build({
      todoId: todoId,
      userId: req.currentUser!.id,
      createdAt: new Date().toLocaleString(),
      content: content
    })
    await comment.save()

    res.status(201).send(comment)
  })

export { router as newCommentRouter }