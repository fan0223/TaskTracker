import mongoose from 'mongoose'
import { app } from './app'

import { TodoCreatedConsumer } from './events/comsumer/todoCreatedConsumer'

import { Consumer, Message } from 'redis-smq'
import { ICallback } from 'redis-smq-common/dist/types';
import { Subjects, redisMQ, Config, todoCreatedQueueManager } from '@fan-todo/common'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }

  try {
    // redis-smq queueManager instance
    redisMQ.createInstance(Config, todoCreatedQueueManager)

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 50000
    })

    // when mongoose start , delete all collections , prevent mongoDB bug
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
      await collection.deleteMany({})
    }

    new TodoCreatedConsumer().listen()
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
    console.log('Connected to mongoDB')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000.')
  })
}

start()