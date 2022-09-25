import { Subjects } from './subjects';
import Redis, { Redis as RedisType } from 'ioredis'

interface Event {
  subject: Subjects,
  data: any
}

export abstract class CustomPublish<T extends Event> {
  protected redis: RedisType;
  abstract channel: T["subject"]

  constructor() {
    this.redis = new Redis({
      host: process.env.NODE_ENV == 'development'
        ? 'redis-srv'
        : 'clustercfg.redis-server.kdo2wk.memorydb.ap-northeast-1.amazonaws.com',
      port: 6379
    })
  }

  publish(message: T["data"]): void {
    this.redis.publish(this.channel, JSON.stringify(message), (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`Publish ${JSON.stringify(message)} to channel ${this.channel}`)
      }
    })

  }
}

