import { QueueManager } from 'redis-smq'
import { Queue } from 'redis-smq/dist/src/lib/queue-manager/queue';
import { IConfig } from './config'
import { ICallback } from 'redis-smq-common/dist/types'
class RedisMQ {
  createInstance(config: IConfig, cb: ICallback<QueueManager>) {
    QueueManager.createInstance(config, cb)
  }
}

// const cb = function (err: any, queueManager: any) {
//   if (err) {
//     console.log(err)
//   } else {
//     queueManager.queue.create('test_queue1', true, (err: any) => {
//       if (err) {
//         console.log(err)
//       }
//       console.log('queue created')
//     })
//   }
// }
// new RedisMQ().createInstance(config, cb)

export const redisMQ = new RedisMQ()
