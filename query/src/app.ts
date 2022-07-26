import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import { indexQueryRouter } from './routes'

import { NotFoundError, errorHandler, currentUser } from '@fan-todo/common'


const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({
  signed: false,
  // secure: false
  secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUser)

app.use(indexQueryRouter)
app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }