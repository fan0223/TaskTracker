import express, { Response, Request } from 'express'
import { Todo } from '../models/todo'
import { requireAuth, validateRequest } from '@fan-todo/common'
import { body } from 'express-validator'
import { TodoCreatedProducer } from '../events/producer/todoCreatedProducer'




const router = express.Router()

router.post('/api/todo',
  requireAuth,
  [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('content')
      .not()
      .isEmpty()
      .withMessage('Content is required')
  ],
  validateRequest
  , async (req: Request, res: Response) => {
    const { title, content } = req.body

    const todo = Todo.build({
      title,
      content,
      userId: req.currentUser!.id,
      userEmail: req.currentUser!.email,
      createAt: new Date().toLocaleString()
    })

    await todo.save()

    const P = new TodoCreatedProducer()
    await P.produce({
      id: todo.id,
      title: todo.title,
      content: todo.content,
      userId: todo.userId,
      userEmail: todo.userEmail,
      createdAt: todo.createAt
    })


    res.status(201).send(todo)
  })

export { router as newTodoRouter }