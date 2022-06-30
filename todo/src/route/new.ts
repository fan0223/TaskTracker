import express, { Response, Request } from 'express'

const router = express.Router()

router.post('/api/todo', async (req: Request, res: Response) => {


  res.send('new')
})

export { router as newTodoRouter }