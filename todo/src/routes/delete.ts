import express, { Response, Request } from 'express'
import { validateRequest, requireAuth, NotFoundError, NotAuthorizedError } from '@fan-todo/common'

import { Todo } from '../models/todo'

const router = express.Router()

router.delete('/api/todo/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  await Todo.findByIdAndDelete(id)

  res.status(200).send({})
})

export { router as deleteTodoRouter }