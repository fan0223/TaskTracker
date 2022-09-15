import mongoose from 'mongoose'
import { app } from './app'

import { TodoCreatedConsumer } from './events/consumer/todoCreatedConsumer'
import { TodoDeletedConsumer } from './events/consumer/todoDeletedConsumer'
import { TodoUpdatedConsumer } from './events/consumer/todoUpdatedConsumer'
import { CommentCreatedConsumer } from './events/consumer/commentCreatedConsumer'
import { CommentDeletedConsumer } from './events/consumer/commentDeletedConsumer'


const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined.')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }

  try {
    // redisMQ.createInstance(Config, todoCreatedQueueManager)

    await mongoose.connect(process.env.MONGO_URI, {
      tlsCAFile: `${__dirname}/certs/rds-combined-ca-bundle.pem`,
      serverSelectionTimeoutMS: 50000
    })

    // when mongoose start , delete all collections , prevent mongoDB bug
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
      await collection.deleteMany({})
    }

    new TodoCreatedConsumer().listen()
    new TodoUpdatedConsumer().listen()
    new TodoDeletedConsumer().listen()
    new CommentCreatedConsumer().listen()
    new CommentDeletedConsumer().listen()
    console.log('Connected to mongoDB.')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000.')
  })
}

start()