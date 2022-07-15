import express from 'express'
import { QueueManager, Consumer } from 'redis-smq'
import { logger } from 'redis-smq-common';
import { config } from './config';

const app = express()
app.use(express.json())


logger.setLogger(console);


QueueManager.createInstance(config, (err, queueManager) => {
  if (err) {
    console.log(err)
  } else if (!queueManager) {
    console.log('queuemanager instance fail')
  } else {
    // queueManager.queue.exists('test_queue', (err, reply) => {
    //   if (err) {
    //     console.log(err)
    //   } else if (reply) {
    //     queueManager.queue.delete('test_queue', (err) => console.log(err))
    //   }
    // })

    queueManager.queue.create('test_queue1', true, (err) => {
      if (err) {
        console.log(err)
      }
      console.log('queue created')
    })
  }
}
)


// app.get('/', (req, res) => {
//   res.send(test)
// })

// app.post('/update', (req, res) => {
//   const { content } = req.body
//   produce(content)
//   res.send('successfully')
// })

// app.listen(3000, () => {
//   console.log('Listening on port 3000.')
// })