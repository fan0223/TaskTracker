import express, { Request, Response } from 'express'
import { Todo } from '../models/todo'

const router = express()

router.get('/api/todo/comment',
  async (req: Request, res: Response) => {
    const todo = await Todo.find({})
    res.send(todo)
  })

export { router as todoRouter }