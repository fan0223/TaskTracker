import mongoose from 'mongoose'
import { app } from './app'
// import { Config } from '@fan-todo/common'

import { TodoCreatedSubscribe } from './events/subscriber.ts/todoCreatedSubscriber'
import { TodoDeletedSubscribe } from './events/subscriber.ts/todoDeletedSubscriber'

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

    new TodoCreatedSubscribe().listen()
    new TodoDeletedSubscribe().listen()

    console.log('Connected to mongoDB')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000.')
  })
}

start()