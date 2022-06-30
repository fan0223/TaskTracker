import express, { Response, Request } from 'express'

const router = express.Router()

router.get('/api/todo/:id', async (req: Request, res: Response) => {


  res.send('show')
})

export { router as showTodoRouter }