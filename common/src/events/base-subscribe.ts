import { Subjects } from './subjects';
import Redis, { Redis as RedisType } from 'ioredis'

interface Event {
  subject: Subjects,
  data: any
}
export abstract class CustomSubscribe<T extends Event> {
  abstract channel: T["subject"]
  abstract messageHandler: (channel: T["subject"], message: string) => void
  protected redis: RedisType;

  constructor() {
    this.redis = new Redis()
  }


  listen() {
    this.redis.subscribe(this.channel, (err) => {
      if (err) {
        console.log('Failed to subscribe :%s', err.message)
      } else {
        console.log(`Subscribe: ${this.channel} successfully!`)
      }
    })

    this.redis.on('message', this.messageHandler)
  }
}

// interface todoCreateEvent {
//   subject: Subjects,
//   data: {
//     id: string,
//     price: number
//   }
// }

// export class TodoCreatedSubscribe extends CustomSubscriber<todoCreateEvent>{
//   channel: Subjects.Todo = Subjects.Todo;

//   messageHandler: (channel: todoCreateEvent["subject"], message: string) => void = async (channel, message) => {

//     const payload = JSON.parse(message) as todoCreateEvent['data']
//     console.log(payload)
//   }
// }
// new TodoCreatedSubscribe().listen()