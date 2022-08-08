import { requireAuth, NotFoundError, BadRequestError } from '@fan-todo/common'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { Todo } from '../models/todo'
import { Comment } from '../models/comment'

import { CommentDeletedProducerQuery } from '../events/producer/commentDeletedProducerQuery'
const router = express()

router.delete('/api/todo/:todoId/comment/:commentId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { todoId, commentId } = req.params
    // check if the todoId exists 
    const todoIsExist = await Todo.findById(todoId)
    if (!todoIsExist) {
      throw new NotFoundError()
    }

    const comment = await Comment.findById(commentId)
    if (!comment) {
      throw new NotFoundError()
    }
    if (req.currentUser!.id !== comment.userId) {
      throw new BadRequestError('Only delete your own comments')
    }

    // const udpatedComment = await Comment.deleteOne({ todoId: todoId }, {
    //   id: commentId
    // }
    // )
    const deletedComment = await Comment.findByIdAndDelete(commentId)


    await new CommentDeletedProducerQuery().produce({
      id: comment.id,
      todoId: todoId,
      userId: comment.userId,
      createdAt: comment.createdAt,
      content: comment.content
    })

    res.send(deletedComment)
  })

export { router as deleteCommentRouter }