import express, { Response, Request } from 'express'
import { Todo } from '../models/todo'

const router = express.Router()

router.get('/api/query', async (req: Request, res: Response) => {
  const todo = await Todo.find({})
  res.send(todo)
})

export { router as indexQueryRouter }