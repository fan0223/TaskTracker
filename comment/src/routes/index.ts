import express, { Request, Response } from 'express'
import { Comment } from '../models/comment'


const router = express()

router.get('/api/todo/:todoId/comment',
  async (req: Request, res: Response) => {
    const { todoId } = req.params
    const comments = await Comment.find({ todoId: todoId })
    // const comments = await Comment.find({})
    res.send(comments)
  })

export { router as indexCommentRouter }