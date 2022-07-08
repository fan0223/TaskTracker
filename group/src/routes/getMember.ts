import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@fan-todo/common'
import { body } from 'express-validator'

import { Group } from '../models/group'

const router = express.Router()

router.get('/api/group/:todoId',
  async (req: Request, res: Response) => {
    const { todoId } = req.params

  })


export { router as addMemberRouter }