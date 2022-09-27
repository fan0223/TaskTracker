import express, { Response, Request } from 'express'
import { validateRequest, requireAuth, NotFoundError, NotAuthorizedError } from '@fan-todo/common'
import { todoUpdatedPublisher } from '../events/publisher/todoUpdatedPublisher'
import { Todo } from '../models/todo'
import { body } from 'express-validator'
const router = express.Router()

router.put('/api/todo/:id',
  requireAuth, [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
  body('content')
    .not()
    .isEmpty()
    .withMessage('Content is required')
],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { title, content } = req.body
      const todo = await Todo.findById(id)
      if (!todo) {
        throw new NotFoundError()
      }
      if (todo.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
      }
      todo.set({
        title: title,
        content: content
      })
      await todo.save()

      new todoUpdatedPublisher().publish({
        id: todo.id,
        title: todo.title,
        content: todo.content
      })

      res.send(todo)
    } catch (error) {
      console.log(error)
    }
  })

export { router as updateTodoRouter }