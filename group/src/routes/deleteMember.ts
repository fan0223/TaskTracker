import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@fan-todo/common'
import { body } from 'express-validator'

const router = express.Router()

router.delete('/api/group/:todoId',
  requireAuth,
  [
    body('userId')
      .isArray({ min: 1 })
      .withMessage('User id is required')
  ],
  validateRequest,
  async (req: Request, res: Response) => {

  })


export { router as deleteMemberRouter }