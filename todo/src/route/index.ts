import express, { Response, Request } from 'express'

const router = express.Router()

router.get('/api/todo', async (req: Request, res: Response) => {


  res.send('index')
})

export { router as indexTodoRouter }