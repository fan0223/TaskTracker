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
        : 'http://18.181.235.163:6379',
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