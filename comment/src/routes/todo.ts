import express, { Request, Response } from 'express'
import { Todo } from '../models/todo'

const router = express()

router.get('/api/todo/testurl/comment/testurl',
  (req: Request, res: Response) => {
    res.status(200).send({})
  })

export { router as todoRouter }