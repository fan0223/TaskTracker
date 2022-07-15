import express, { Request, Response } from 'express'
import { NotFoundError, requireAuth, validateRequest } from '@fan-todo/common'
import { body } from 'express-validator'

import { Group } from '../models/group'
import { Todo } from '../models/todo'

const router = express.Router()

router.post('/api/group/:todoId',
  requireAuth,
  [
    body('userId')
      .not()
      .isEmpty()
      .withMessage('User id is required')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { todoId } = req.params
    const { userId } = req.body

    const todo = await Todo.findById(todoId)
    if (!todo) {
      throw new NotFoundError()
    }

    const group = Group.build({
      todo,
      member: userId
    })
    // const group = await Group.findOne({ todoId: todoId })
    // if (!group) {
    //   throw new NotFoundError()
    // }
    group.member.push(userId)
    await group.save()

    res.send(group)
  })


export { router as addMemberRouter }