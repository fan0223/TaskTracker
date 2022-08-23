import express, { Request, Response } from 'express'
import { Comment } from '../models/comment'
import { Todo } from '../models/todo'
import { NotFoundError, requireAuth, validateRequest } from '@fan-todo/common'
import { body } from 'express-validator'
import { CommentCreatedProducerQuery } from '../events/producer/commentCreatedProducerQuery'

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

    const todoIsExist = await Todo.findById(todoId)
    if (!todoIsExist) {
      throw new NotFoundError()
    }

    const comment = Comment.build({
      todoId: todoId,
      userId: req.currentUser!.id,
      userName: req.currentUser!.email,
      createdAt: new Date().toLocaleString(),
      content: content
    })
    await comment.save()

    await new CommentCreatedProducerQuery().produce({
      id: comment.id,
      todoId: comment.todoId,
      userId: comment.userId,
      userName: comment.userName,
      createdAt: comment.createdAt,
      content: comment.content
    })

    res.status(201).send(comment)
  })

export { router as newCommentRouter }