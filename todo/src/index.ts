import mongoose from 'mongoose'
import { app } from './app'
import { Config, redisMQ } from '@fan-todo/common'
import { todoCreatedQueueManager_Query } from './events/queueManager/todoCreateQueueManager-Query'
import { todoCreatedQueueManager_Comment } from './events/queueManager/todoCreateQueueManager-Comment'
import { todoDeletedQueueManager_Comment } from './events/queueManager/todoDeletedQueueManager-Comment'
import { todoDeletedQueueManager_Query } from './events/queueManager/todoDeletedQueueManager-Query'
import { todoUpdatedQueueManager_Query } from './events/queueManager/todoUpdatedQueueManager-Query'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined..')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined.')
  }

  try {
    redisMQ.createInstance(Config, todoCreatedQueueManager_Query)
    redisMQ.createInstance(Config, todoCreatedQueueManager_Comment)
    redisMQ.createInstance(Config, todoUpdatedQueueManager_Query)
    redisMQ.createInstance(Config, todoDeletedQueueManager_Comment)
    redisMQ.createInstance(Config, todoDeletedQueueManager_Query)

    await mongoose.connect(process.env.MONGO_URI, {
      tlsCAFile: `${__dirname}/certs/rds-combined-ca-bundle.pem`,
      serverSelectionTimeoutMS: 50000
    })

    // when mongoose start , delete all collections , prevent mongoDB bug
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
      await collection.deleteMany({})
    }


    console.log('Connected to mongoDB')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000..')
  })
}

start()