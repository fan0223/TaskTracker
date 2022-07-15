import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { Comment } from '../models/comment'
const router = express()

router.delete('/api/todo/:todoId/comment/:commentId', async (req: Request, res: Response) => {
  const { todoId, commentId } = req.params
  const udpatedComents = await Comment.deleteOne({ todoId: todoId }, {
    id: commentId
  }
  )

  res.send(udpatedComents)
})

export { router as deleteCommentRouter }