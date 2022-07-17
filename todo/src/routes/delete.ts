import express, { Response, Request } from 'express'
import { requireAuth, NotFoundError, NotAuthorizedError } from '@fan-todo/common'

import { Todo } from '../models/todo'

const router = express.Router()

router.delete('/api/todo/:id', requireAuth, async (req: Request, res: Response) => {
  const { id } = req.params
  const todo = await Todo.findById(id)
  if (!todo) {
    throw new NotFoundError()
  }
  if (todo.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError()
  }
  const response = await Todo.findByIdAndDelete(id)
  res.status(200).send(response)
})

export { router as deleteTodoRouter }