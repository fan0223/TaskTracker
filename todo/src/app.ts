import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import { NotFoundError, errorHandler, currentUser } from '@fan-todo/common'
import { indexTodoRouter } from './routes/index'
import { newTodoRouter } from './routes/new'
import { showTodoRouter } from './routes/show'
import { updateTodoRouter } from './routes/update'
import { deleteTodoRouter } from './routes/delete'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({
  signed: false,
  secure: false
  // secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUser)

app.use(indexTodoRouter)
app.use(newTodoRouter)
app.use(showTodoRouter)
app.use(updateTodoRouter)
app.use(deleteTodoRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }