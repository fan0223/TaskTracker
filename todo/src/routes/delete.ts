import express, { Response, Request } from 'express'
import { requireAuth, NotFoundError, NotAuthorizedError } from '@fan-todo/common'
import { TodoDeletedProducerQuery } from '../events/producer/todoDeletedProducerQuery'
import { TodoDeletedProducerComment } from '../events/producer/todoDeletedProducerComment'
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
  const deletedTodo = await Todo.findByIdAndDelete(id)
  if (!deletedTodo) {
    throw new NotFoundError()
  }
  await new TodoDeletedProducerComment().produce({
    id: deletedTodo.id,
    userId: deletedTodo.userId
  })
  await new TodoDeletedProducerQuery().produce({
    id: deletedTodo.id,
    userId: deletedTodo.userId
  })
  res.status(200).send(deletedTodo)
})

export { router as deleteTodoRouter }