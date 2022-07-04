import { NotFoundError } from '@fan-todo/common'
import express, { Response, Request } from 'express'
import { Todo } from '../model/todo'
const router = express.Router()

router.get('/api/todo/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const todo = await Todo.findById(id)
  if (!todo) {
    throw new NotFoundError()
  }
  res.send(todo)
})

export { router as showTodoRouter }