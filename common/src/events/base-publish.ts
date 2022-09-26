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
    process.env.NODE_ENV == 'development'
      ? this.redis = new Redis({
        host: 'redis-srv',
        port: 6379,
      })
      : this.redis = new Redis({
        host: 'clustercfg.redis-server.kdo2wk.memorydb.ap-northeast-1.amazonaws.com',
        port: 6379,
        tls: {}
      })
    // this.redis = new Redis({
    //   host: process.env.NODE_ENV == 'development'
    //     ? 'redis-srv'
    //     : 'clustercfg.redis-server.kdo2wk.memorydb.ap-northeast-1.amazonaws.com',
    //   port: 6379,
    //   tls: {}
    // })
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

