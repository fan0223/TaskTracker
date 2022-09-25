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
    this.redis = new Redis({
      host: process.env.NODE_ENV == 'development'
        ? 'redis-srv'
        : 'clustercfg.redis-server.kdo2wk.memorydb.ap-northeast-1.amazonaws.com',
      port: 6379
    })
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
