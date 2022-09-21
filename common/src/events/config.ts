import {
  ICallback,
  TLoggerConfig,
  TRedisConfig,
} from 'redis-smq-common/dist/types';
import { RedisClientName } from 'redis-smq-common/dist/types';

interface IMessagesConfig {
  store: {
    deadLettered: boolean
  }
}

export interface IConfig {
  redis?: TRedisConfig;
  namespace?: string;
  logger?: TLoggerConfig;
  messages?: IMessagesConfig;
}
export const Config: IConfig = {
  namespace: 'redis',
  redis: {
    client: RedisClientName.IOREDIS,
    options: {
      // host: 'redis-srv',
      // host: 'clustercfg.redis-server.kdo2wk.memorydb.ap-northeast-1.amazonaws.com',
      host: process.env.NODE_ENV == 'development'
        ? 'redis-srv'
        // : 'clustercfg.redis-server.kdo2wk.memorydb.ap-northeast-1.amazonaws.com',
        : 'todo-app-redis-001.kdo2wk.0001.apne1.cache.amazonaws.com:6379',
      // port: 6379

    },
  },
  logger: {
    enabled: true,
    options: {
      level: 'info'
    }
  },
  messages: {
    store: {
      deadLettered: true,
    }
  }
}