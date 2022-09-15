import mongoose from 'mongoose'
import { app } from './app'
import { Config, redisMQ } from '@fan-todo/common'

import { TodoCreatedConsumer } from './events/comsumer/todoCreatedConsumer'
import { TodoDeletedConsumer } from './events/comsumer/todoDeletedConsumer'
import { commentCreatedQueueManager_Query } from './events/queueManager/commentCreatedQueueManager-Query'
import { commentDeletedQueueManager_Query } from './events/queueManager/commentDeletedQueueManager-Query'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined.')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }

  try {
    redisMQ.createInstance(Config, commentCreatedQueueManager_Query)
    redisMQ.createInstance(Config, commentDeletedQueueManager_Query)


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
    new TodoDeletedConsumer().listen()
    // const consumer = new Consumer(config)
    // const messageHandler = (msg: Message, cb: ICallback<void>) => {
    //   const payload = msg.getBody()

    //   console.log('Message payload ', payload)
    //   cb()
    // }

    // consumer.consume(
    //   Subjects.TodoCreated,
    //   messageHandler,
    //   (err) => {
    //     if (err) console.log(err)
    //   }
    // )
    // consumer.run()
    console.log('Connected to mongoDB.')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
}

start()