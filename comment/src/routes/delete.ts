import { requireAuth, NotFoundError, BadRequestError } from '@fan-todo/common'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { Comment } from '../models/comment'
const router = express()

router.delete('/api/todo/:todoId/comment/:commentId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { todoId, commentId } = req.params
    // check if the todoId exists 

    // 
    const comment = await Comment.findById(commentId)
    if (!comment) {
      throw new NotFoundError()
    }
    if (req.currentUser!.id !== comment.userId) {
      throw new BadRequestError('Only delete your own comments')
    }

    const udpatedComents = await Comment.deleteOne({ todoId: todoId }, {
      id: commentId
    }
    )

    res.send(udpatedComents)
  })

export { router as deleteCommentRouter }