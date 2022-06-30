import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import { NotFoundError, errorHandler } from '@fan-todo/common'
import { indexTodoRouter } from './route/index'
import { newTodoRouter } from './route/new'
import { showTodoRouter } from './route/show'
import { updateTodoRouter } from './route/update'

const app = express()
app.set('trust proxy', true)
app.use(express.json())


app.use(indexTodoRouter)
app.use(newTodoRouter)
app.use(showTodoRouter)
app.use(updateTodoRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }