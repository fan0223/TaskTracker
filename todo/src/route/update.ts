import express, { Response, Request } from 'express'

const router = express.Router()

router.put('/api/todo/:id', async (req: Request, res: Response) => {


  res.send('update')
})

export { router as updateTodoRouter }