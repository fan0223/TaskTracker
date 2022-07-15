import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import { addMemberRouter } from './routes/addMember'
import { deleteMemberRouter } from './routes/deleteMember'
import { getMemberRouter } from './routes/getMember'
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

app.use(addMemberRouter)
app.use(deleteMemberRouter)
app.use(getMemberRouter)


app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }