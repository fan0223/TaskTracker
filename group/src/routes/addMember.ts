import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@fan-todo/common'
import { body } from 'express-validator'

import { Group } from '../models/group'

const router = express.Router()

router.post('/api/group/:todoId',
  requireAuth,
  [
    body('userId')
      .isArray({ min: 1 })
      .withMessage('User id is required')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { todoId } = req.params

  })


export { router as addMemberRouter }