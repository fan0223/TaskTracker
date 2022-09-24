import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import { NotFoundError, errorHandler, currentUser } from '@fan-todo/common'

import { newCommentRouter } from './routes/new'
import { deleteCommentRouter } from './routes/delete'
import { indexCommentRouter } from './routes/index'
import { todoRouter } from './routes/todo'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({
  signed: false,
  // secure: false
  secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUser)
app.use(newCommentRouter)
app.use(deleteCommentRouter)
app.use(indexCommentRouter)
app.use(todoRouter)


app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }