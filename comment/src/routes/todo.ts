import express, { Request, Response } from 'express'
import { Todo } from '../models/todo'

const router = express()

router.get('/api/todo/testurl/comment/testurl',
  async (req: Request, res: Response) => {
    const todo = await Todo.find({})
    res.send(todo)
  })

export { router as todoRouter }