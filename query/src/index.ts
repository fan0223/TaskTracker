import mongoose from 'mongoose'
import { app } from './app'

import { TodoCreatedSubscriber } from './events/subscriber/todoCreatedSubscriber'
import { TodoDeletedSubscriber } from './events/subscriber/todoDeletedSubscriber'
import { TodoUpdatedSubscriber } from './events/subscriber/todoUpdatedSubscriber'
import { CommentCreatedSubscriber } from './events/subscriber/commentCreatedSubscriber'
import { CommentDeletedSubscriber } from './events/subscriber/commentDeletedSubscriber'


const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined.')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tlsCAFile: `${__dirname}/certs/rds-combined-ca-bundle.pem`,
      serverSelectionTimeoutMS: 50000
    })

    // when mongoose start , delete all collections , prevent mongoDB bug
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
      await collection.deleteMany({})
    }

    new TodoCreatedSubscriber().listen()
    new TodoUpdatedSubscriber().listen()
    new TodoDeletedSubscriber().listen()
    new CommentCreatedSubscriber().listen()
    new CommentDeletedSubscriber().listen()
    console.log('Connected to mongoDB')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000.')
  })
}

start()